import { UserCreationAttributes } from "../models/User";
import { User } from '../models/index';

export const UserService = {
    createUser: async (data: UserCreationAttributes) => {
        const { name, email, password } = data;

        const user = await User.create({ name, email, password });

        return user
    },

    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email
            }
        });

        return user
    },

    findById: async (id: number) => {
        const user = await User.findByPk(id)

        return user
    }
}