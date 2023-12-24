import React from 'react'
import { useAuth } from '../auth/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from '../states/user';
import { getUser } from '../api/user_api';
import AdminLogin from '../pages/AdminLogin';

function PrivateRoute({ children }) {

    const { currentUser } = useAuth();

    const dispatch = useDispatch();

    console.log(currentUser)

    if (!currentUser) {
        return <AdminLogin />
    }

    getUser(currentUser.uid).then((response) => response.json())
        .then((user) => {
            dispatch(login(user))
        }).catch((err) => {
            console.log(err);
        })

    return children
}

export default PrivateRoute