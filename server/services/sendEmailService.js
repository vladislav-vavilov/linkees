import { createTransport } from 'nodemailer'

const transporter = createTransport({
	host: 'smtp.yandex.ru',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
})

export default async (target, text) => {
	const message = {
		from: process.env.EMAIL,
		to: target,
		subject: 'Linkees. Confirm your email address',
		text,
	}

	await transporter.sendMail(message)
}
