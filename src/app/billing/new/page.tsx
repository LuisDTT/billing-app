'use client'
import BillingForm from '@/components/form/Form'
import { InputField } from '@/components/form/InputField'
import {
	createNewDoc,
	getDocById,
	getDocByVehiclePlate,
	updateDocument
} from '@/firebase/api'
import { useEffect, useState } from 'react'
import uuid from 'short-uuid'
import { formatNumber } from '@/utils/formatNumber'
import { CustomerDoc } from '@/interfaces/firebase'
import { serverTimestamp, Timestamp } from 'firebase/firestore'
import { redirect } from 'next/navigation'
import { navigate } from '@/app/customers/actions'

interface BillingFormState {
	customerName?: string
	vehiclePlate: string
	billingId: string
	fee: string
}

const page = () => {
	const [formData, setFormData] = useState<BillingFormState>({
		customerName: '',
		vehiclePlate: '',
		billingId: '',
		fee: ''
	})
	const [loading, setLoading] = useState(false)
	const [disableSubmit, setDisableSubmit] = useState(false)
	const [customerData, setCustomerData] = useState<CustomerDoc | null>()
	const [formattedValue, setFormattedValue] = useState('')
	const [formErrors, setFormErrors] = useState({
		customerNotFound: {
			err: false,
			msg: ''
		},
		fee: {
			err: false,
			msg: ''
		}
	})

	useEffect(() => {
		setFormData({ ...formData, billingId: uuid.generate() })
	}, [])

	const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
		const { value } = e.target
		setLoading(true)
		setFormErrors({
			...formErrors,
			customerNotFound: {
				err: false,
				msg: ''
			}
		})
		if (value.length === 6) {
			const customerData: CustomerDoc | boolean = await getDocByVehiclePlate(
				'customers',
				value
			)

			if (customerData) {
				setFormData({ ...formData, customerName: customerData.name })
				setCustomerData(customerData)
				setDisableSubmit(false)
			} else {
				setCustomerData(null)
				setFormErrors({
					...formErrors,
					customerNotFound: {
						err: true,
						msg: 'No existe el cliente con esta placa'
					}
				})
				setDisableSubmit(true)
			}
		} else {
			setFormData({ ...formData, customerName: '' })
			setFormErrors({
				...formErrors,
				customerNotFound: {
					err: true,
					msg: 'Ingrese una placa valida'
				}
			})
			setDisableSubmit(true)
		}
		setLoading(false)
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setDisableSubmit(false)
		if (name === 'fee') {
			if (isNaN(parseInt(value.slice(-1))) && value.length > 0) {
				setFormErrors({
					...formErrors,
					fee: {
						err: true,
						msg: 'Solo se permiten numeros.'
					}
				})

				return
			}

			const { formattedValue, rawValue } = formatNumber(value)
			setFormattedValue(formattedValue)
			setFormData({
				...formData,
				[name]: rawValue
			})
			setFormErrors({
				...formErrors,
				fee: {
					err: false,
					msg: ''
				}
			})
		} else {
			setFormData({
				...formData,
				[name]: value
			})
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const { vehiclePlate, fee } = formData
		if (vehiclePlate.length === 0) {
			setFormErrors({
				...formErrors,
				customerNotFound: { err: true, msg: 'Ingrese una placa valida' }
			})
			setDisableSubmit(true)
			return
		} else if (fee.length === 0) {
			setFormErrors({
				...formErrors,
				fee: { err: true, msg: 'Digite algun valor' }
			})
			setDisableSubmit(true)
			return
		} else {
			if (customerData != null) {
				setLoading(true)

				if (customerData.docId) {
					if (customerData.amountLeft) {
						const amountLeft = (
							parseInt(customerData.amountLeft) - parseInt(formData.fee)
						).toString()

						const billingDataToSend = {
							createdAt: serverTimestamp(),
							amountLeft,
							user: 'Jose',
							description: 'Tarifa Motos',
							customerId: customerData.docId,
							...formData
						}

						await updateDocument(
							customerData.docId,
							{ amountLeft },
							'customers'
						)
						const response = await createNewDoc('invoices', billingDataToSend)
						if (response.docId && response.success) {
							navigate(`/billing/billingView/${response.docId}`)
						}
					}
				}
			}
		}
		setLoading(false)
	}
	return (
		<BillingForm
			formTitle="Generar nueva factura"
			handleSubmit={handleSubmit}
			docIdToUpdate={null}
			loading={loading}
			submitName="Generar factura"
			successMessage=""
			disableSubmit={disableSubmit}
		>
			<InputField
				label="Placa de la moto"
				handleChange={handleChange}
				inputAttr={{
					type: 'text',
					name: 'vehiclePlate',
					maxLength: 6,
					placeholder: 'Placa',
					value: formData.vehiclePlate.toUpperCase()
				}}
				handleBlur={handleBlur}
				error={formErrors.customerNotFound.err}
				errorMessage={formErrors.customerNotFound.msg}
			></InputField>
			<InputField
				label="Cliente"
				inputAttr={{
					type: 'text',
					name: 'customerName',
					value: formErrors.customerNotFound.err
						? 'Cliente no registrado'
						: formData.customerName,
					placeholder: 'Nombre del cliente',
					disabled: true
				}}
				handleChange={handleChange}
				error={formErrors.customerNotFound.err}
				errorMessage={'No se ha encontrado el cliente'}
				class="select-none"
			></InputField>

			<InputField
				label="Tarifa recibida"
				inputAttr={{
					type: 'text',
					name: 'fee',
					value: formattedValue
				}}
				handleChange={handleChange}
				upperCase
				icon="$"
				class="hide-arrow "
				iconPosition="left"
				error={formErrors.fee.err}
				errorMessage={formErrors.fee.msg}
			></InputField>
		</BillingForm>
	)
}

export default page
