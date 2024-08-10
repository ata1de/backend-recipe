import express from 'express'
import recipeController from './controllers/recipeController'


const router = express.Router()

router.get('/recipes/:name', recipeController.showByName)
router.get('/recipes/:category', recipeController.showByCategory)
router.post('/recipes', recipeController.create)
router.get('/recipes/newest', recipeController.showTop5NewRecipes)


export { router }

