import { TbDatabaseImport } from 'react-icons/tb'
import { IoAlertCircleOutline } from 'react-icons/io5'

export const EmptyTable = () => {
    return (
        <tr className="w-full text-center relative h-10">
            <td className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center text-gray-400 select-none">
                No hay datos
                <IoAlertCircleOutline className="mx-1" />
                Inserte nuevos datos para mostrarlos aquí
                <TbDatabaseImport className="mx-1" />
            </td>
        </tr>
    )
}
