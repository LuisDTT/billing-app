import { type BillingDoc } from '@/interfaces/firebase'
import { BillingViewer } from './BillingViewer'
import dynamic from 'next/dynamic'

interface BillingProps {
    invoiceData: BillingDoc
}

const PDFDownloadButton = dynamic(
    async () => await import('@/components/billing/DownloadButton'),
    {
        ssr: false,
        loading: () => (
            <div className="bg-blue-500 animate-pulse text-transparent font-bold py-5 px-20 rounded"></div>
        ),
    },
)

export const Billing = ({ invoiceData }: BillingProps) => {
    return (
        <div className="flex flex-col justify-center items-center gap-5 m-10">
            {/* {Modal} */}
            <h3 className="font-bold text-2xl">Detalle de factura</h3>
            <BillingViewer invoiceData={invoiceData} />
            <PDFDownloadButton invoiceData={invoiceData}></PDFDownloadButton>
        </div>
    )
}
