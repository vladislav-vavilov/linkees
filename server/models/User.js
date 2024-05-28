import { Schema, model } from 'mongoose'
import { roles, colors } from '../constants.js'

const User = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	avatar: { type: String },
	description: { type: String, maxLength: 100 },
	verified: { type: Boolean, default: false },
	links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
	role: { type: String, enum: roles, default: roles[0] },
	color: { type: String, enum: colors, default: colors[0] },
})

export default model('User', User)
