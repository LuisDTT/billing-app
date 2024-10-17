import { type BillingDoc } from '@/interfaces/firebase'
import { getFormattedDate } from '@/utils/formatDate'
import { formatNumber } from '@/utils/formatNumber'
import { getInstallmentsNumbers } from '@/utils/getInstallmentsNumbers'

interface BillingViewerProps {
    invoiceData: BillingDoc
}

export const BillingViewer = ({ invoiceData }: BillingViewerProps) => {
    const {
        billingId,
        createdAt,
        customerName,
        vehiclePlate,
        description,
        user,
        receivedFee,
        oldCreditedBalance,
        newCreditedBalance,
        totalAmount,
        invoicedInstallments,
        customerInstallmentsPaid,
    } = invoiceData

    const installmentsNumber = getInstallmentsNumbers(
        customerInstallmentsPaid,
        invoicedInstallments,
    )
    return (
        <div
            className="bg-[#f5f7f8] py-5 px-5 text-xs border-2 w-fit App"
            id="factura_final"
        >
            <p className="font-bold">
                Nº FACTURA: <span className="font-normal">{billingId}</span>
            </p>
            <p className="font-bold">
                FECHA DE EMISION:{' '}
                <span className="font-normal">
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                        getFormattedDate(createdAt.seconds)
                    }
                </span>
            </p>

            <p className="font-bold">
                USUARIO: <span className="font-normal">{user}</span>
            </p>

            <hr className="border-black my-3" />

            <p className="uppercase font-bold">
                CLIENTE: <span className="font-normal">{customerName}</span>
            </p>
            <p className="uppercase font-bold">
                PLACA: <span className="font-normal">{vehiclePlate}</span>
            </p>
            <p className="uppercase font-bold">
                CONCEPTO: <span className="font-normal">{description}</span>
            </p>

            <hr className="border-black my-3" />

            <p className="uppercase font-bold">
                Tarifa recibida:{' '}
                <span className="font-normal">
                    ${formatNumber(receivedFee).formattedValue}
                </span>
            </p>
            <p className="uppercase font-bold">
                Saldo abonado:{' '}
                <span className="font-normal">
                    ${formatNumber(oldCreditedBalance).formattedValue}
                </span>
            </p>
            <p className="uppercase font-bold">
                Valor total:{' '}
                <span className="font-normal">
                    ${formatNumber(totalAmount).formattedValue}
                </span>
                **
            </p>
            <p className="uppercase font-bold">
                Nuevo saldo abonado:{' '}
                <span className="font-normal">
                    ${formatNumber(newCreditedBalance).formattedValue}
                </span>
                **
            </p>
            <p className="uppercase font-bold">
                Cantidad de cuotas pagadas:{' '}
                <span className="font-normal">{invoicedInstallments}</span>
            </p>
            <p className="uppercase font-bold">
                Numero de cuota:{' '}
                <span className="font-normal">
                    {installmentsNumber.map((num, index) =>
                        index === 0 ? num : ', ' + num,
                    )}
                </span>
            </p>
        </div>
    )
}
