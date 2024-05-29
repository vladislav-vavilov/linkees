import Link from '../models/Link.js'
import User from '../models/User.js'
import { validationResult } from 'express-validator'
import { generateKeyBetween } from 'fractional-indexing'

const generateOrderKey = (items, destination) => {
	if (destination === 0) {
		return generateKeyBetween(null, items[destination].orderKey)
	} else if (destination === items.length - 1) {
		return generateKeyBetween(items[destination].orderKey, null)
	} else {
		return generateKeyBetween(
			items[destination - 1].orderKey,
			items[destination + 1].orderKey
		)
	}
}

class linksController {
	async getLinks(req, res) {
		try {
			if (!req.params.user) {
				return res
					.status(400)
					.json({ message: 'There is no user with such ID.' })
			}

			const links = await Link.find({ user: req.params.user })
			return res.status(200).json(links)
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when getting the links.' })
		}
	}

	async createLink(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors)
			}

			const lastLink = (await Link.find().sort({ _id: 1 }).limit(1))[0]

			const link = new Link({
				...req.body,
				user: req.user.id,
				orderKey: generateKeyBetween(null, lastLink?.orderKey ?? null),
			})
			await link.save()

			const user = await User.findById(req.user.id)
			user.links.push(link._id)
			await user.save()

			return res.status(201).json({ message: 'Link created successfully.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when creating the link.' })
		}
	}
	async updateLink(req, res) {
		try {
			await Link.findByIdAndUpdate(req.params.id, req.body, {
				runValidators: true,
			})

			res.status(200).json({ message: 'Link has been successfully updated.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when creating the link.' })
		}
	}

	async reorderLinks(req, res) {
		try {
			const { destination } = req.body
			const links = await Link.find().sort([['orderKey', 1]])

			const targetLink = await Link.findById(req.params.id)
			targetLink.orderKey = generateOrderKey(links, destination)
			await targetLink.save()

			res
				.status(200)
				.json({ message: 'Links have been successfully reordered.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when reordering links.' })
		}
	}

	async deleteLink(req, res) {
		try {
			await Link.findByIdAndDelete(req.params.id)
			res.status(200).json({ message: 'Link has been successfully deleted.' })
		} catch (error) {
			console.log(error)
			if (error.name === 'ValidationError') {
				return res.status(400).json({ message: error.message })
			}

			res
				.status(500)
				.json({ message: 'An error occurred when reordering links.' })
		}
	}
}

export default new linksController()
