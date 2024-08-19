import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { UserService } from "../services/userService";

export const UserController = {
    update: async(req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const { id } = req.params;

        try {
            const user = await UserService.findById(Number(id));

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await UserService.updateUser(Number(id), { name, email, password:hashedPassword });

            return res.status(200).send({ user: newUser });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    },

    showUser: async(req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const user = await UserService.findById(Number(id));

            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            return res.status(200).send({ user });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
}