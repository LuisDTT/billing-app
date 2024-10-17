'use client'
import { useState } from 'react'
import { SideBar } from './layout/SideBar'
import { Header } from './layout/Header'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [showSideBar, setShowSideBar] = useState(false)
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    return (
        <div className="flex relative min-w-96">
            <SideBar toggleSideBar={toggleSideBar} showSideBar={showSideBar} />
            <div className="w-full bg-transparent h-screen overflow-auto flex flex-col">
                <Header toggleSideBar={toggleSideBar} />
                <main className="h-full relative">
                    <div className='absolute -z-10 opacity-5 bg-[url("../../public/assets/main-bg.svg")]  bg-no-repeat bg-center bg-contain w-full h-full'></div>
                    {children}
                </main>
            </div>
        </div>
    )
}
