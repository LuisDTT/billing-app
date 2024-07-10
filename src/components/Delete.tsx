'use client'

import { deleteDocument } from '@/firebase/api'
import { useRouter } from 'next/navigation'

interface DeleteProps {
	id?: string
}

export const Delete = ({ id }: DeleteProps) => {
	const route = useRouter()

	const handleDelete = async () => {
		if (id) {
			const success = await deleteDocument(id, 'customers')
			route.refresh()
		}
	}
	return (
		<>
			<button
				className="w-full bg-blue-500 text-white p-2 rounded mt-3"
				onClick={handleDelete}
			>
				Delete
			</button>
		</>
	)
}
