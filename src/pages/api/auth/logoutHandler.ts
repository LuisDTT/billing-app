import {type FirebaseError } from 'firebase-admin'
import { auth } from '@/firebase/firebaseAdmin'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default async function logoutHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = req.cookies
	if (!token) {
		return res.status(401).json({ errorMessage: 'No Token' })
	}

	try {
		await auth.verifyIdToken(token)

		const serialized = serialize('token', 'null', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict', // || None
			maxAge: 0,
			path: '/'
		})
		res.setHeader('Set-Cookie', serialized)

		return res.json(true)
	} catch (error) {
		const firebaseError = error as FirebaseError

		return res.status(401).json(firebaseError.code)
	}
}
