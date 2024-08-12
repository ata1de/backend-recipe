import { Op } from "sequelize"
import { RecipeNotFound } from "../errors/notFound"
import { Recipe, RecipeCreationAttributes } from "../models/Recipe"

const recipeService = {
    getDetails: async(id: number) => {
        const recipe = await Recipe.findByPk(id, {
            attributes: ['id', 'title', 'description', 'time', 'difficulty', 'category', 'calories', 'imgUrl', 'createdAt']
        })

        return recipe
    },

    getByName: async(name: string) => {
        const lowerCaseName = name.toLowerCase()

        const { count, rows} = await Recipe.findAndCountAll({
            attributes: ['id', 'title', 'category', 'imgUrl', 'calories'],
            where: {
                title: {
                    [Op.like]: `%${lowerCaseName}%`
                }
            }
        })

        return {
            recipes: rows,
            totalRecipes: count
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

    updateRecipe: async(id: number, recipeProp: RecipeCreationAttributes) => {
        const recipe = await Recipe.findByPk(id)

        if(!recipe) {
            throw new RecipeNotFound()
        }

        return await recipe.update(recipeProp)
    },

    deleteRecipe: async(id: number) => {
        const recipe = await Recipe.findByPk(id)

        if(!recipe) {
            throw new RecipeNotFound()
        }

        return await recipe.destroy()
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