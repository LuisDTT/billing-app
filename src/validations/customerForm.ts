import { CustomerFormState } from '@/interfaces/CustomerFormState'
import { CustomerDoc } from '@/interfaces/firebase'

export const validateForm = ({
	name = '',
	phoneNumber = '',
	vehiclePlate = '',
	totalAmount = ''
}: CustomerDoc) => {
	let errors: CustomerFormState['formErrors'] = {}

	if (name.length < 3 || name.length > 30) {
		errors = {
			...errors,
			nameError: { err: true, msg: 'Debe ingresar un nombre valido' }
		}
	}

	if (
		!Number.isInteger(parseInt(phoneNumber)) ||
		phoneNumber.length < 8 ||
		phoneNumber.length > 12
	) {
		errors = {
			...errors,
			phoneError: {
				err: true,
				msg: 'Debe ingresar un numero de telefono valido'
			}
		}
	}

	if (vehiclePlate.length != 6) {
		errors = {
			...errors,
			plateError: { err: true, msg: 'Ingrese un placa valida' }
		}
	}

	if (totalAmount.length == 0) {
		errors = {
			...errors,
			totalAmountError: { err: true, msg: 'Ingrese algun valor' }
		}
	}

	return errors
}
