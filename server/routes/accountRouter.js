import Router from 'express'
import controller from '../controllers/accountController.js'
import { auth } from '../middlewares.js'
import validations from '../validations.js'

const router = new Router()

router.post('/avatar', auth, controller.uploadAvatar)
router.delete('/avatar', auth, controller.deleteAvatar)
router.patch(
	'',
	[auth, validations.email.optional(), validations.username.optional()],
	controller.updateProfile
)
router.delete('', auth, controller.deleteProfile)
router.put('/password', auth, controller.updatePassword)
router.post('/verify', auth, controller.sendVerificationEmail)
router.get('/verify/:token', controller.verifyEmail)

export default router
