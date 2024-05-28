import jwt from 'jsonwebtoken'
import { secretKey } from '../config.js'

export default payload => {
	return jwt.sign(payload, secretKey, { expiresIn: '24h' })
}
