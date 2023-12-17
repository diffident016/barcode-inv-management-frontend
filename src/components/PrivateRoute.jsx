import React from 'react'
import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {

    const { currentUser } = useAuth();

    console.log(currentUser)
    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default PrivateRoute