'use client'
import { type CustomerFormState } from '@/interfaces/CustomerFormState'
import { type CustomerDoc } from '@/interfaces/firebase'
import { DBCollections } from '@/enums/firebase'
import { formatNumber } from '@/utils/formatNumber'
import { useEffect, useState } from 'react'
import CustomerForm from '@/components/form/Form'
import { InputField } from '@/components/form/InputField'
import { validateForm } from '@/validations/customerForm'
import {
    createNewDoc,
    getDocById,
    updateDocument,
    validateSinglePlate,
} from '@/firebase/api'
import { FaCheck, FaSave } from 'react-icons/fa'
import { LuBadgeX } from 'react-icons/lu'
import { revalidateCustomers } from '@/app/actions'
import { useRouter } from 'next/navigation'

const Page = ({ params }: { params: { id: string } }) => {
    const [formData, setFormData] = useState<CustomerFormState['formData']>({
        name: '',
        phoneNumber: '',
        vehiclePlate: '',
        feeValue: 0,
        installments: 0,
    })
    const [formErrors, setFormErrors] = useState<
        CustomerFormState['formErrors']
    >({})
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [formattedFeeValue, setFormattedFeeValue] = useState<string>('')
    const [customerNotFound, setCustomerNotFound] = useState<boolean>(false)
    const [loadingCustomerData, setLoadingCustomerData] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const getCustomerToUpdate = async () => {
            if (params.id) {
                const customerDataToUpdate = (await getDocById(
                    params.id,
                    DBCollections.CUSTOMERS,
                )) as CustomerDoc

                if (customerDataToUpdate) {
                    setFormData(customerDataToUpdate)
                    setFormattedFeeValue(
                        formatNumber(customerDataToUpdate.feeValue)
                            .formattedValue,
                    )
                    setCustomerNotFound(false)
                } else {
                    setSuccessMessage('Cliente no encontrado')
                    setCustomerNotFound(true)
                    setLoadingCustomerData(true)
                    return
                }
            }
            setLoadingCustomerData(false)
        }
        getCustomerToUpdate()
    }, [params.id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'feeValue') {
            if (isNaN(parseInt(value.slice(-1))) && value.length > 0) {
                setFormErrors({
                    ...formErrors,
                    feeValueError: {
                        err: true,
                        msg: 'Solo se permiten numeros.',
                    },
                })
                return
            }
            const { formattedValue, rawValue } = formatNumber(value)
            setFormattedFeeValue(formattedValue)

            setFormData({
                ...formData,
                [name]: rawValue,
            })
            setFormErrors({
                ...formErrors,
                feeValueError: {
                    err: false,
                    msg: '',
                },
            })
            return
        } else if (name === 'installments') {
            if (isNaN(parseInt(value.slice(-1))) && value.length > 0) {
                setFormErrors({
                    ...formErrors,
                    installmentsError: {
                        err: true,
                        msg: 'Solo se permiten numeros.',
                    },
                })
                return
            } else if (value === '0') {
                setFormData({
                    ...formData,
                    [name]: 0,
                })
                setFormErrors({
                    ...formErrors,
                    installmentsError: {
                        err: true,
                        msg: 'Debe asignar una o mas cuotas',
                    },
                })
                return
            }
            setFormData({
                ...formData,
                [name]: parseInt(value.toString()),
            })
            setFormErrors({
                ...formErrors,
                installmentsError: {
                    err: false,
                    msg: '',
                },
            })
        }
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const errors = validateForm(formData)
        setFormErrors(errors)
        // Este condicional valida si los campos del formulario independientemente de que sea para crear o actualizar esten completamente validos
        if (Object.keys(errors).length === 0) {
            const isValidPlate = await validateSinglePlate(
                DBCollections.CUSTOMERS,
                params.id || null,
                formData.vehiclePlate?.toUpperCase(),
            )

            // Este condicial verifica si la placa ingresada es valida consultado en la base de datos de los customers
            if (isValidPlate) {
                const dataToSend: CustomerDoc = {
                    ...formData,
                    vehiclePlate: formData.vehiclePlate?.toUpperCase(),
                    installmentsPaid: 0,
                    creditedBalance: 0,
                    installments: parseInt(formData.installments.toString()),
                }

                // Este condicial es para realizar la accion correspondiente de actualizar o crear
                if (params.id) {
                    if (params.id) {
                        try {
                            await updateDocument(
                                params.id,
                                formData,
                                DBCollections.CUSTOMERS,
                            )
                        } catch {
                            console.log('Error')
                        }
                    } else {
                        console.log(
                            'El id del usuario no ha sido suministrado.',
                        )
                        return
                    }
                } else {
                    const response = await createNewDoc(
                        DBCollections.CUSTOMERS,
                        dataToSend,
                    )
                    if (response?.success) {
                        setFormData({
                            name: '',
                            phoneNumber: '',
                            vehiclePlate: '',
                            feeValue: 0,
                            installments: 0,
                        })
                        setFormErrors({})
                        setSuccessMessage('Datos enviados exitosamente')
                        setLoadingCustomerData(true)
                    } else {
                        console.log('Ha ocurrido un error al enviar los datos')
                        return
                    }
                }
            } else {
                setFormErrors({
                    ...validateForm(formData),
                    plateError: {
                        err: true,
                        msg: 'Esta placa ya se le ha asignado a otro cliente',
                    },
                })
                setLoading(false)
                return
            }
        } else {
            setLoading(false)
            return
        }
        setLoading(false)
        revalidateCustomers()
        router.push('/customers')
    }

    return (
        <>
            {loadingCustomerData && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center bg-white shadow-lg rounded-lg p-6 w-72">
                        {!successMessage ? (
                            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-500 border-4 h-16 w-16 mb-4 mx-auto"></div>
                        ) : customerNotFound ? (
                            <LuBadgeX className="text-red-500 text-8xl mx-auto" />
                        ) : (
                            <FaCheck className="text-green-500 text-8xl mx-auto" />
                        )}

                        <p className="text-gray-700 text-lg mt-4">
                            {successMessage ?? 'Cargando datos...'}
                        </p>
                    </div>
                </div>
            )}
            <div className={loadingCustomerData ? 'hidden' : ''}>
                <CustomerForm
                    formTitle={
                        params.id
                            ? 'Actualizar datos del cliente'
                            : 'Registrar nuevo cliente'
                    }
                    handleSubmit={handleSubmit}
                    submitName={
                        params.id ? (
                            <span className="flex justify-center items-center gap-2">
                                Guardar cambios
                                <FaSave />
                            </span>
                        ) : (
                            'Registrar'
                        )
                    }
                    loading={loading}
                    isUpdating={!!params.id}
                    docIdToUpdate={params.id}
                >
                    <InputField
                        handleChange={handleChange}
                        label="Nombre"
                        inputAttr={{
                            type: 'text',
                            name: 'name',
                            value: formData.name,
                            placeholder: 'Nombre del cliente',
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
                            placeholder: 'Telefono de contacto del cliente',
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
                            placeholder: 'Placa del vehiculo',
                        }}
                        errorMessage={formErrors.plateError?.msg}
                        error={formErrors?.plateError?.err}
                        upperCase={true}
                    />
                    <InputField
                        handleChange={handleChange}
                        label="Cantidad de cuotas"
                        inputAttr={{
                            type: 'number',
                            name: 'installments',
                            value:
                                formData.installments === 0
                                    ? ''
                                    : formData.installments,
                            placeholder: 'Ingrese un numero de cuotas',
                            spellCheck: false,
                        }}
                        errorMessage={formErrors.installmentsError?.msg}
                        error={formErrors?.installmentsError?.err}
                        class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <InputField
                        handleChange={handleChange}
                        label="Valor de cada cuota"
                        inputAttr={{
                            type: 'text',
                            name: 'feeValue',
                            value: formattedFeeValue,
                            placeholder: 'Ingrese un monto',
                            spellCheck: false,
                        }}
                        errorMessage={formErrors.feeValueError?.msg}
                        error={formErrors?.feeValueError?.err}
                        class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </CustomerForm>
            </div>
        </>
    )
}

export default Page
