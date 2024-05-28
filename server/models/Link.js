import { Schema, model } from 'mongoose'
import { platforms } from '../constants.js'

const Link = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	URI: { type: String, required: true },
	platform: { type: String, enum: platforms, default: 'web' },
	orderKey: { type: String, required: true },
})

Link.set('toJSON', {
	virtuals: true,
	transform: function (_, result) {
		delete result._id
	},
})

export default model('Link', Link)
