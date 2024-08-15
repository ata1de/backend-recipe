import * as yup from 'yup'


const authSchema = {
    register: {
        body: yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        })
    },
    login: {
        body: yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        })
    }
}

export default {
    register: authSchema.register,
    login: authSchema.login
}