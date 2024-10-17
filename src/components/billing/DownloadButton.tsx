'use client'
import { BillingPDF } from './BillingPDF'
import { type BillingDoc } from '@/interfaces/firebase'
import { PDFDownloadLink } from '@react-pdf/renderer'

interface DownloadButtonProps {
    invoiceData: BillingDoc
    buttonName?: React.ReactNode
}

const PDFDownloadButton = ({
    invoiceData,
    buttonName,
}: DownloadButtonProps) => {
    return (
        <div>
            <PDFDownloadLink
                document={<BillingPDF invoiceData={invoiceData} />}
                fileName={`factura-${invoiceData.billingId}.pdf`}
            >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {buttonName ?? 'Imprimir factura'}
                </button>
            </PDFDownloadLink>
        </div>
    )
}

export default PDFDownloadButton
