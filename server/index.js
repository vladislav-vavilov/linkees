import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { cors } from './middlewares.js'
import fileUpload from 'express-fileupload'

import authRouter from './routes/authRouter.js'
import accountRouter from './routes/accountRouter.js'
import linksRouter from './routes/linksRouter.js'

dotenv.config()

const PORT = process.env.PORT || '3000'
const app = express()

app.use(cors)
app.use(express.json())
app.use(fileUpload())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/account', accountRouter)
app.use('/api/links', linksRouter)

const start = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI)
		app.listen(PORT, '0.0.0.0', () =>
			console.log(`Server started on port ${PORT}`)
		)
	} catch (error) {
		console.log(error)
	}
}

start()
