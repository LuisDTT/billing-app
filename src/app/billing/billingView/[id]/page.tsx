import { Billing } from '@/components/billing/Billing'
import { getDocById } from '@/firebase/api'
import { BillingDoc } from '@/interfaces/firebase'
import { getFormattedDate } from '@/utils/formatDate'
import { formatNumber } from '@/utils/formatNumber'

const page = async ({ params }: { params: { id: string } }) => {
	const { id } = params

	const data = (await getDocById(id, 'invoices')) as BillingDoc

	if (data) {
		return (
			<Billing
				data={{
					...data,
					createdAt: getFormattedDate(data.createdAt.seconds),
					fee: formatNumber(data.fee || '').formattedValue,
					amountLeft: formatNumber(data.amountLeft || '').formattedValue
				}}
			/>
		)
	} else {
		return <h1>La factura no existe</h1>
	}
}

export default page
