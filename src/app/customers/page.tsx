import { Delete } from '@/components/Delete'
import { getAll } from '@/firebase/api'
import { CustomerDoc } from '@/interfaces/firebase'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'

const page = async () => {
	const data: CustomerDoc[] = await getAll('customers').then((res) => res)
	return (
		<>
			<header className="flex justify-between py-5 px-16 border-b-2 border-gray-300 bg-white ">
				<h2 className="font-bold ">CLIENTES</h2>
				<h3>Hola, Jose</h3>
			</header>

			<div className="max-w-screen-md m-auto my-5">
				<div className="overflow-x-auto rounded">
					<table className="min-w-full bg-white">
						<thead>
							<tr>
								<th className="py-2 px-4 text-gray-800 text-lg">Nombre</th>
								<th className="py-2 px-4 text-gray-800 text-lg">Teléfono</th>
								<th className="py-2 px-4 text-gray-800 text-lg">Placa</th>
							</tr>
						</thead>
						<tbody>
							{data.map((user, index) => (
								<tr
									key={user.idDoc}
									className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
								>
									<td className="py-2 px-4 border-b border-gray-200 text-center">
										{user.name}
									</td>
									<td className="py-2 px-4 border-b border-gray-200 text-center">
										{user.phoneNumber}
									</td>
									<td className="py-2 px-4 border-b border-gray-200 text-center">
										{user.vehiclePlate}
									</td>
									<td className="py-2 px-4 border-b border-gray-200">
										<Link
											href={`customers/editCustomer/${user.idDoc}`}
											className="text-blue-500 hover:text-blue-700"
										>
											<FaEdit />
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default page
