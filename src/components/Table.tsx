interface TableProps {
	headings: string[]
	children: React.ReactNode
}

export const Table = ({ headings, children }: TableProps) => {
	return (
		<>
			<div className="overflow-auto rounded my-3 h-full">
				<table className=" min-w-full bg-white">
					<thead>
						<tr>
							{headings.map((item, index) => (
								<th
									key={item + index}
									className="py-2 px-4  text-gray-800 text-lg"
								>
									{item}
								</th>
							))}
						</tr>
					</thead>
					<tbody>{children}</tbody>
				</table>
			</div>
		</>
	)
}

interface TableRowProps {
	children: React.ReactNode
	index: number
}

export const TableRow = ({ children, index }: TableRowProps) => {
	return (
		<tr className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>{children}</tr>
	)
}

interface TableDataProps {
	data: React.ReactNode
}

export const TableData = ({ data }: TableDataProps) => {
	return (
		<td className="py-2 px-4 border-b border-gray-200 text-center ">{data}</td>
	)
}
