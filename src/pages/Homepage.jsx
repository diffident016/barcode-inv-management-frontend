import React, { useState } from 'react'
import Products from '../screens/customers/Products'
import ShoppingCart from '../screens/customers/ShoppingCart'
import { CubeIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Orders from '../screens/customers/Orders'
import Sidebar from './Sidebar'

function Homepage() {

    const [screen, setScreen] = useState(0)

    const screens = [
        { label: 'Products', component: <Products />, icon: <ShoppingBagIcon />, header: '' },
        { label: 'Shopping Cart', component: <ShoppingCart />, icon: <ShoppingCartIcon />, header: '' },
        { label: 'Orders', component: <Orders />, icon: <CubeIcon />, header: '' }
    ]

    return (
        <div className='w-full h-screen'>
            <div className='flex flex-row h-full w-full p-4 gap-4 overflow-hidden font-lato text-[#555C68]'>
                <div className='w-[20%] h-full bg-white shadow-sm border rounded-lg p-4'>
                    <div className='flex justify-center h-20 w-full py-2'>
                        <h1 className='cursor-pointer text-center font-cinzel font-extrabold text-xl text-[#1F2F3D]'>Sample Store</h1>
                    </div>
                    <Sidebar screens={screens} screen={screen} setScreen={setScreen} />
                </div>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-row w-full h-16 bg-white border rounded-lg shadow-sm items-center px-10'>
                        <h1 className='h-16'></h1>
                    </div>
                    {screens[screen].component}
                </div>

            </div>

        </div>
    )
}

export default Homepage