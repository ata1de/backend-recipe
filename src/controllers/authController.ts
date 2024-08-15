import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { CredentialsInvalid } from '../errors/CredentialsInvalid';
import { jwtService } from '../http/authentication';
import { UserService } from "../services/userService";

export const AuthController = {
    // POST /auth/login
    auth: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            
            const user = await UserService.findByEmail(email);

            if (!user) {
                throw new CredentialsInvalid()
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new CredentialsInvalid()
            }

            const token = jwtService.signToken(user.id.toLocaleString(), '24h');

            return res.status(200).cookie('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000,  // 1 dia
                path: '/'
            }).send({ message: 'User authenticated' });

        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },

    // POST /auth/register
    register: async (req: Request, res: Response) => {
        const { name ,email, password } = req.body;

        try {
            const userAlreadyExist = await UserService.findByEmail(email);

            if (userAlreadyExist) {
                return res.status(400).send({ error: 'User already exist' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserService.createUser({
                name,
                email,
                password: hashedPassword
            });

            return res.status(201).send(user);

        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    },

    // POST /auth/logout
    logOut: async (req: Request, res: Response) => {
        res.clearCookie('token');
        return res.status(200).send({ message: 'User logged out' });
    }
}