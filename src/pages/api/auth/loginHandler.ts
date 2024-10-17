import { auth } from '@/firebase/service'
import { type FirebaseError } from 'firebase-admin'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { type NextApiRequest,type NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { email, password } = req.body as {email :string, password: string}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		)

		const token = await userCredential.user.getIdToken()
		const serialized = serialize('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict', // || None
			path: '/',
		})
		res.setHeader('Set-Cookie', serialized)

		return res.json(true)
	} catch (error) {
		const firebaseError = error as FirebaseError
		return res.status(401).json(firebaseError.code)
	}
}
