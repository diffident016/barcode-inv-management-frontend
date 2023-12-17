import React, { useState } from 'react'
import addproduct from '../assets/images/add.png'
import { PlusIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import TextField from '@mui/material/TextField';

function AddProduct({ close }) {

    const [product, setProduct] = useState({
        name: "",
        description: "",
        photoUrl: "",
        price: 0,
        stock: 0,
        cost: 0,
        category: "",
        barcode: "",
        vendor: ""
    });

    return (
        <div className='w-[500px] h-[520px] bg-white rounded-lg text-[#555C68]'>
            <div className='flex flex-col w-full h-full p-4'>
                <div className='flex flex-row h-1 my-4 items-center justify-between px-2'>
                    <h1 className='flex gap-2 items-center font-lato-bold'><span><PlusIcon className='w-5' /></span>Add new Product</h1>
                    <XMarkIcon onClick={() => { close() }} className='w-5 cursor-pointer' />
                </div>
                <form className='flex flex-col p-4 w-full h-full'>
                    <div className='flex flex-row gap-4'>
                        <div className='w-[140px] cursor-pointer text-[#555C68]/70 h-[120px] rounded-lg border gap-2 select-none flex flex-col items-center justify-center'>
                            <PhotoIcon className='w-8 ' />
                            <p className='text-xs font-lato-bold flex flex-row gap-1 items-center'><span><PlusIcon className='w-3 h-3' /></span>Add image</p>
                        </div>
                        <div className='flex flex-col flex-1 h-full w-full gap-2'>
                            <div className='flex flex-col'>
                                <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>Product Name</label>
                                <input className='w-full h-8 rounded-md focus:outline-none border text-sm px-2' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>Category</label>
                                <input className='w-full h-8 rounded-md focus:outline-none border text-sm px-2' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div className='flex-1 flex flex-col'>
                            <label className='p-1 mt-1 text-xs font-lato-bold text-[#555C68]/80'>Price</label>
                            <input className='w-full h-8 rounded-md focus:outline-none border text-sm px-2' />
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <label className='p-1 mt-1 text-xs font-lato-bold text-[#555C68]/80'>Cost</label>
                            <input className='w-full h-8 rounded-md focus:outline-none border text-sm px-2' />
                        </div>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <div className='flex-1 flex flex-col'>
                            <label className='p-1 mt-1 text-xs font-lato-bold text-[#555C68]/80'>Manufacturer</label>
                            <input className='w-full h-8 rounded-md focus:outline-none border text-sm px-2' />
                        </div>
                        <div className='w-28 flex flex-col'>
                            <label className='p-1 mt-1 text-xs font-lato-bold text-[#555C68]/80'>Stock</label>
                            <input className='w-full h-8 rounded-md focus:outline-none border text-sm px-2' />
                        </div>
                    </div>
                    <label className='mt-2 p-1 text-xs font-lato-bold text-[#555C68]/80'>Description</label>
                    <textarea placeholder='Add product description' rows={4} className='text-sm p-2 border rounded-md resize-none focus:outline-none' />
                    <div className='flex flex-row w-full gap-5 px-2 my-5 justify-end'>
                        <button className='bg-[#555C68] rounded-md p-2 text-sm text-white'>Add Product</button>
                        <button className='font-lato-bold text-sm text-[#555C68]'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct