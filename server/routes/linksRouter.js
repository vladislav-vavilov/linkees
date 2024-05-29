import Router from 'express'
import controller from '../controllers/linksController.js'
import { auth } from '../middlewares.js'
import { check } from 'express-validator'

const router = new Router()

const setCurrentUserId = (req, _, next) => {
	req.params = { user: req.user.id }
	next()
}

router.get('', [auth, setCurrentUserId], controller.getLinks)
router.get('/:user', controller.getLinks)
router.post(
	'',
	[auth, check('URI', 'Incorrect URI').isURL()],
	controller.createLink
)
router.patch('/:id', controller.updateLink)
router.put('/:id/reorder', controller.reorderLinks)
router.delete('/:id', controller.deleteLink)

export default router
