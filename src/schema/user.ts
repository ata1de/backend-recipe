import * as yup from 'yup'

export const UserSchema = {
    update: {
        body: yup.object().shape({
            email: yup.string().email().required(),
            name: yup.string().required(),
            password: yup.string().required()
        }),
        params: yup.object().shape({
            id: yup.string().required()
        })
    },
    getById: {
        params: yup.object().shape({
            id: yup.string().required()
        })
    }
}

export default {
    update: UserSchema.update,
    getById: UserSchema.getById
}