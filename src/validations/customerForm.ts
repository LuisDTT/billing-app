import { CustomerDoc } from '@/interfaces/firebase'

export const validateForm = ({
	name = '',
	phoneNumber = '',
	vehiclePlate = ''
}: CustomerDoc) => {
	let errors = {}

	if (name.length < 3 || name.length > 30) {
		errors = { ...errors, nameError: true }
	}
	if (
		!Number.isInteger(parseInt(phoneNumber)) ||
		phoneNumber.length < 8 ||
		phoneNumber.length > 12
	) {
		errors = { ...errors, phoneError: true }
	}
	if (vehiclePlate.length != 6) {
		errors = {
			...errors,
			plateError: true
		}
	}
	return errors
}
