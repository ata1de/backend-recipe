import express from 'express'
import recipeController from './controllers/recipeController'
import validate from './middleware/validate'
import { RecipeSchema } from './schema'


const router = express.Router()

router.post('/recipe/:id', validate(RecipeSchema.getById), recipeController.showById)
router.get('/recipes/search/:name',validate(RecipeSchema.getByName),recipeController.showByName)
router.get('/recipes/category/:category', validate(RecipeSchema.getByCategory), recipeController.showByCategory)
router.get('/recipes/newest', recipeController.showTop5NewRecipes)

router.post('/recipes', validate(RecipeSchema.create), recipeController.create)

export { router }

