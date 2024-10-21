/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { getAll } from '@/firebase/api'
import { type BillingDoc } from '@/interfaces/firebase'
import { DBCollections } from '@/enums/firebase'
import { EmptyTable } from '../table/EmptyTable'
import { TableData, TableRow } from '@/components/table/Table'
import { getFormattedDate } from '@/utils/formatDate'
import { FaEye } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const PDFDownloadButton = dynamic(
    async () => await import('@/components/billing/DownloadButton'),
    {
        ssr: false,
        loading: () => (
            <div className="bg-blue-500 animate-pulse text-transparent font-bold py-2 px-6 rounded"></div>
        ),
    },
)

const getInvoicesData = async () => {
    const response = (await getAll(DBCollections.INVOICES)) as BillingDoc[]
    if (response.length === 0) {
        return null
    }
    return response
}

export const BillingData = async () => {
    const data = await getInvoicesData()

    if (data) {
        return data.map((invoice, index) => (
            <TableRow index={index} key={invoice.billingId}>
                <TableData data={invoice.billingId} />
                <TableData data={invoice.vehiclePlate} />
                <TableData data={invoice.customerName} />
                <TableData data={`${invoice.invoicedInstallments}`} />

                <TableData data={getFormattedDate(invoice.createdAt.seconds)} />

                <TableData
                    data={
                        <div className="flex gap-3 justify-center">
                            <Link
                                href={`/billing/billingView/${invoice.docId}`}
                                className=""
                            >
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 w-full">
                                    <FaEye />
                                </button>
                            </Link>

                            <PDFDownloadButton
                                invoiceData={{
                                    ...invoice,
                                    createdAt: {
                                        seconds: invoice.createdAt.seconds,
                                    },
                                }}
                                buttonName={<IoMdDownload />}
                            />
                        </div>
                    }
                />
            </TableRow>
        ))
    } else {
        return <EmptyTable />
    }
}
