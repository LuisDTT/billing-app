import { TableData, TableRow } from '@/components/table/Table'
import { formatNumber } from '@/utils/formatNumber'
import { getAll } from '@/firebase/api'
import { DBCollections } from '@/enums/firebase'
import { type CustomerDoc } from '@/interfaces/firebase'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'
import { EmptyTable } from './table/EmptyTable'

const getCustomerData = async () => {
    const result = (await getAll(DBCollections.CUSTOMERS)) as CustomerDoc[]
    if (result.length === 0) {
        return null
    }
    return result
}

export default async function CustomerData() {
    const data = await getCustomerData()

    if (data) {
        return data.map((customer, index) => (
            <TableRow index={index} key={customer.docId}>
                <TableData data={customer.name} />
                <TableData data={customer.phoneNumber} />
                <TableData data={customer.vehiclePlate} />
                <TableData data={customer.installments || 'No se asignaron'} />
                <TableData data={customer.installmentsPaid || 0} />
                <TableData
                    data={`$${customer.creditedBalance ? formatNumber(customer.creditedBalance).formattedValue : '0'}`}
                />
                <TableData
                    data={`${customer.feeValue ? '$' + formatNumber(customer.feeValue).formattedValue : 'Sin valor'}`}
                />
                <TableData
                    data={
                        <Link
                            href={`customers/edit/${customer.docId}`}
                            className="text-blue-500 hover:text-blue-700 "
                        >
                            <FaEdit className="size-6" />
                        </Link>
                    }
                />
            </TableRow>
        ))
    } else {
        return <EmptyTable />
    }
}
