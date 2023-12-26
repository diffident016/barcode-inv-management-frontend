import React, { useState } from 'react'
import Products from '../screens/customers/Products'
import ShoppingCart from '../screens/customers/ShoppingCart'
import { CubeIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Orders from '../screens/customers/Orders'
import Sidebar from './Sidebar'
import { Backdrop } from '@mui/material'
import CustomerSignup from '../screens/customers/CustomerSignup'

function Homepage() {

    const [screen, setScreen] = useState(0);
    const [isSignUp, setSignUp] = useState(false);

    const screens = [
        { label: 'Products', component: <Products signUp={setSignUp} />, icon: <ShoppingBagIcon />, header: 'Welcome, customer!' },
        { label: 'Shopping Cart', component: <ShoppingCart />, icon: <ShoppingCartIcon />, header: 'Shopping Cart' },
        { label: 'Orders', component: <Orders />, icon: <CubeIcon />, header: 'Ordered Items' }
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
                    <div className='w-full bg-white border rounded-lg shadow-sm'>
                        <div className='w-full h-16 flex flex-row items-center px-4 justify-between'>
                            <h1 className='font-lato-bold'>{screens[screen].header}</h1>
                            <div className='flex flex-row'>
                                <button className='w-28 p-1 rounded-lg font-lato-bold text-base bg-[#ffc100]'>Login</button>
                            </div>
                        </div>
                    </div>
                    {screens[screen].component}
                </div>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isSignUp}
                >
                    <CustomerSignup close={() => { setSignUp(false) }} />
                </Backdrop>
            </div>

        </div>
    )
}

export default Homepage