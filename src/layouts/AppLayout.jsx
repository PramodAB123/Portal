import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
const AppLayout = () => {
    return (
        <div>
            <div className='grid-background'></div>
            <main className='min-h-screen container mx-auto'>
                <Header />
                <Outlet />
            </main>
            <div className='p-10 text-center text-gray-800'> Love by Pramod </div>
        </div>

    )
}

export default AppLayout