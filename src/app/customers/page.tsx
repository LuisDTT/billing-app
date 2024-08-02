import { getAll } from '@/firebase/api'
import { CustomerDoc } from '@/interfaces/firebase'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'
import { formatNumber } from '@/utils/formatNumber'
import { Table, TableData, TableRow } from '@/components/Table'
import { FaPlus } from 'react-icons/fa'

const page = async () => {
	const data: CustomerDoc[] = await getAll('customers').then((res) => res)

	return (
		<>
			<div className="m-7">
				<div className="flex justify-end ">
					<Link href={'customers/form/new'} className="">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
							<FaPlus /> Registrar nuevo cliente
						</button>
					</Link>
				</div>
				<Table
					headings={[
						'Nombre',
						'Telefono',
						'Placa',
						'Monto total asignado',
						'Monto restante'
					]}
				>
					{data.map((customer, index) => (
						<TableRow index={index} key={customer.docId}>
							<TableData data={customer.name} />
							<TableData data={customer.phoneNumber} />
							<TableData data={customer.vehiclePlate} />
							<TableData
								data={`$${
									formatNumber(customer.totalAmount?.toString() || '')
										.formattedValue
								}`}
							/>
							<TableData
								data={`$${
									formatNumber(customer.amountLeft?.toString() || '')
										.formattedValue
								}`}
							/>
							<TableData
								data={
									<Link
										href={`customers/form/update?docId=${customer.docId}&name=${customer.name}&phoneNumber=${customer.phoneNumber}&vehiclePlate=${customer.vehiclePlate}&totalAmount=${customer.totalAmount}&amountLeft=${customer.amountLeft}`}
										className="text-blue-500 hover:text-blue-700 "
									>
										<FaEdit className="size-6" />
									</Link>
								}
							/>
						</TableRow>
					))}
				</Table>
			</div>
		</>
	)
}

export default page
