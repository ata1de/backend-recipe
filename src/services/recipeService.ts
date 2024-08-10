import { Recipe } from "../models"

const recipeService = {
    getByName: async(name: string) => {
        const recipe = await Recipe.findOne({
            attributes: ['title', 'category', 'calories'],
            where: {
                title: name
            }
        })

        return recipe
    },

    getByCategory: async(category: string) => {
        const recipes = await Recipe.findAll({
            where: {
                category
            }
        })

        return recipes
    },

    createRecipe: async(recipe: Recipe) => {
        return await Recipe.create(recipe)
    },

    getTop5NewRecipes: async() => {
        return await Recipe.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        })
    }

}

export default recipeService