import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where
} from 'firebase/firestore'
import db from './service'
import { CustomerDoc } from '@/interfaces/firebase'

export const validateSinglePlate = async (
	collectionName: string,
	vehiclePlate?: string
) => {
	const q = query(
		collection(db, collectionName),
		where('vehiclePlate', '==', vehiclePlate)
	)

	const querySnapshot = await getDocs(q)
	const idDocsList = querySnapshot.docs.map((doc) => doc.id)
	if (idDocsList.length === 0) {
		return null
	} else {
		return idDocsList[0]
	}
}

export const createNewCustomer = async (
	collectionName: 'customers',
	data: CustomerDoc
) => {
	try {
		if (
			(await validateSinglePlate(collectionName, data.vehiclePlate)) != null
		) {
			return { dataExits: true }
		} else {
			// Si el campo no existe, registramos el documento
			await addDoc(collection(db, collectionName), data)
			return { dataExits: false }
		}
	} catch (error) {
		console.log('Ha ocurrido un error al enviar los datos')
	}

	// const docRef = await addDoc(collection(db, collectionName), data)
}

export const getAll = async (collectionName: string) => {
	const collectionData = collection(db, collectionName)
	const snapshot = await getDocs(collectionData)
	const dataList = snapshot.docs.map((doc) => ({
		idDoc: doc.id,
		...doc.data()
	}))
	return dataList
}

export async function getDocById(docId: string, collectionName: string) {
	const docRef = doc(db, collectionName, docId)
	const docSnap = await getDoc(docRef)
	if (docSnap.exists()) {
		return docSnap.data()
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!')
	}
}

export const updateDocument = async (
	idDocToUpdate: string,
	data: CustomerDoc,
	collectionName: string
) => {
	try {
		const docRef = doc(db, collectionName, idDocToUpdate)

		await updateDoc(docRef, {
			...data
		})
	} catch {
		console.log({
			errorMessage: 'El documento ha sido eliminado de la base de datos'
		})
	}
}

export const deleteDocument = async (docId: string, collectionName: string) => {
	try {
		await deleteDoc(doc(db, collectionName, docId))
		return true
	} catch {
		return false
	}
}
