// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDlIPKD49h5chU3c781ui6Uw3gbxG5q6XM',
	authDomain: 'billing-db-ee22e.firebaseapp.com',
	projectId: 'billing-db-ee22e',
	storageBucket: 'billing-db-ee22e.appspot.com',
	messagingSenderId: '1094406581842',
	appId: '1:1094406581842:web:631e6ea2c1e6975b24b98b'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
