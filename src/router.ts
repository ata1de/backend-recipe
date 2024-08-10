import express from 'express'
import recipeController from './controllers/recipeController'
import validate from './middleware/validate'
import { RecipeSchema } from './schema'


const router = express.Router()

router.get('/recipes/:name',validate(RecipeSchema.getByName),recipeController.showByName)
router.get('/recipes/:category', validate(RecipeSchema.getByCategory), recipeController.showByCategory)
router.post('/recipes', validate(RecipeSchema.create), recipeController.create)
router.get('/recipes/newest', recipeController.showTop5NewRecipes)


export { router }

