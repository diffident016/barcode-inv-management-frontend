import React, { useState } from 'react'
import { BASEURL } from '../../config';
import banner from '../assets/images/Barcode-bro.png'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthContext';
import { CircularProgress } from '@mui/material';

function Login() {

    const [error, setError] = useState();
    const [email, setEmail] = useState('');
    const [onLogin, setOnLogin] = useState(false);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const loginUser = (e) => {
        e.preventDefault();

        const user = {
            'email': email,
            'password': password
        }

        setError(null)
        setOnLogin(true)

        fetch(`${BASEURL}/api/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(async (result) => {
                if (result.status == 200) {
                    fetch(`${BASEURL}/api/login`)
                        .then((response) => response.json())
                        .then((data) => {
                            setOnLogin(false)
                            localStorage.setItem("user", JSON.stringify(data));
                            login(data._id, () => {
                                navigate("/");
                            });
                        })
                        .catch((err) => {
                            setOnLogin(false)
                            setError('Something went wrong.')
                        });
                } else {
                    setOnLogin(false)
                    setError('Invalid email or password.')
                }
            })
            .catch((error) => {
                setOnLogin(false)
                setError('Something went wrong.')
                console.log("Something went wrong ", error);
            });
    };

    return (
        <div className='w-full h-screen'>
            <div className='flex flex-row h-full w-full'>
                <div className='flex-1 flex items-center justify-center'>
                    <img className='w-[350px]' alt='banner' src={banner} />
                </div>
                <div className='flex-1 flex items-center justify-center h-full w-full '>
                    <div className='flex flex-col items-center border rounded-lg shadow-sm pt-10 w-[450px] h-[500px]'>
                        <h1 className='font-lato-bold text-2xl text-[#1F2F3D]'>LOGIN</h1>
                        <p className='font-lato py-4'>Enter your email and password to Log In.</p>
                        <div className='z-10 pt-8 flex flex-col w-[500px] h-full items-center'>
                            <form onSubmit={loginUser} className='flex flex-col z-10 w-[350px] py-2 font-lato-bold text-[#1F2F3D]'>
                                <label className='py-2 text-sm'>Email Address</label>
                                <input type='text' value={email} className='px-2 border font-roboto text-[#1F2F3D] border-[#1F2F3D] h-10 rounded-lg' name='username'
                                    pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?"
                                    title='Please enter a valid email'
                                    required={true}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                <label className='mt-3 py-2 text-sm'>Password</label>
                                <input type='password' value={password} className='px-2 border text-[#1F2F3D] border-[#1F2F3D] h-10 rounded-lg' name='username'
                                    required={true}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} />
                                <button disabled={onLogin} type='submit' className='mt-8 flex w-full h-10 bg-[#ffc100] rounded-lg justify-center items-center'>
                                    {onLogin ? <div className='flex flex-row items-center gap-4'>
                                        <CircularProgress size='18px' color='inherit' />
                                        <p className='text-[#1F2F3D] text-sm'>Logging in, please wait...</p>
                                    </div> : <p className='text-[#1F2F3D] text-sm'>Log In</p>}
                                </button>
                                <p className={`${error ? 'opacity-100' : 'opacity-0'} p-2 h-4 text-xs font-bold text-[#E8090C]`}>{error}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login