import jwt from 'jsonwebtoken'
import { secretKey } from './config.js'

export const cors = (_, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')

	next()
}

export const auth = (req, res, next) => {
	if (req.method === 'OPTIONS') return next()

	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.status(401).json({ message: 'No token provided.' })
		}

		const decoded = jwt.verify(token, secretKey)
		req.user = decoded

		next()
	} catch (error) {
		console.log(error)
		return res.status(401).json({ message: 'Auth error.' })
	}
}
