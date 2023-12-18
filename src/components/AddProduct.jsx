import React, { useState, useReducer, useRef, useMemo } from 'react'
import { PlusIcon, XMarkIcon, PhotoIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import category from '../assets/data/category.json'

function AddProduct({ close }) {

    const hiddenFileInput = useRef(null);
    const [fileError, setFileError] = useState("");

    const [product, updateProduct] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            name: "",
            description: "",
            photoUrl: null,
            price: "",
            stock: "",
            cost: "",
            category: "",
            barcode: "",
            vendor: ""
        });

    const categories = useMemo(() => category['categories'].map((cat) => {
        return {
            id: cat["category_id"],
            label: cat["category_name"],
            value: cat["category_name"].toLowerCase()
        }
    }), [category]);

    const Field = (label, value, field, isCurrency = false) => {

        if (isCurrency) {
            return (
                <div className='flex flex-col w-full'>
                    <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>{label}</label>
                    <div className='flex flex-row items-center w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 text-sm px-2'>
                        <p className='text-[#555C68]/80'>&#x20B1;</p>
                        <input
                            required
                            value={value}
                            placeholder='0'
                            min={0}
                            type='number'
                            onChange={(e) => { updateProduct({ [field]: e.target.value }) }}
                            className='w-full h-8 focus:outline-none bg-transparent text-end' />
                    </div>

                </div>);
        }
        return (
            <div className='flex flex-col w-full'>
                <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>{label}</label>
                <input
                    required
                    value={value}
                    onChange={(e) => { updateProduct({ [field]: e.target.value }) }}
                    className='w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 text-sm px-2' />
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!product.photoUrl || product.photoUrl == '') {
            setFileError('Please add a product image.')
            return
        }
    }

    const handleReset = (event) => {
        event.preventDefault();
        Object.keys(product).forEach((inputKey) => {
            updateProduct({ [inputKey]: ['price', 'cost', 'stock'].includes(inputKey) ? 0 : '' });
        });

        close();
    };

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
        updateProduct({ photoUrl: fileUploaded })
    };

    const imageDisplay = (photo) => {

        if (photo != null || photo == "") {

            console.log(product.photoUrl)
            return (
                <div className='relative w-full h-full rounded-lg'>
                    <div className='absolute z-10 opacity-0 hover:opacity-100 bg-black/40 w-[140px] h-[120px] rounded-lg'>
                        <div className='flex flex-row items-center text-white justify-center h-full gap-2 cursor-pointer select-none'>
                            <PencilSquareIcon className='w-5' />
                            <p className='text-xs font-lato-bold flex flex-row gap-1 items-center'>Edit Image</p>
                        </div>
                    </div>
                    <img src={URL.createObjectURL(product.photoUrl)} className='object-cover w-[140px] h-[120px] rounded-lg' />

                </div>
            );
        }
        return (
            <div className='flex flex-col items-center justify-center h-full gap-2 cursor-pointer select-none'>
                <PhotoIcon className='w-8 ' />
                <p className='text-xs font-lato-bold flex flex-row gap-1 items-center'><span><PlusIcon className='w-3 h-3' /></span>Add image</p>
            </div>
        );
    }

    return (
        <div className='w-[500px] h-[520px] bg-white rounded-lg text-[#555C68]'>
            <div className='flex flex-col w-full h-full p-4'>
                <div className='flex flex-row h-1 my-4 items-center justify-between px-2'>
                    <h1 className='flex gap-2 items-center font-lato-bold'><span><PlusIcon className='w-5' /></span>Add new Product</h1>
                    <XMarkIcon onClick={() => { close() }} className='w-5 cursor-pointer' />
                </div>
                <form onSubmit={handleSubmit} onReset={handleReset} className='flex flex-col p-4 w-full h-full'>
                    <div className='flex flex-row gap-4'>
                        <div onClick={handleClick} className='w-[140px] text-[#555C68]/70 h-[120px] rounded-lg border-[#555C68]/50 border '>
                            <input
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                type='file'
                                className='hidden'
                                accept='image/png, image/gif, image/jpeg' />
                            {imageDisplay(product.photoUrl)}
                        </div>
                        <div className='flex flex-col flex-1 h-full w-full gap-2'>
                            {Field("Product Name", product.name, 'name')}
                            <div className='flex flex-col w-full'>
                                <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>Category</label>
                                <div className='w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 px-1'>
                                    <select
                                        onChange={(e) => { console.log(e.target.value) }}
                                        required
                                        className='w-full h-full focus:outline-none bg-transparent text-sm '>
                                        {categories.map((item) => <option id={item.id} value={item.value}>{item.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 mt-2'>
                        {Field("Price", product.price, 'price', true)}
                        {Field("Cost", product.cost, 'cost', true)}
                    </div>
                    <div className='flex flex-row gap-2 mt-2'>
                        {Field("Manufacturer", product.manufacturer, 'manufacturer')}
                        <div className='w-28 flex flex-col'>
                            <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>Stock</label>
                            <input
                                required
                                type='number'
                                min={0}
                                value={product.stock}
                                onChange={(e) => { updateProduct({ stock: e.target.value }) }}
                                className='w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 text-sm px-2' />
                        </div>
                    </div>
                    <label className='mt-2 p-1 text-xs font-lato-bold text-[#555C68]/80'>Description</label>
                    <textarea placeholder='Add product description' rows={4} className='text-sm p-2 border-[#555C68]/50 border rounded-md resize-none focus:outline-none' />
                    <div className='flex flex-row w-full gap-5 px-2 my-5 justify-end'>
                        {fileError && <p className='flex-1 text-sm text-[#ff3333]'>{fileError}</p>}
                        <button type='submit' className='bg-[#555C68] rounded-md p-2 text-sm text-white'>Add Product</button>
                        <button type='reset' className='font-lato-bold text-sm text-[#555C68]'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct