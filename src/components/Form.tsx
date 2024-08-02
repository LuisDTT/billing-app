//DELETE THIS FOLDER

// 'use client'
// import { navigate } from '@/app/customers/actions'
// import {
// 	createNewCustomer,
// 	updateDocument,
// 	validateSinglePlate
// } from '@/firebase/api'
// import { CustomerDoc } from '@/interfaces/firebase'
// import { validateForm } from '@/validations/customerForm'
// import { ChangeEvent, FormEvent, useState } from 'react'
// import { Delete } from './Delete'

// interface FormProps {
// 	submitName: string
// 	data: CustomerDoc
// 	isUpdating?: boolean
// 	idDocToUpdate?: string
// }

// const Form = ({ submitName, data, isUpdating, idDocToUpdate }: FormProps) => {
// 	const [formData, setFormData] = useState<CustomerDoc>(data)
// 	const [formErrors, setFormErrors] = useState<{
// 		nameError?: boolean
// 		phoneError?: boolean
// 		plateError?: boolean
// 	} | null>(null)
// 	const [plateErrorMessage, setPlateErrorMessage] = useState<string | null>(
// 		null
// 	)
// 	const [loading, setLoading] = useState(false)
// 	const [successMessage, setSuccessMessage] = useState<string>()

// 	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		const { name, value } = e.target
// 		setFormData({
// 			...formData,
// 			[name]: value
// 		})
// 	}

// 	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault()
// 		setLoading(true)
// 		setFormErrors(validateForm(formData))
// 		setPlateErrorMessage(null)
// 		if (Object.keys(validateForm(formData)).length === 0) {
// 			//Crear una prop para verificar si esta editando o esta creando para condicionar las funciones correspondientes
// 			if (!isUpdating) {
// 				const response = await createNewCustomer('customers', {
// 					...formData,
// 					vehiclePlate: formData.vehiclePlate?.toUpperCase()
// 				})
// 				if (response?.dataExits) {
// 					setPlateErrorMessage('La placa esta asignada a otro usuario')
// 				} else {
// 					setFormData({ name: '', phoneNumber: '', vehiclePlate: '' })
// 					setFormErrors(null)
// 					setPlateErrorMessage(null)
// 					setSuccessMessage('Datos enviados exitosamente')
// 				}
// 			} else {
// 				if (idDocToUpdate) {
// 					const sameVehiclePlate = await validateSinglePlate(
// 						'customers',
// 						formData.vehiclePlate
// 					)
// 					if (sameVehiclePlate === idDocToUpdate || sameVehiclePlate === null) {
// 						await updateDocument(idDocToUpdate, formData, 'customers')
// 					} else {
// 						setPlateErrorMessage('La placa esta asignada a otro usuario')
// 					}
// 				} else {
// 					console.log('El id del usuario no ha sido suministrado.')
// 				}
// 			}
// 		}
// 		setLoading(false)
// 		navigate('/customers')
// 	}

// 	return (
// 		<form
// 			onSubmit={handleSubmit}
// 			className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
// 		>
// 			<div className="mb-4">
// 				<label htmlFor="name" className="block text-gray-700">
// 					Nombre
// 					{formErrors?.nameError && (
// 						<span className="ml-2 text-red-500">Name Errorr</span>
// 					)}
// 				</label>
// 				<input
// 					type="text"
// 					id="name"
// 					name="name"
// 					value={formData.name}
// 					onChange={handleChange}
// 					className="w-full p-2 border border-gray-300 rounded mt-1"
// 				/>
// 			</div>
// 			<div className="mb-4">
// 				<label htmlFor="phoneNumber" className="block text-gray-700">
// 					Teléfono
// 					{formErrors?.phoneError && (
// 						<span className="ml-2 text-red-500">Error</span>
// 					)}
// 				</label>
// 				<input
// 					type="tel"
// 					id="phoneNumber"
// 					name="phoneNumber"
// 					value={formData.phoneNumber}
// 					onChange={handleChange}
// 					className="w-full p-2 border border-gray-300 rounded mt-1"
// 				/>
// 			</div>
// 			<div className="mb-4">
// 				<label htmlFor="vehiclePlate" className="block text-gray-700">
// 					Placa
// 					{formErrors?.plateError && (
// 						<span className="ml-2 text-red-500">Placa no valida</span>
// 					)}
// 					{plateErrorMessage && (
// 						<span className="ml-2 text-red-500">{plateErrorMessage}</span>
// 					)}
// 				</label>
// 				<input
// 					type="text"
// 					id="vehiclePlate"
// 					name="vehiclePlate"
// 					value={formData.vehiclePlate}
// 					onChange={handleChange}
// 					className="w-full p-2 border border-gray-300 rounded mt-1 uppercase"
// 				/>
// 			</div>

// 			<button
// 				type="submit"
// 				className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded`}
// 			>
// 				{loading ? 'Cargando...' : submitName}
// 			</button>
// 			{isUpdating && <Delete id={idDocToUpdate} />}

// 			<span>{successMessage}</span>
// 		</form>
// 	)
// }

// export default Form

//DELETE
