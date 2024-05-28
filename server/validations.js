import { check } from 'express-validator'

export default {
	email: check('email', 'Incorrect email.').isEmail(),
	username: check('username', 'Incorrect username.')
		.trim()
		.notEmpty()
		.isLength({
			min: 3,
		}),
	password: check('password', 'Incorrect password.').isLength({
		min: 6,
	}),
}
