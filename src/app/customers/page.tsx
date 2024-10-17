import { FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import { Table } from '@/components/table/Table'
import { Suspense } from 'react'
import CustomerData from '@/components/CustomerData'
import { TableSkeleton } from '@/components/table/TableSkeleton'

export const metadata = {
    title: 'Mi Negocio - Clientes',
}

const Page = async () => {
    return (
        <>
            <div className="m-7">
                <div className="flex justify-end ">
                    <Link href={'customers/new'} className="">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                            <FaPlus /> Registrar nuevo cliente
                        </button>
                    </Link>
                </div>
                <Table
                    headings={[
                        'Nombre',
                        'Telefono',
                        'Placa',
                        'Cuotas asignadas',
                        'Cuotas canceladas',
                        'Saldo abonado',
                        'Valor de cuota',
                    ]}
                >
                    <Suspense fallback={<TableSkeleton columns={7} />}>
                        <CustomerData />
                    </Suspense>
                </Table>
            </div>
        </>
    )
}

export default Page
