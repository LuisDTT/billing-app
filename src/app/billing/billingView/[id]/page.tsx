import { Billing } from '@/components/billing/Billing'
import { DBCollections } from '@/enums/firebase'
import { getDocById } from '@/firebase/api'
import { type BillingDoc } from '@/interfaces/firebase'

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params

    const invoiceData = (await getDocById(
        id,
        DBCollections.INVOICES,
    )) as BillingDoc

    if (invoiceData) {
        return (
            <Billing
                invoiceData={{
                    ...invoiceData,
                    createdAt: { seconds: invoiceData.createdAt.seconds },
                }}
            />
        )
    } else {
        return <h1>La factura no existe</h1>
    }
}

export default page
