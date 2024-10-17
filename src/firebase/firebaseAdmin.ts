import admin, { type ServiceAccount } from 'firebase-admin'

const serviceAccount : ServiceAccount = JSON.parse(
	process.env.FIREBASE_SERVICE_ACCOUNT_KEY ?? ''
)

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	})
}

const auth = admin.auth()

export { auth }
