import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { singToken } from '../http/authentication';
import { UserService } from "../services/userService";

export const AuthController = {
    // POST /auth/login
    auth: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            
            const userAlreadyExist = await UserService.findByEmail(email);

            if (!userAlreadyExist) {
                return res.status(404).send({ error: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, userAlreadyExist.password);

            if (!isPasswordValid) {
                return res.status(401).send({ error: 'Invalid password' });
            }

            const token = singToken(userAlreadyExist.id.toLocaleString());

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000,  // 1 dia
                path: '/'
            });
            return res.status(200).send({ message: 'User authenticated' });

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