'use client'
import CustomerForm from '@/components/form/Form'
import { InputField } from '@/components/form/InputField'
import {
	createNewDoc,
	updateDocument,
	validateSinglePlate
} from '@/firebase/api'
import { CustomerFormState } from '@/interfaces/CustomerFormState'
import { CustomerDoc } from '@/interfaces/firebase'
import { validateForm } from '@/validations/customerForm'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navigate } from '../../actions'
import { formatNumber } from '@/utils/formatNumber'

const page = () => {
	const { action } = useParams()
	const searchParams = useSearchParams()
	const docIdToUpdate = searchParams.get('docId')

	const [formData, setFormData] = useState<CustomerDoc>({
		name: searchParams.get('name') || '',
		phoneNumber: searchParams.get('phoneNumber') || '',
		vehiclePlate: searchParams.get('vehiclePlate') || '',
		totalAmount: searchParams.get('totalAmount') || '',
		amountLeft: searchParams.get('amountLeft') || ''
	})
	const [formErrors, setFormErrors] = useState<CustomerFormState['formErrors']>(
		{}
	)
	const [loading, setLoading] = useState(false)
	const [successMessage, setSuccessMessage] = useState<string>('')
	const [formattedValues, setFormattedValues] = useState<{
		totalAmount?: string
	}>({
		totalAmount:
			formatNumber(searchParams.get('totalAmount') || '').formattedValue || ''
	})

	useEffect(() => {
		if (
			!(action == 'update' || action == 'new') ||
			(action == 'update' && docIdToUpdate == null) ||
			(action == 'new' && docIdToUpdate != null)
		) {
			navigate('/customers')
		}
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		if (name === 'totalAmount') {
			if (isNaN(parseInt(value.slice(-1))) && value.length > 0) {
				setFormErrors({
					...formErrors,
					totalAmountError: {
						err: true,
						msg: 'Solo se permiten numeros.'
					}
				})
				return
			}
			const { formattedValue, rawValue } = formatNumber(value)
			setFormattedValues({ totalAmount: formattedValue })
			setFormData({
				...formData,
				[name]: rawValue
			})
			setFormErrors({
				...formErrors,
				totalAmountError: {
					err: false,
					msg: ''
				}
			})
			return
		} else if (name === '') {
		}

		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setFormErrors(validateForm(formData))
		//Este condicional valida si los campos del formulario independientemente de que sea para crear o actualizar esten completamente validos
		if (Object.keys(validateForm(formData)).length === 0) {
			const isValidPlate = await validateSinglePlate(
				'customers',
				docIdToUpdate,
				formData.vehiclePlate?.toUpperCase()
			)
			//Este condicial verifica si la placa ingresada es valida consultado en la base de datos de los customers
			if (isValidPlate) {
				const dataToSend: CustomerDoc = {
					...formData,
					vehiclePlate: formData.vehiclePlate?.toUpperCase(),
					totalAmount: formData.totalAmount,
					amountLeft: formData.amountLeft
				}
				//Este condicial es para realizar la accion correspondiente de actualizar o crear
				if (action === 'new') {
					const response = await createNewDoc('customers', {
						...dataToSend,
						amountLeft: dataToSend.totalAmount
					})
					if (response?.success) {
						setFormData({
							name: '',
							phoneNumber: '',
							vehiclePlate: '',
							totalAmount: ''
						})
						setFormErrors({})
						setSuccessMessage('Datos enviados exitosamente')
					} else {
						console.log('Ha ocurrido un error al enviar los datos')
						return
					}
				} else if (action === 'update') {
					if (docIdToUpdate) {
						try {
							await updateDocument(docIdToUpdate, dataToSend, 'customers')
						} catch {
							console.log('Error')
						}
					} else {
						console.log('El id del usuario no ha sido suministrado.')
						return
					}
				}
			} else {
				setFormErrors({
					...validateForm(formData),
					plateError: {
						err: true,
						msg: 'Esta placa ya se le ha asignado a otro cliente'
					}
				})
				setLoading(false)
				return
			}
		} else {
			setLoading(false)
			return
		}
		setLoading(false)
		navigate('/customers')
	}

	return (
		<CustomerForm
			formTitle={
				action == 'new' ? 'Registrar nuevo cliente' : 'Modificar cliente'
			}
			handleSubmit={handleSubmit}
			submitName={action == 'new' ? 'Registrar' : 'Guardar'}
			loading={loading}
			successMessage={successMessage}
			isUpdating={action != 'new'}
			docIdToUpdate={docIdToUpdate}
		>
			<InputField
				handleChange={handleChange}
				label="Nombre"
				inputAttr={{
					type: 'text',
					name: 'name',
					value: formData.name,
					placeholder: 'Nombre del cliente'
				}}
				errorMessage={formErrors.nameError?.msg}
				error={formErrors?.nameError?.err}
			/>
			<InputField
				handleChange={handleChange}
				label="Teléfono"
				inputAttr={{
					type: 'tel',
					name: 'phoneNumber',
					value: formData.phoneNumber,
					placeholder: 'Telefono de contacto del cliente'
				}}
				errorMessage={formErrors.phoneError?.msg}
				error={formErrors?.phoneError?.err}
			/>

			<InputField
				handleChange={handleChange}
				label="Placa"
				inputAttr={{
					type: 'text',
					name: 'vehiclePlate',
					value: formData.vehiclePlate?.toUpperCase(),
					maxLength: 6,
					placeholder: 'Placa del vehiculo'
				}}
				errorMessage={formErrors.plateError?.msg}
				error={formErrors?.plateError?.err}
				upperCase={true}
			/>
			<InputField
				handleChange={handleChange}
				label="Monto total a pagar"
				inputAttr={{
					type: 'text',
					name: 'totalAmount',
					value: formattedValues.totalAmount,
					placeholder: 'Ingrese un monto',
					spellCheck: false
				}}
				errorMessage={formErrors.totalAmountError?.msg}
				error={formErrors?.totalAmountError?.err}
			/>
		</CustomerForm>
	)
}

export default page
