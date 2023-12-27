import React, { useState } from 'react'
import Products from '../screens/customers/Products'
import ShoppingCart from '../screens/customers/ShoppingCart'
import { Cog6ToothIcon, CubeIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import Orders from '../screens/customers/Orders'
import Sidebar from './Sidebar'
import { Backdrop } from '@mui/material'
import CustomerSignup from '../screens/customers/CustomerSignup'
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { hide } from '../states/alerts';
import Navbar from './Navbar'

function Homepage() {

    const [screen, setScreen] = useState(0);
    const [isSignUp, setSignUp] = useState(false);
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert.value);
    const customer = useSelector((state) => state.customer.value);

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
                    <Navbar screen={screens[screen]} user={customer} signin={() => { setSignUp(true) }} />
                    {screens[screen].component}
                </div>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isSignUp}
                >
                    <CustomerSignup close={() => { setSignUp(false) }} />
                </Backdrop>
            </div>
            {alert.show && <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={alert.show}
                autoHideDuration={alert.duration}
                onClose={() => { dispatch(hide()) }}
            >
                <Alert severity={alert.type}>{alert.message}</Alert>
            </Snackbar>}
        </div>
    )
}

export default Homepage