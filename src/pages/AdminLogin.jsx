import React, { useState } from 'react'
import banner from '../assets/images/Barcode-bro.png'
import { CircularProgress } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../api/user_api';
import { useDispatch } from "react-redux";
import { login } from '../states/user';

function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [onLogin, setOnLogin] = useState(false);
    const [error, setError] = useState('');
    const { signin, currentUser } = useAuth();

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const getUserData = async (uid) => {
        return getUser(uid)
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => {
                setError('Something went wrong, try again.')
                setOnLogin(false)
                console.log(err)
            });
    }

    const loginUser = async (e) => {
        e.preventDefault()

        setOnLogin(true)
        setError('');

        try {
            await signin(email, password);

            setTimeout(await getUserData(currentUser.uid).then((user) => {
                console.log(user)
                dispatch(login(user))
                navigate('/admin');
            }), 2000)

        } catch (e) {
            console.log(e);
            setError('Invalid email or password.')
            setOnLogin(false)
        }
    }

    return (
        <div className='w-full h-screen'>
            <div className='flex flex-row h-full w-full'>
                <div className='flex-1 flex items-center justify-center'>
                    <img className='w-[350px]' alt='banner' src={banner} />
                </div>
                <div className='flex-1 flex items-center justify-center h-full w-full '>
                    <div className='flex flex-col items-center border rounded-lg shadow-sm pt-10 w-[450px] h-[500px]'>
                        <h1 className='font-lato-bold text-2xl text-[#1F2F3D]'>LOGIN</h1>
                        <p className='font-lato py-4'>Enter your admin credentials to Log In.</p>
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

export default AdminLogin