import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    let myLoginUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (myLoginUser) {
            setCurrentUser(myLoginUser._id);
            setLoading(false);
        } else {
            setCurrentUser("");
            setLoading(false);
        }
    }, [myLoginUser]);

    const login = (newUser, callback) => {
        setCurrentUser(newUser);
        callback();
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    };

    const value = {
        currentUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}