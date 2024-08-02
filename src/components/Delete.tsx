'use client'

import { navigate } from '@/app/customers/actions'
import { deleteDocument } from '@/firebase/api'

interface DeleteProps {
	id: string | null
}

export const Delete = ({ id }: DeleteProps) => {
	const handleDelete = async () => {
		if (id) {
			const success = await deleteDocument(id, 'customers')
			navigate('/customers')
		}
	}
	return (
		<>
			<button
				className="w-full bg-blue-500 text-white p-2 rounded mt-3"
				onClick={handleDelete}
				type="button"
			>
				Borrar
			</button>
		</>
	)
}
