import { Recipe } from "../models"
import { RecipeCreationAttributes } from "../models/Recipe"

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

    createRecipe: async(recipe: RecipeCreationAttributes) => {
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