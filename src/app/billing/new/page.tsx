'use client'
import BillingForm from '@/components/form/Form'
import { InputField } from '@/components/form/InputField'
import {
    createNewDoc,
    getDocByVehiclePlate,
    updateDocument,
} from '@/firebase/api'
import { useEffect, useState } from 'react'
import { formatNumber } from '@/utils/formatNumber'
import { type BillingDoc, type CustomerDoc } from '@/interfaces/firebase'
import { DBCollections } from '@/enums/firebase'
import { serverTimestamp } from 'firebase/firestore'
import { CgDanger } from 'react-icons/cg'
import { BillingViewer } from '@/components/billing/BillingViewer'
import { getInstallmentsNumbers } from '@/utils/getInstallmentsNumbers'
import { revalidateCustomers, revalidateInvoices } from '@/app/actions'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'

interface BillingFormState {
    user: string
    customerName?: string
    vehiclePlate: string
    billingId: string
    receivedFee: number
    totalAmount: number
    invoicedInstallments: number
    creditedBalance: number
}

const INITIAL_FORM = {
    user: '',
    customerName: '',
    vehiclePlate: '',
    billingId: '',
    receivedFee: 0,
    totalAmount: 0,
    creditedBalance: 0,
    invoicedInstallments: 0,
}

const Page = () => {
    const [formData, setFormData] = useState<BillingFormState>(INITIAL_FORM)
    const [loading, setLoading] = useState(false)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const [customerData, setCustomerData] = useState<CustomerDoc | null>(null)
    const [formattedValue, setFormattedValue] = useState('')
    const [formErrors, setFormErrors] = useState({
        customerNotFound: {
            err: false,
            msg: '',
        },
        fee: {
            err: false,
            msg: '',
        },
    })
    const [installmentsNumber, setInstallmentsNumber] = useState<number[]>([])
    const router = useRouter()

    useEffect(() => {
        const generateBillingId = () => {
            setFormData({
                ...formData,
                user: localStorage.getItem('userName')?.toUpperCase() ?? 'JOSE',
                billingId: nanoid(10),
            })
        }
        generateBillingId()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const { value } = e.target
        setLoading(true)
        setFormErrors({
            ...formErrors,
            customerNotFound: {
                err: false,
                msg: '',
            },
        })
        if (value.length === 6) {
            const customerData = (await getDocByVehiclePlate(
                DBCollections.CUSTOMERS,
                value,
            )) as CustomerDoc

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
                        msg: 'No existe el cliente con esta placa',
                    },
                })
                setDisableSubmit(true)
            }
        } else {
            setFormData({ ...formData, customerName: '' })
            setCustomerData(null)
            setFormErrors({
                ...formErrors,
                customerNotFound: {
                    err: true,
                    msg: 'Ingrese una placa valida',
                },
            })
            setDisableSubmit(true)
        }
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDisableSubmit(false)
        if (name === 'receivedFee') {
            if (isNaN(parseInt(value.slice(-1))) && value.length > 0) {
                setFormErrors({
                    ...formErrors,
                    fee: {
                        err: true,
                        msg: 'Solo se permiten numeros.',
                    },
                })
                return
            }

            const { formattedValue, rawValue } = formatNumber(value)
            setFormattedValue(formattedValue)

            let totalAmount: number = 0
            let invoicedInstallments: number = 0
            let creditedBalance: number = 0
            setInstallmentsNumber([0])

            if (customerData) {
                totalAmount = customerData.creditedBalance + rawValue
                if (totalAmount >= customerData.feeValue) {
                    invoicedInstallments = Math.trunc(
                        totalAmount / customerData.feeValue,
                    ) // Esta operacion nos dara todas las cuotas pagadas
                    creditedBalance =
                        totalAmount -
                        invoicedInstallments * customerData.feeValue

                    setInstallmentsNumber(
                        getInstallmentsNumbers(
                            customerData.installmentsPaid,
                            invoicedInstallments,
                        ),
                    )
                } else {
                    invoicedInstallments = 0
                    creditedBalance = totalAmount
                }
            }
            setFormData({
                ...formData,
                [name]: rawValue,
                totalAmount,
                creditedBalance,
                invoicedInstallments,
            })

            setFormErrors({
                ...formErrors,
                fee: {
                    err: false,
                    msg: '',
                },
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { vehiclePlate, receivedFee } = formData
        if (vehiclePlate.length === 0) {
            setFormErrors({
                ...formErrors,
                customerNotFound: {
                    err: true,
                    msg: 'Ingrese una placa valida',
                },
            })
            setDisableSubmit(true)
            return
        } else if (receivedFee.toString().length === 0) {
            setFormErrors({
                ...formErrors,
                fee: { err: true, msg: 'Digite algun valor' },
            })
            setDisableSubmit(true)
            return
        } else if (receivedFee.toString().length < 4) {
            setFormErrors({
                ...formErrors,
                fee: { err: true, msg: 'El valor minimo es de $1.000' },
            })
            setDisableSubmit(true)
            return
        } else {
            if (customerData != null) {
                setLoading(true)
                setDisableSubmit(true)

                if (customerData.docId) {
                    const billingDataToSend: BillingDoc = {
                        createdAt: serverTimestamp(),
                        user: formData.user, // Modificar user
                        description: 'Tarifa Motos', // Modificar descripcion
                        customerId: customerData.docId,
                        invoicedInstallments: formData.invoicedInstallments,
                        billingId: formData.billingId,
                        customerName: customerData.name,
                        receivedFee: formData.receivedFee,
                        totalAmount: formData.totalAmount,
                        vehiclePlate: customerData.vehiclePlate,
                        newCreditedBalance: formData.creditedBalance,
                        oldCreditedBalance: customerData.creditedBalance,
                        customerInstallmentsPaid: customerData.installmentsPaid,
                    }
                    await updateDocument(
                        customerData.docId,
                        {
                            installmentsPaid:
                                customerData.installmentsPaid +
                                formData.invoicedInstallments,
                            creditedBalance: formData.creditedBalance,
                        },
                        DBCollections.CUSTOMERS,
                    )
                    const response = await createNewDoc(
                        DBCollections.INVOICES,
                        billingDataToSend,
                    )
                    if (response.docId && response.success) {
                        await revalidateInvoices()
                        await revalidateCustomers()
                        router.push(`/billing/billingView/${response.docId}`)
                    }
                }
            }
        }
        setDisableSubmit(true)
        setLoading(false)
    }
    return (
        <div className="flex justify-evenly items-center">
            <BillingForm
                formTitle="Generar nueva factura"
                handleSubmit={handleSubmit}
                docIdToUpdate={null}
                loading={loading}
                submitName="Generar factura"
                // successMessage=""
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
                        value: formData.vehiclePlate.toUpperCase(),
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
                        disabled: true,
                    }}
                    handleChange={handleChange}
                    error={formErrors.customerNotFound.err}
                    errorMessage={'No se ha encontrado el cliente'}
                    class="select-none"
                >
                    {customerData && (
                        <span className="text-sm self-center ml-2 text-green-600">
                            Saldo abonado disponible:
                            {customerData.creditedBalance
                                ? ' $' +
                                  formatNumber(customerData.creditedBalance)
                                      .formattedValue
                                : ' No tiene abonado'}
                        </span>
                    )}
                </InputField>

                <InputField
                    label="Tarifa recibida"
                    inputAttr={{
                        type: 'text',
                        name: 'receivedFee',
                        value: formattedValue,
                        disabled: !customerData,
                    }}
                    handleChange={handleChange}
                    upperCase
                    icon="$"
                    class="hide-arrow"
                    iconPosition="left"
                    error={formErrors.fee.err}
                    errorMessage={formErrors.fee.msg}
                >
                    {customerData && (
                        <span className="text-sm self-center mt-2 ml-2 text-orange-300 flex items-center gap-2">
                            <CgDanger />
                            Valor de cuota:
                            {' $' +
                                formatNumber(customerData.feeValue)
                                    .formattedValue || ' Sin informacion'}
                        </span>
                    )}
                </InputField>

                <div className="my-8 border-t pt-4">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-500">Valor total:</span>
                        <span className="font-semibold text-gray-900">
                            ${' '}
                            {formatNumber(formData.totalAmount).formattedValue}
                        </span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span className="text-gray-500">
                            Nuevo saldo abonado:
                        </span>
                        <span className="font-semibold text-gray-900">
                            ${' '}
                            {
                                formatNumber(formData.creditedBalance)
                                    .formattedValue
                            }
                        </span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span className="text-gray-500">
                            Cantidad de cuotas pagadas:
                        </span>
                        <span className="font-semibold text-gray-900">
                            {formData.invoicedInstallments}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Numero de cuota:</span>
                        <span className="font-semibold text-gray-900">
                            {installmentsNumber.map((num, index) =>
                                index === 0 ? (
                                    <span key={num}>{num}</span>
                                ) : (
                                    <span key={num}>, {num}</span>
                                ),
                            )}
                        </span>
                    </div>
                </div>
            </BillingForm>
            <div className="flex flex-col items-center justify-center gap-3">
                <h5 className="font-bold">Detalles Pre-Factura</h5>
                <BillingViewer
                    invoiceData={{
                        billingId: formData.billingId,
                        createdAt: { seconds: Date.now() / 1000 },
                        customerName: customerData?.name ?? 'Sin informacion',
                        description: 'Tarifa Motos',
                        user: formData.user,
                        vehiclePlate:
                            customerData?.vehiclePlate ?? 'Sin informacion',
                        receivedFee: formData.receivedFee,
                        oldCreditedBalance: customerData?.creditedBalance ?? 0,
                        totalAmount: formData.totalAmount,
                        newCreditedBalance: formData.creditedBalance,
                        invoicedInstallments: formData.invoicedInstallments,
                        customerInstallmentsPaid:
                            customerData?.installmentsPaid ?? 0,
                        customerId: customerData?.docId ?? '',
                    }}
                />
            </div>
        </div>
    )
}

export default Page
