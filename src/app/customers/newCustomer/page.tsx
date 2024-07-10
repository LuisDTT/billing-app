import { CustomerDoc } from '@/interfaces/firebase'
import NewCustomerForm from '@/components/Form'

const INITIAL_FORM: CustomerDoc = {
	name: '',
	phoneNumber: '',
	vehiclePlate: ''
}

const page = () => {
	return (
		<NewCustomerForm
			submitName="Registrar"
			data={INITIAL_FORM}
		></NewCustomerForm>
	)
}

export default page
