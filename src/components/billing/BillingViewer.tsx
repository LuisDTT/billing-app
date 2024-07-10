interface BillingViewerProps {
	data: {
		billingId: string
		createdAt: string
		customerName: string
		vehiclePlate: string
		feeValue: number
		remainningFeeValue: number
		userName: string
		description: string
		businessAdress: string
	}
}

export const BillingViewer = ({ data }: BillingViewerProps) => {
	const {
		billingId,
		createdAt,
		customerName,
		feeValue,
		remainningFeeValue,
		vehiclePlate,
		description,
		userName,
		businessAdress
	} = data
	return (
		<div
			className="bg-[#f5f7f8] py-5 px-5 text-xs border-2 w-96 App"
			id="factura_final"
		>
			<p className="text-center mb-5 uppercase">{businessAdress}</p>

			<p className="font-bold">
				Nº FACTURA: <span className="font-normal">{billingId}</span>
			</p>
			<p className="font-bold">
				FECHA DE EMISION: <span className="font-normal">{createdAt}</span>
			</p>

			<p className="font-bold">
				USUARIO: <span className="font-normal">{userName}</span>
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
				VALOR: <span className="font-normal">{feeValue}</span>
			</p>
			<p className="uppercase font-bold">
				VALOR RESTANTE:{' '}
				<span className="font-normal">{remainningFeeValue}</span>
			</p>
		</div>
	)
}
