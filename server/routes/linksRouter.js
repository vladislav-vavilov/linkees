import Router from 'express'
import controller from '../controllers/linksController.js'
import { auth } from '../middlewares.js'
import { check } from 'express-validator'

const router = new Router()

router.post(
	'',
	[auth, check('URI', 'Incorrect URI').isURL()],
	controller.createLink
)
router.patch('/:id', controller.updateLink)
router.put('/:id/reorder', controller.reorderLinks)
router.delete('/:id', controller.deleteLink)

export default router
