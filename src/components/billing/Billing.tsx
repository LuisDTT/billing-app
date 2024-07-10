'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { BillingPDF } from './BillingPDF'
import { useEffect, useState } from 'react'
import { BillingViewer } from './BillingViewer'

const STATIC_DATA = {
	billingId: '987FGD',
	createdAt: '29/6/2024',
	customerName: 'Luis Torres',
	vehiclePlate: 'GHS87G',
	feeValue: 30000,
	remainningFeeValue: 100000,
	userName: 'Jose admin',
	description: 'Tarifa motos',
	businessAdress: 'av. 49 dig. 34 %'
}

export const Billing = () => {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		//Este efecto es para evitar el error react-pdf, que solo se pueda usar en client side
		setIsClient(true) //Al momento de que se cargue el componente cambiar el estado a true para poder utilizar react-pdf
	}, [])

	return isClient ? (
		<div>
			{/* {Modal} */}
			<BillingViewer data={STATIC_DATA} />
			<PDFDownloadLink
				document={<BillingPDF data={STATIC_DATA} />}
				fileName="factura-eletronica.pdf"
			>
				<button className="bg-cyan-500 py-2 px-4 m-3 rounded-md text-white">
					Imprimir factura
				</button>
			</PDFDownloadLink>
		</div>
	) : (
		<div>Cargando...</div>
	)
}
