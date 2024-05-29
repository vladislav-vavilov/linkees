import User from '../models/User.js'
import Link from '../models/Link.js'
import { v4 } from 'uuid'
import fs from 'fs'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import sendEmail from '../services/sendEmailService.js'
import generateToken from '../services/generateTokenService.js'
import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js'

class accountController {
	async getProfile(req, res) {
		try {
			if (!req.params.userId) {
				return res
					.status(400)
					.json({ message: 'There is no user with such ID.' })
			}

			const user = await User.findById(req.params.userId)
			res.json({
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
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred during avatar uploading.' })
		}
	}

	async uploadAvatar(req, res) {
		try {
			const user = await User.findById(req.user.id)
			const prevAvatar = `static/${user.avatar}`
			if (user.avatar && fs.existsSync(prevAvatar)) fs.unlinkSync(prevAvatar)

			const file = req.files.avatar
			const fileNameParts = file.name.split('.')
			const extension = fileNameParts[fileNameParts.length - 1]
			const fileName = v4() + '.' + extension

			if (!fs.existsSync('static')) fs.mkdirSync('static')
			file.mv(`static/${fileName}`)

			user.avatar = fileName
			await user.save()

			res
				.status(201)
				.json({ message: 'Avatar has been successfully uploaded.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred during avatar uploading.' })
		}
	}

	async deleteAvatar(req, res) {
		try {
			const user = await User.findById(req.user.id)

			if (!user.avatar) {
				return res
					.status(400)
					.json({ message: 'User does not have an avatar.' })
			}

			fs.unlinkSync(`static/${user.avatar}`)
			user.avatar = null
			await user.save()

			res.status(200).json({ message: 'Avatar has been successfully deleted.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when deleting avatar.' })
		}
	}

	async updateProfile(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors)
			}

			await User.findByIdAndUpdate(req.user.id, req.body, {
				runValidators: true,
			})

			res
				.status(200)
				.json({ message: 'Profile has been successfully updated.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when updating profile.' })
		}
	}

	async deleteProfile(req, res) {
		try {
			const { avatar } = await User.findByIdAndDelete(req.user.id)
			if (fs.existsSync(`static/${avatar}`)) {
				fs.unlinkSync(`static/${avatar}`)
			}
			await Link.deleteMany({ user: req.user.id })

			res
				.status(200)
				.json({ message: 'Account has been successfully deleted.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when deleting profile.' })
		}
	}

	async updatePassword(req, res) {
		try {
			if (req.body.currentPassword === req.body.newPassword) {
				return res.status(400).json({
					name: 'newPassword',
					message: 'The new password cannot match the old one.',
				})
			}

			const user = await User.findById(req.user.id)
			const isMatch = bcrypt.compareSync(
				req.body.currentPassword,
				user.password
			)

			if (!isMatch) {
				return res.status(400).json({
					name: 'currentPassword',
					message: 'Current password is incorrect.',
				})
			}

			const newPasswordHash = bcrypt.hashSync(req.body.newPassword, 7)
			user.password = newPasswordHash
			await user.save()

			res
				.status(200)
				.json({ message: 'Password has been successfully updated.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when updating password.' })
		}
	}

	async sendVerificationEmail(req, res) {
		try {
			const { email, verified } = await User.findById(req.user.id)
			if (verified) {
				return res
					.status(400)
					.json({ message: 'Account has already been verified' })
			}

			const token = generateToken({ email })
			const origin = req.protocol + '://' + req.get('host') + req.originalUrl
			const text = `Click on this link to verify your email: ${origin}/${token}`
			await sendEmail(email, text)

			res
				.status(200)
				.json({ message: 'The confirmation email has been successfully sent.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when sending confirmation email.' })
		}
	}

	async verifyEmail(req, res) {
		try {
			const { token } = req.params
			if (!token) return res.status(400).json({ message: 'No token provided.' })

			const { email } = jwt.verify(token, secretKey)
			const user = await User.findOne({ email })

			const html = fs.readFileSync('templates/verified.html', 'utf8')
			if (user.verified) return res.status(409).send(html)

			user.verified = true
			await user.save()

			res.status(200).send(html)
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when confirming email.' })
		}
	}
}

export default new accountController()
