'use client'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { BillingPDF } from './BillingPDF'
import { useEffect, useState } from 'react'

interface DownloadButtonProps {
	data: {
		customerName?: string
		vehiclePlate?: string
		billingId?: string
		fee?: string
		createdAt?: string
		amountLeft?: string
		user?: string
		description?: string
	}
	buttonName?: React.ReactNode
}

export const DownloadButton = ({ data, buttonName }: DownloadButtonProps) => {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		//Este efecto es para evitar el error react-pdf, que solo se pueda usar en client side
		setIsClient(true) //Al momento de que se cargue el componente cambiar el estado a true para poder utilizar react-pdf
	}, [])
	return isClient ? (
		<PDFDownloadLink
			document={<BillingPDF data={data} />}
			fileName={`factura-${data.billingId}.pdf`}
		>
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
				{buttonName ? buttonName : 'Imprimir factura'}
			</button>
		</PDFDownloadLink>
	) : (
		<span>Cargando...</span>
	)
}

export default DownloadButton
