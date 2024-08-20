import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { UserNotFound } from '../../errors/userNotFound';
import { UserService } from "../services/userService";

export const UserController = {
    update: async(req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const { id } = req.params;

        try {
            const user = await UserService.findById(Number(id));

            if (!user) {
                throw new UserNotFound()
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await UserService.updateUser(Number(id), { name, email, password:hashedPassword });

            return res.status(200).send({ user: newUser });
        } catch (error) {
            if (error instanceof UserNotFound) {
                return res.status(404).json({message: error.message })
            }
        }
    },

    showUser: async(req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const user = await UserService.findById(Number(id));

            if (!user) {
                throw new UserNotFound()
            }

            return res.status(200).send({ user });
        } catch (error) {
            if (error instanceof UserNotFound) {
                return res.status(404).json({message: error.message })
            }
        }
    }
}