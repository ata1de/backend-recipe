import { Op } from "sequelize"
import { Recipe, RecipeCreationAttributes } from "../models/Recipe"

const recipeService = {
    getDetails: async(id: number) => {
        return await Recipe.findByPk(id)
    },

    getByName: async(name: string) => {
        const lowerCaseName = name.toLowerCase()

        const { count, rows} = await Recipe.findAndCountAll({
            attributes: ['title', 'category', 'imgUrl'],
            where: {
                title: {
                    [Op.like]: `%${lowerCaseName}%`
                }
            }
        })

        return {
            recipes: count,
            totalRecipes: rows
        }
    },

    getByCategory: async(category: string) => {
        const {count, rows} = await Recipe.findAndCountAll({
            attributes: ['title', 'category', 'imgUrl'],
            where: {
                category
            }
        })

        return {
            recipes: count,
            totalRecipes: rows
        }
    },

    createRecipe: async(recipeProp: RecipeCreationAttributes) => {
        return await Recipe.create(recipeProp)
    },

    getTop5NewRecipes: async() => {
        const NewestRecipes = await Recipe.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        })

        return {
            newest: NewestRecipes
        }
    }

}

export default recipeService