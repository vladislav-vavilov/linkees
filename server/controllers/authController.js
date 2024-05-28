import User from '../models/User.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import generateToken from '../services/generateTokenService.js'

class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors)
			}

			const { username, email, password, confirmPassword } = req.body
			if (password !== confirmPassword) {
				return res.status(400).json({ message: "Passwords don't match." })
			}
			if (await User.findOne({ email })) {
				return res.status(400).json({ message: 'User already exists.' })
			}

			const passwordHash = bcrypt.hashSync(password, 7)
			const user = new User({
				username,
				email,
				password: passwordHash,
			})
			await user.save()

			return res
				.status(200)
				.json({ message: 'Account has been successfully registered.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred during registration.' })
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body

			const user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({ message: 'User does not exist.' })
			}

			const isMatch = bcrypt.compareSync(password, user.password)
			if (!isMatch) {
				return res.status(400).json({ message: 'Password is incorrect.' })
			}

			const token = generateToken({ id: user._id })
			return res
				.status(200)
				.json({ message: 'You have been successfully logged in.', token })
		} catch (error) {
			console.log(error)
			res.status(400).json({ message: 'An error occurred during logging in.' })
		}
	}

	async auth(req, res) {
		try {
			const user = await User.findById(req.user.id).populate({
				path: 'links',
				options: { sort: { orderKey: 1 } },
			})
			if (!user) return res.status(401).json({ message: 'Auth error.' })

			return res.status(200).json({
				username: user.username,
				email: user.email,
				avatar: user.avatar,
				description: user.description,
				verified: user.verified,
				role: user.role,
				color: user.color,
				links: user.links,
				id: user._id,
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ message: 'An error occurred when trying to auth.' })
		}
	}
}

export default new authController()
