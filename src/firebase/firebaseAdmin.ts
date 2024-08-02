import admin from 'firebase-admin'
import { createRemoteJWKSet } from 'jose'

const serviceAccount = JSON.parse(
	process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	})
}

const auth = admin.auth()

export { auth }
