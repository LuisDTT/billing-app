import EditCustomerForm from '@/components/Form'
import { getDocById } from '@/firebase/api'
import { redirect } from 'next/navigation'

const page = async ({ params }: { params: { id: string } }) => {
	const data = await getDocById(params.id, 'customers').then((res) => res)

	return data ? (
		<EditCustomerForm
			data={data}
			submitName="Guardar"
			isUpdating={true}
			idDocToUpdate={params.id}
		/>
	) : (
		redirect('/customers')
	)
}

export default page
