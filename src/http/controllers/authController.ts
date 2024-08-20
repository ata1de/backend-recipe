import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { CredentialsInvalid } from '../../errors/credentialsInvalid';
import { UserAlreadyExists } from '../../errors/userAlreadyExists';
import { jwtService } from '../services/JwtService';
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

            const token = jwtService.signToken(user.id.toString(), '86400');

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1000,  // 1 dia
                path: '/'
            });

            return res.status(200).json({ user: user});

        } catch (error) {
            if (error instanceof CredentialsInvalid) {
                return res.status(401).send({ message: error.message });
            }
        }
    },

    // POST /auth/register
    register: async (req: Request, res: Response) => {
        const { name ,email, password } = req.body;

        try {
            const userAlreadyExist = await UserService.findByEmail(email);

            if (userAlreadyExist) {
                throw new UserAlreadyExists()
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserService.createUser({
                name,
                email,
                password: hashedPassword
            });

            return res.status(201).send(user);

        } catch (error) {
            if (error instanceof UserAlreadyExists) {
                return res.status(409).send({ message: error.message });
            }
        }
    },

    // POST /auth/logout
    logOut: async (req: Request, res: Response) => {
        res.clearCookie('token');
        return res.status(200).send({ message: 'User logged out' });
    },

    //GET /auth/check
    check: async(req: Request, res: Response) => {
        const token = req.cookies['token'];

        if (!token) {
            return res.status(200).json({ isAuthenticated: false });
        }

        try {
            jwtService.verifyToken(token, (err, decoded) => {
                if (err || typeof decoded === 'undefined') {
                  return res.json({ isAuthenticated: false })
                }

                console.log(token)
                
                return res.status(200).json({ isAuthenticated: true, user: decoded });
            });
        } catch (error) {
            return res.status(401).json({ isAuthenticated: false });
        }
    }
}