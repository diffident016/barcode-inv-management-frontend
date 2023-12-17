import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import Sidebar from './Sidebar';
import Dashboard from '../screens/admin/Dashboard';
import {
    Squares2X2Icon,
    CubeIcon,
    ShoppingCartIcon,
    ArrowTrendingUpIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'
import Inventory from '../screens/admin/Inventory';
import Purchase from '../screens/admin/Purchase';
import Sales from '../screens/admin/Sales';
import Customers from '../screens/admin/Customers';
import Navbar from './Navbar';

function Homepage() {

    const { currentUser, logout } = useAuth();
    const user = JSON.parse(localStorage.getItem("user"));
    const [screen, setScreen] = useState(0);

    const screens = [
        { label: 'Dashboard', component: <Dashboard />, icon: <Squares2X2Icon />, header: '' },
        { label: 'Inventory', component: <Inventory />, icon: <CubeIcon />, header: '' },
        { label: 'Purchase', component: <Purchase />, icon: <ShoppingCartIcon />, header: '' },
        { label: 'Sales', component: <Sales />, icon: <ArrowTrendingUpIcon />, header: '' },
        { label: 'Customers', component: <Customers />, icon: <UserGroupIcon />, header: '' }
    ]

    return (
        <div className='flex flex-col h-screen w-full font-lato'>
            <Navbar user={user} />
            <div className='flex flex-row h-full w-full overflow-hidden'>
                <Sidebar screens={screens} screen={screen} setScreen={setScreen} />
                <div className='h-full w-full'>
                    {screens[screen].component}
                </div>
            </div>
        </div>

    )
}

export default Homepage