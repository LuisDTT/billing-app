export default function loading() {
    return (
        <div className="m-7 animate-pulse">
            <div className="flex justify-end">
                <div className="h-10 bg-gray-200 rounded w-60"></div>
            </div>
            <div className="overflow-auto rounded my-3 h-full animate-pulse">
                <div className="min-w-full h-60 bg-gray-200"></div>
            </div>
        </div>
    )
}
