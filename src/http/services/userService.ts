import { UserCreationAttributes } from "../../models/User";
import { User } from '../../models/index';

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
            },
            include: {
                association: 'recipes'
            }
        });

        return user
    },

    findById: async (id: number) => {
        const user = await User.findByPk(id)

        return user
    },

    updateUser: async (id: number, data: UserCreationAttributes) => {
        return await User.update(data, {
            where: {
                id
            }
        })
    }
}