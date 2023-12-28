import React, { useEffect, useReducer, useState } from 'react'
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
import { STORE } from '../../config'
import { getAllProducts } from '../api/product_api'
import { getCart } from '../api/order_api'

function Homepage() {

    const [screen, setScreen] = useState(0);
    const [isSignUp, setSignUp] = useState(false);
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert.value);
    const customer = useSelector((state) => state.customer.value);

    const [products, setProducts] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            fetchState: 0,
            products: [],
            count: 0
        });

    const [cart, setCart] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            fetchState: 0,
            products: [],
            count: 0
        });

    const [order, setOrdes] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            fetchState: 0,
            orders: [],
            count: 0
        });

    const fetchCart = () => {
        setCart({ fetchState: 0 })
        getCart(customer._id).then((response) => response.json())
            .then((data) => {
                if (!data) return null;

                setCart({
                    fetchState: data.length < 1 ? 2 : 1,
                    products: data,
                    count: data.length
                })

            })
            .catch((err) => {
                console.log(err)
                setCart({ fetchState: -1 })
            });
    }

    const fetchProduct = () => {
        setProducts({ fetchState: 0 })
        getAllProducts(STORE.storeID).then((response) => response.json())
            .then((data) => {
                if (!data) return null;

                const products = data.map((item) => {
                    var newItem = item;

                    newItem['selected'] = false
                    return newItem
                });

                setProducts({
                    fetchState: products.length < 1 ? 2 : 1,
                    products: products,
                    count: products.length
                })

            })
            .catch((err) => {
                console.log(err)
                setProducts({ fetchState: -1 })
            });
    }

    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [])


    const screens = [
        {
            label: 'Products',
            component: <Products user={customer} signUp={setSignUp} products={products} />,
            icon: <ShoppingBagIcon />,
            header: 'Welcome, customer!'
        },
        {
            label: 'Shopping Cart',
            component: <ShoppingCart carts={cart} refresh={() => { fetchCart() }} />,
            icon: <ShoppingCartIcon />,
            header: 'Shopping Cart'
        },
        { label: 'Orders', component: <Orders />, icon: <CubeIcon />, header: 'Ordered Items' }
    ]

    return (
        <div className='w-full h-screen'>
            <div className='flex flex-row h-full w-full p-4 gap-4 overflow-hidden font-lato text-[#555C68]'>
                <div className='w-[20%] h-full bg-white shadow-sm border rounded-lg p-4'>
                    <div className='flex justify-center h-20 w-full py-2'>
                        <h1 className='cursor-pointer text-center font-cinzel font-extrabold text-xl text-[#1F2F3D]'>{STORE.storeName}</h1>
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