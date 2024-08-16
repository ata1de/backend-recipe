import { Request, Response } from "express"
import recipeService from "../services/recipeService"

const recipeController = {

    // GET /recipe/:id
    showById: async(req: Request, res: Response) => { 
        const { id } = req.params

        try {
            const recipe = await recipeService.getDetails(Number(id))

            if (!recipe) {
                return res.status(404).json({message: 'Recipe not found' })
            } 

            return res.status(200).json(recipe)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

    // GET /recipes/search/:name
    showByName: async(req: Request, res: Response) => { 
        const { name } = req.params

        try {
            const recipe = await recipeService.getByName(name)

            if (!recipe) {
                return res.status(404).json({message: 'Recipe not found' })
            } 

            return res.status(200).json(recipe)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

    // GET /recipes/category/:category
    showByCategory: async(req: Request, res: Response) => { 
        const { category } = req.params

        try {
            const recipe = await recipeService.getByCategory(category)

            if (!recipe) {
                return res.status(404).json({message: 'Recipe not find' })
            } 

            return res.status(200).json(recipe)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

    // POST /recipes
    create: async(req: Request, res: Response) => {
        const {title, description, time,difficulty ,category, calories, imgUrl,authorId } = req.body

        try {
            const newRecipe = await recipeService.createRecipe({
                title,
                description,
                time,
                difficulty,
                category,
                calories,
                imgUrl,
                authorId
            })

            return res.status(201).json(newRecipe)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

    // PUT/recipe/:id
    update: async(req: Request, res: Response) => {
        const { id } = req.params
        const { title, description, time, difficulty, category, calories, imgUrl,authorId } = req.body

        try {
            const updatedRecipe = await recipeService.updateRecipe(Number(id), {
                title,
                description,
                time,
                difficulty,
                category,
                calories,
                imgUrl,
                authorId
            })

            return res.status(200).json(updatedRecipe)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    },

    // DELETE/recipe/:id
    delete: async(req: Request, res: Response) => {
        const { id } = req.params

        try {
            await recipeService.deleteRecipe(Number(id))

            return res.status(204).end()
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
    }},

    // GET /recipes/newest
    showTop5NewRecipes: async(req: Request, res: Response) => {
        try {
            const recipes = await recipeService.getTop5NewRecipes()

            return res.status(200).json(recipes)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            }
        }
    }

}

export default recipeController