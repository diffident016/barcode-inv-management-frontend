import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
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
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { hide } from '../states/alerts';
import AdminSidebar from './AdminSidebar';

function AdminHomepage() {

    const [screen, setScreen] = useState(0);
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert.value);
    const user = useSelector((state) => state.user.value);

    const screens = [
        { label: 'Dashboard', component: <Dashboard />, icon: <Squares2X2Icon />, header: '' },
        { label: 'Inventory', component: <Inventory user={user} />, icon: <CubeIcon />, header: '' },
        { label: 'Purchase', component: <Purchase />, icon: <ShoppingCartIcon />, header: '' },
        { label: 'Sales', component: <Sales />, icon: <ArrowTrendingUpIcon />, header: '' },
        { label: 'Customers', component: <Customers />, icon: <UserGroupIcon />, header: '' }
    ]

    return (
        <div className='flex flex-col h-screen w-full font-lato'>
            <Navbar user={user} />
            <div style={{ height: "calc(100% - 64px)" }} className='flex flex-row w-full '>
                <AdminSidebar screens={screens} screen={screen} setScreen={setScreen} />
                <div className='h-full w-full'>
                    {alert.show && <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={alert.show}
                        autoHideDuration={alert.duration}
                        onClose={() => { dispatch(hide()) }}
                    >
                        <Alert severity={alert.type}>{alert.message}</Alert>
                    </Snackbar>}
                    {screens[screen].component}
                </div>
            </div>
        </div>

    )
}

export default AdminHomepage