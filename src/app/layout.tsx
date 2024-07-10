import { Inter } from 'next/font/google'
import './globals.css'
import { FaUser } from 'react-icons/fa'
import { FaMoneyBill } from 'react-icons/fa'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="flex">
					<header className="h-screen bg-gray-900 text-white w-80">
						<h1 className="p-4 text-center font-bold text-lg border-b border-gray-700">
							MI NEGOCIO
						</h1>
						<nav className="mt-2">
							<Link
								href="/customers"
								className="flex items-center p-4 hover:bg-gray-700"
							>
								<FaUser className="mr-3" /> Clientes
							</Link>
							<Link
								href="/"
								className="flex items-center p-4 hover:bg-gray-700"
							>
								<FaMoneyBill className="mr-3" /> Facturacion
							</Link>
						</nav>
					</header>
					<main className="w-full bg-slate-50">{children}</main>
				</div>
			</body>
		</html>
	)
}
