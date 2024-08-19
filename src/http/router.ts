import express from 'express'
import { authenticateJwt } from '../middleware/auth'
import validate from '../middleware/validate'
import { AuthSchema, RecipeSchema } from '../schema'
import { UserSchema } from '../schema/user'
import { AuthController } from './controllers/authController'
import recipeController from './controllers/recipeController'
import { UserController } from './controllers/userController'


const router = express.Router()

router.get('/recipe/:id', authenticateJwt, validate(RecipeSchema.getById), recipeController.showById)
router.get('/recipes/search/:name', authenticateJwt, validate(RecipeSchema.getByName),recipeController.showByName)
router.get('/recipes/category/:category', authenticateJwt, validate(RecipeSchema.getByCategory), recipeController.showByCategory)
router.get('/recipes/newest', authenticateJwt, recipeController.showTop5NewRecipes)
router.get('/auth/check', AuthController.check) 
router.get('/user/:id', authenticateJwt, validate(UserSchema.getById), UserController.showUser)

router.post('/recipes', authenticateJwt, validate(RecipeSchema.create), recipeController.create)
router.post('/auth/login', validate(AuthSchema.login), AuthController.auth)
router.post('/auth/register', validate(AuthSchema.register), AuthController.register)
router.post('/auth/logout', authenticateJwt, AuthController.logOut)

router.put('/recipe/:id', authenticateJwt, validate(RecipeSchema.update), recipeController.update)
router.put('/user/:id', authenticateJwt, validate(UserSchema.update), UserController.update)

router.delete('/recipe/:id', authenticateJwt, validate(RecipeSchema.delete), recipeController.delete)

export { router }

