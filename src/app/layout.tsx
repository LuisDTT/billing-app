import { Inter } from 'next/font/google'
import './globals.css'
import { MainLayout } from '@/components/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Mi Negocio',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MainLayout>{children}</MainLayout>{' '}
                {/* Agrupar los estilos en una carpeta () solo para billing y customers */}
            </body>
        </html>
    )
}
