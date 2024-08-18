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

            await UserService.updateUser(Number(id), { name, email, password });

            return res.status(200).send({ message: 'User updated' });
        } catch (error) {
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
}