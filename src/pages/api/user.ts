import { getDocById } from '@/firebase/api'
import { auth } from '@/firebase/firebaseAdmin'
import { AdminUser } from '@/interfaces/firebase'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handleUser(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { token } = req.cookies

	if (token) {
		try {
			const { uid } = await auth.verifyIdToken(token)
			const userData = (await getDocById(uid, 'adminUsers')) as AdminUser | null
			if (userData) {
				return res.json(userData)
			} else {
				return res.status(400).json('User Not Found')
			}
		} catch {
			return res.status(400).json('Invalid cookie')
		}
	} else {
		return res.status(400).json('Cookie without authorization')
	}
}
