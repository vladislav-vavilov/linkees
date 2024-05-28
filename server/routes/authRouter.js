import Router from 'express'
import controller from '../controllers/authController.js'
import { auth } from '../middlewares.js'
import validations from '../validations.js'

const router = new Router()

router.post(
	'/register',
	[validations.email, validations.password, validations.username],
	controller.registration
)
router.post(
	'/login',
	[validations.email, validations.password],
	controller.login
)
router.get('/auth', auth, controller.auth)

export default router
