import { BillingData } from '@/components/billing/BillingData'
import { Table } from '@/components/table/Table'
import { TableSkeleton } from '@/components/table/TableSkeleton'
import Link from 'next/link'
import { Suspense } from 'react'
import { RiBillLine } from 'react-icons/ri'

export const metadata = {
    title: 'Mi Negocio - Facturas',
}

const page = async () => {
    return (
        <>
            <div className="m-7">
                <div className="flex justify-between">
                    <div></div>
                    <Link href={'billing/new'} className="">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                            <RiBillLine /> Crear nueva factura
                        </button>
                    </Link>
                </div>
                <Table
                    headings={[
                        'ID Factura',
                        'Placa',
                        'Cliente',
                        'Total de cuotas',
                        'Fecha y hora de facturacion',
                    ]}
                >
                    <Suspense fallback={<TableSkeleton columns={5} />}>
                        <BillingData></BillingData>
                    </Suspense>
                </Table>
            </div>
        </>
    )
}

export default page
