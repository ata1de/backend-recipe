import { Request, Response } from "express"
import recipeService from "../services/recipeService"

const recipeController = {

    // GET /recipes/:name
    showByName: async(req: Request, res: Response) => { 
        const { name } = req.params

        try {
            const recipe = await recipeService.getByName(name)

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

    // GET /recipes/:category
    show: async(req: Request, res: Response) => { 
        const { name } = req.params

        try {
            const recipe = await recipeService.getByName(name)

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


}