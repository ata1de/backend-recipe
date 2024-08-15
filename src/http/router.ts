import express from 'express'
import { AuthController } from '../controllers/authController'
import recipeController from '../controllers/recipeController'
import { authenticateJwt } from '../middleware/auth'
import validate from '../middleware/validate'
import { AuthSchema, RecipeSchema } from '../schema'


const router = express.Router()

router.get('/recipe/:id', authenticateJwt, validate(RecipeSchema.getById), recipeController.showById)
router.get('/recipes/search/:name', authenticateJwt, validate(RecipeSchema.getByName),recipeController.showByName)
router.get('/recipes/category/:category', authenticateJwt, validate(RecipeSchema.getByCategory), recipeController.showByCategory)
router.get('/recipes/newest', authenticateJwt, recipeController.showTop5NewRecipes)

router.post('/recipes', authenticateJwt, validate(RecipeSchema.create), recipeController.create)
router.post('auth/login', validate(AuthSchema.login), AuthController.auth)
router.post('auth/register', validate(AuthSchema.register), AuthController.register)

router.put('/recipe/:id', authenticateJwt, validate(RecipeSchema.update), recipeController.update)

router.delete('/recipe/:id', authenticateJwt, validate(RecipeSchema.delete), recipeController.delete)

export { router }

