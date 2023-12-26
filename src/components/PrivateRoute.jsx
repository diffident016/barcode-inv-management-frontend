import React from 'react'
import { useAuth } from '../auth/AuthContext';
import AdminLogin from '../pages/AdminLogin';
import AdminHomepage from '../pages/AdminHomepage';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {

    const { currentUser } = useAuth();
    const { pathname } = useLocation();
    const user = useSelector((state) => state.user.value);

    if (!currentUser || !user.userType) {

        if (pathname !== '/admin') return children;

        return <Navigate to='/login' replace />
    }

    return user.userType.typeId == 1 ? <AdminHomepage /> : <AdminLogin />
}

export default PrivateRoute