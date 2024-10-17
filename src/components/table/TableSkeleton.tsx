export const TableSkeleton = ({ columns }: { columns: number }) => {
    function generateColumns() {
        return [...Array(columns)].map((_, index) => {
            return (
                <td
                    key={index}
                    className="py-2 px-4 border-b border-gray-200 text-center"
                >
                    <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto"></div>
                </td>
            )
        })
    }

    return [...Array(5)].map((_, index) => {
        return (
            <tr key={index} className="animate-pulse">
                {generateColumns()}
            </tr>
        )
    })
}
