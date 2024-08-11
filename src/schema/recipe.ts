import * as yup from 'yup';

const recipeSchema = {
    getByName: {
        params: yup.object().shape({
            name: yup.string().required()
        })
    },
    getByCategory: {
        params: yup.object().shape({
            category: yup.string().required()
        })
    },
    create: {
        body: yup.object().shape({
            title: yup.string().required(),
            description: yup.string().required(),
            time: yup.number().required(),
            difficulty: yup.string().required(),
            category: yup.string().required(),
            calories: yup.number().required(),
            imgUrl: yup.string().url().required()
        })
    }
}

export default {
    getByName: recipeSchema.getByName,
    getByCategory: recipeSchema.getByCategory,
    create: recipeSchema.create
};