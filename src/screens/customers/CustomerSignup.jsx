import { XMarkIcon, PhotoIcon, PencilSquareIcon, PlusIcon, UserIcon, UserCircleIcon, CameraIcon } from '@heroicons/react/24/outline';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState, useRef, useReducer } from 'react'
import userIcon from '../../assets/images/user.png'

function CustomerSignup({ close }) {

    const [isLogin, setLogin] = useState(true);
    const hiddenFileInput = useRef(null);
    const [fileError, setFileError] = useState("");
    const [fileImage, setFileImage] = useState(null);

    const [form, updateForm] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            name: '',
            email: '',
            password: '',
            imageUrl: null
        });

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const fileUploaded = event.target.files[0];

        if (!allowedTypes.includes(fileUploaded.type)) {
            setFileError('Invalid image file.')
            return
        }
        setFileError(null)
        setFileImage(fileUploaded)
    };

    const imageDisplay = (photo) => {

        if (photo != null) {
            return (
                <div className='relative w-full h-full rounded-full'>
                    <div className='absolute z-10 opacity-0 hover:opacity-100 bg-black/40 w-[100px] h-[100px] rounded-full p-[1px]'>
                        <div className='flex flex-row items-center text-white justify-center h-full gap-2 cursor-pointer select-none'>
                            <PencilSquareIcon className='w-5' />
                            <p className='text-xs font-lato-bold flex flex-row gap-1 items-center'>Edit Image</p>
                        </div>
                    </div>
                    <img src={URL.createObjectURL(photo)} className='object-cover w-[100px] h-[100px] rounded-full' />
                </div>
            );
        }
        return (
            <div className='relative flex flex-col cursor-pointer select-none'>
                <img src={userIcon} className='rounded-full object-cover' />
                <div className='absolute right-0 bottom-0 rounded-full bg-white w-7 p-1 border shadow-md flex items-center'><CameraIcon className='w-6 ' /></div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(form)
    }

    const handleReset = (e) => {
        Object.keys(form).forEach((inputKey) => {
            updateForm({ [inputKey]: '' });
        });
    }

    return (<>
        {isLogin ?
            <div className='w-[450px] h-[440px] text-[#555C68] bg-white shadow-sm border rounded-lg'>
                <div className='flex flex-col h-full w-full p-4'>
                    <div className='flex flex-row justify-end'>
                        <XMarkIcon onClick={() => {
                            close();
                        }} className='w-5 cursor-pointer' />
                    </div>
                    <form onSubmit={handleSubmit} onReset={handleReset} className='flex flex-col w-full px-8 py-4'>
                        <h1 className='font-lato-bold text-lg'>To continue with your order, please sign in or create an account.</h1>
                        <div className='flex flex-col pt-6 '>
                            <label className='text-sm font-lato-bold'>Email</label>
                            <input
                                value={form.email}
                                onChange={(e) => { updateForm({ email: e.target.value }) }}
                                pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?"
                                required
                                className='px-2 my-1 w-full h-9 border border-[#555C68]/50 rounded-lg focus:outline-none'></input>
                        </div>
                        <div className='flex flex-col py-2'>
                            <label className='text-sm font-lato-bold'>Password</label>
                            <input
                                value={form.password}
                                onChange={(e) => {
                                    updateForm({ password: e.target.value })
                                }}
                                required
                                type='password' className='px-2 my-1 w-full h-9 border border-[#555C68]/50 rounded-lg focus:outline-none'></input>
                        </div>
                        <button type='submit' className='my-4 w-full h-9 bg-[#ffc100] text-sm font-lato-bold rounded-lg'>Sign in</button>
                        <p className='py-4 text-center'>Don't have an account? <span
                            onClick={() => {
                                handleReset();
                                setLogin(false)
                            }}
                            className='font-lato-bold cursor-pointer underline'>Sign up</span></p>
                    </form>

                </div>
            </div> :
            <div className='w-[450px] h-[520px] text-[#555C68] bg-white shadow-sm border rounded-lg'>
                <div className='flex flex-col h-full w-full p-4'>
                    <div className='flex flex-row justify-end'>
                        <XMarkIcon onClick={() => {
                            close();
                        }} className='w-5 cursor-pointer' />
                    </div>
                    <form onSubmit={handleSubmit} onReset={handleReset} className='flex flex-col w-full px-8 py-4'>
                        <div className='w-full flex items-center justify-center'>
                            <div onClick={handleClick} className='w-[100px] text-[#555C68]/70 h-[100px] rounded-full border-[#555C68]/50 border shadow-lg'>
                                <input
                                    onChange={handleChange}
                                    ref={hiddenFileInput}
                                    type='file'
                                    className='hidden'
                                    accept='image/png, image/gif, image/jpeg' />
                                {imageDisplay(fileImage)}
                            </div>
                        </div>
                        <div className='flex flex-col pt-4 w-full'>
                            <label className='text-sm font-lato-bold'>Full name</label>
                            <input
                                value={form.name}
                                onChange={(e) => { updateForm({ name: e.target.value }) }}
                                required
                                className='px-2 my-1 w-full h-9 border border-[#555C68]/50 rounded-lg focus:outline-none'></input>
                        </div>
                        <div className='flex flex-col pt-1 w-full'>
                            <label className='text-sm font-lato-bold'>Email</label>
                            <input
                                value={form.email}
                                onChange={(e) => { updateForm({ email: e.target.value }) }}
                                pattern="([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?"
                                required
                                className='px-2 my-1 w-full h-9 border border-[#555C68]/50 rounded-lg focus:outline-none'></input>
                        </div>
                        <div className='flex flex-col pt-1 w-full'>
                            <label className='text-sm font-lato-bold'>Password</label>
                            <input
                                value={form.password}
                                onChange={(e) => {
                                    updateForm({ password: e.target.value })
                                }}
                                required
                                type='password' className='px-2 my-1 w-full h-9 border border-[#555C68]/50 rounded-lg focus:outline-none'></input>
                        </div>
                        <button type='submit' className='mt-6 w-full h-9 bg-[#ffc100] text-sm font-lato-bold rounded-lg'>Sign up</button>
                        <p className='py-6 text-center'>Already have an account? <span
                            onClick={() => {
                                handleReset();
                                setLogin(true)
                            }}
                            type='reset'
                            className='font-lato-bold cursor-pointer underline'>Sign in</span></p>
                    </form>

                </div>
            </div>
        }
    </>

    )
}

export default CustomerSignup