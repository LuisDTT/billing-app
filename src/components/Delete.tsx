'use client'

import { revalidateCustomers } from '@/app/actions'
import { DBCollections } from '@/enums/firebase'
import { deleteDocument } from '@/firebase/api'
import { useRouter } from 'next/navigation'
import { MdDelete } from 'react-icons/md'

interface DeleteProps {
    id: string | null
}

export const Delete = ({ id }: DeleteProps) => {
    const router = useRouter()
    const handleDelete = async () => {
        if (id) {
            const success = await deleteDocument(id, DBCollections.CUSTOMERS)
            revalidateCustomers()
            router.push('/customers')
        }
    }
    return (
        <>
            <button
                className="w-full bg-red-500 text-white p-2 rounded mt-3"
                onClick={handleDelete}
                type="button"
            >
                <span className="flex items-center justify-center gap-2">
                    Borrar
                    <MdDelete className="text-xl" />
                </span>
            </button>
        </>
    )
}
