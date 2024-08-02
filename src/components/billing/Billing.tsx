'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { BillingPDF } from './BillingPDF'
import { useEffect, useState } from 'react'
import { BillingViewer } from './BillingViewer'
import DownloadButton from './DownloadButton'

interface BillingProps {
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
}

export const Billing = ({ data }: BillingProps) => {
	return (
		<div className="flex flex-col justify-center items-center gap-5 m-10">
			{/* {Modal} */}
			<h3 className="font-bold text-2xl">Detalle de factura</h3>
			<BillingViewer data={data} />
			<DownloadButton data={data}></DownloadButton>
		</div>
	)
}
