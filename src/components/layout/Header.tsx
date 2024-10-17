import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiMenuBurger } from 'react-icons/ci'
import { FaUser, FaPowerOff } from 'react-icons/fa'

const getSectionName = (pathName: string | null): string => {
    if (pathName === '/customers') {
        return 'Clientes'
    } else if (pathName === '/customers/new') {
        return 'Registrar nuevo cliente'
    } else if (pathName?.includes('/customers/edit')) {
        return 'Actualizar datos de cliente'
    } else if (pathName === '/billing') {
        return 'Facturacion'
    } else if (pathName === '/billing/new') {
        return 'Generar nueva factura'
    } else if (pathName?.includes('/billing/billingView')) {
        return 'Detalles de factura'
    } else if (pathName === '/') {
        return 'Inicio'
    } else {
        return 'Error 404'
    }
}

export const Header = ({ toggleSideBar }: { toggleSideBar: () => void }) => {
    const pathName = usePathname()
    const router = useRouter()
    const [sectionName, setSectionName] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        setSectionName(getSectionName(pathName))
        setUserName(localStorage.getItem('userName'))
    }, [pathName])

    const handleLogOut = async () => {
        await axios.post('/api/auth/logoutHandler')
        localStorage.removeItem('userName')
        localStorage.removeItem('email')
        router.push('/login')
        router.refresh()
    }

    return !(pathName === '/login') ? (
        <header className="h-max flex justify-between items-center p-5 border-b-2 border-gray-300 bg-white md:px-16">
            <CiMenuBurger
                className="mr-4 hover:bg-slate-200 w-7 h-5 md:hidden"
                onClick={toggleSideBar}
            />
            <h2 className="font-bold grow ">
                {sectionName ?? (
                    <div className="animate-pulse self-center mx-1 bg-gray-200 rounded w-28 h-5"></div>
                )}
            </h2>
            <h3 className="flex gap-2 ">
                {userName ? (
                    <>
                        <span className="font-bold flex items-center gap-1">
                            ADMIN
                            <FaUser className="text-black" />:
                        </span>
                        {userName}
                    </>
                ) : (
                    <div className="animate-pulse self-center mx-1 bg-gray-200 rounded w-36 h-5"></div>
                )}
            </h3>
            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-8 flex items-center gap-2 uppercase"
                onClick={handleLogOut}
            >
                Salir
                <FaPowerOff />
            </button>
        </header>
    ) : (
        <></>
    )
}
