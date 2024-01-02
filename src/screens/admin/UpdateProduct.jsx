import React, { useState, useReducer, useRef, useMemo } from 'react'
import { PlusIcon, XMarkIcon, PhotoIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import category from '../../assets/data/category.json'
import { addProduct, productUpdate } from '../../api/product_api';
import { useSelector } from "react-redux";
import { CLOUDINARY_URL, STORE } from '../../../config';
import { useDispatch } from "react-redux";
import { show } from '../../states/alerts';
import PopupDialog from '../../components/PopupDialog';
import { CircularProgress } from '@mui/material';

function UpdateProduct({ currentProduct, close, refresh }) {

    const hiddenFileInput = useRef(null);
    const [fileError, setFileError] = useState("");
    const [fileImage, setFileImage] = useState(null);
    const user = useSelector((state) => state.user.value);
    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch();
    const [isAdding, setAdding] = useState(false);

    const [product, updateProduct] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            name: null,
            description: null,
            photoUrl: null,
            price: null,
            stock: null,
            cost: null,
            category: null,
            vendor: null,
        });

    const categories = useMemo(() => {

        var temp = [currentProduct.category];

        const filter = category['categories'].filter(function (item) {
            return item.category_id !== currentProduct.category.category_id
        });

        temp = temp.concat(filter);

        return temp.map((cat) => {
            return {
                label: cat["category_name"],
                value: cat
            };
        });

    }, [category]);


    const Field = (label, value, field, isCurrency = false, placeholder) => {

        if (isCurrency) {
            return (
                <div className='flex flex-col w-full'>
                    <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>{label}</label>
                    <div className='flex flex-row items-center w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 text-sm px-2'>
                        <p className='text-[#555C68]/80'>&#x20B1;</p>
                        <input
                            value={value}
                            placeholder={placeholder}
                            min={0}
                            type='number'
                            onChange={(e) => {
                                const value = e.target.value;
                                updateProduct({ [field]: !!value ? parseFloat(value) : null })
                            }}
                            className='w-full h-8 focus:outline-none bg-transparent text-end' />
                    </div>

                </div>);
        }
        return (
            <div className='flex flex-col w-full'>
                <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>{label}</label>
                <input
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => { updateProduct({ [field]: e.target.value }) }}
                    className='w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 text-sm px-2' />
            </div>
        )
    }

    const uploadImage = async (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "inventoryApp");

        return fetch(`${CLOUDINARY_URL}/image/upload`, {
            method: "POST",
            body: data,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        setFileError(null)

        if (checkChanges()) {
            setShowDialog(true);
        } else {
            dispatch(show({
                type: 'info',
                message: 'There are no changes detected.',
                duration: 2000,
                show: true
            }))
        }
    }

    const handleReset = () => {
        Object.keys(product).forEach((inputKey) => {
            updateProduct({ [inputKey]: null });
        });

        setFileImage(null)

        close();
    };

    const getCurrentFields = () => {

        var temp = currentProduct;

        Object.keys(product).map((inputKey) => {
            if (product[inputKey] != null && product[inputKey] != "" && product[inputKey] !== currentProduct[inputKey]) {
                temp[inputKey] = product[inputKey];
            }
        })

        return temp;
    };

    const checkChanges = () => {

        if (!!fileImage) return true;

        return !Object.keys(product).every(inputKey => {
            if (product[inputKey] != null && product[inputKey] != "" && product[inputKey] !== currentProduct[inputKey]) {
                return false;
            }

            return true;
        });
    };

    const handleUpdate = async () => {
        setAdding(true)

        var currentValue = getCurrentFields();

        if (!!fileImage) {
            const photoUrl = await uploadImage(fileImage)
                .then((res) => res.json())
                .then((data) => data.url)
                .catch((error) => console.log(error));

            currentValue['photoUrl'] = photoUrl;
        }

        productUpdate(currentValue).then((res) => res.json())
            .then((val) => {
                refresh();
                setAdding(false)
                dispatch(show({
                    type: 'success',
                    message: 'Product updated successfully.',
                    duration: 3000,
                    show: true
                }))

            })
            .catch((err) => {
                console.log(err);
                setAdding(false)
                dispatch(show({
                    type: 'error',
                    message: 'Failed to update the product.',
                    duration: 3000,
                    show: true
                }))
            });
    }

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
        return (
            <div className='relative w-full h-full'>
                <div className='absolute z-10 opacity-0 hover:opacity-100 bg-black/40 w-[140px] h-[120px] rounded-lg border-[#555C68]/50 border'>
                    <div className='flex flex-row items-center text-white justify-center h-full gap-2 cursor-pointer select-none'>
                        <PencilSquareIcon className='w-5' />
                        <p className='text-xs font-lato-bold flex flex-row gap-1 items-center'>Edit Image</p>
                    </div>
                </div>
                <img src={!!photo ? URL.createObjectURL(photo) : currentProduct.photoUrl} className='border-[#555C68]/50 border shadow-sm w-[140px] h-[120px] rounded-lg' />
            </div>
        );
    }

    return (
        <div className='relative w-[480px] h-[520px] bg-white rounded-lg text-[#555C68]'>
            {isAdding &&
                <div className='flex items-center justify-center absolute w-full h-full bg-white/60'>
                    <CircularProgress color='inherit' className='text-[#ffc100]' />
                </div>
            }
            <div className='flex flex-col w-full h-full p-3'>
                <div className='flex flex-row h-1 my-4 items-center justify-between px-4'>
                    <h1 className='flex gap-2 items-center font-lato-bold'><span><PencilSquareIcon className='w-5' /></span>Update Product</h1>
                    <XMarkIcon onClick={() => {
                        handleReset()
                        close()
                    }} className='w-5 cursor-pointer' />
                </div>
                <form onSubmit={handleSubmit} onReset={handleReset} className='flex flex-col p-4 w-full h-full'>
                    <div className='flex flex-row gap-4'>
                        <div onClick={handleClick} className='w-[140px] text-[#555C68]/70 h-[120px] rounded-lg'>
                            <input
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                type='file'
                                className='hidden'
                                accept='image/png, image/gif, image/jpeg' />
                            {imageDisplay(fileImage)}
                        </div>
                        <div className='flex flex-col flex-1 h-full w-full gap-2'>
                            {Field('Product Name', product.name, 'name', false, currentProduct.name)}
                            <div className='flex flex-col w-full'>
                                <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>Category</label>
                                <div className='w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 px-1'>
                                    <select
                                        onChange={(e) => {
                                            updateProduct({ category: JSON.parse(e.target.value) })
                                        }}
                                        className={`w-full h-full focus:outline-none bg-transparent text-sm ${(!product.category || product.category.category_id === currentProduct.category.category_id) && 'text-[#555C68]/60'}`}>
                                        {categories.map((item, i) => <option id={item.id} value={JSON.stringify(item.value)}>{item.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 mt-2'>
                        {Field('Price', product.price, 'price', true, currentProduct.price)}
                        {Field('Cost', product.cost, 'cost', true, currentProduct.cost)}
                    </div>
                    <div className='flex flex-row gap-2 mt-2'>
                        {Field('Manufacturer', product.vendor, 'vendor', false, currentProduct.vendor)}
                        <div className='w-28 flex flex-col'>
                            <label className='pb-1 text-xs font-lato-bold text-[#555C68]/80'>Stock</label>
                            <input
                                type='number'
                                min={0}
                                value={product.stock}
                                placeholder={currentProduct.stock}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    updateProduct({
                                        stock: !!value ? parseFloat(value) : null,
                                    })
                                }}
                                className='w-full h-8 rounded-md focus:outline-none border border-[#555C68]/50 text-sm px-2' />
                        </div>
                    </div>
                    <label className='mt-2 p-1 text-xs font-lato-bold text-[#555C68]/80'>Description</label>
                    <textarea
                        value={product.description}
                        onChange={(e) => { updateProduct({ description: e.target.value }) }}
                        placeholder={currentProduct.description}
                        rows={4}
                        className='text-sm p-2 border-[#555C68]/50 border rounded-md resize-none focus:outline-none' />
                    <div className='flex flex-row w-full gap-5 px-2 my-5 justify-end'>
                        {fileError && <p className='flex-1 text-sm text-[#ff3333]'>{fileError}</p>}
                        <button type='submit' className='bg-[#ffc100] rounded-md p-2 px-4 text-sm font-lato-bold'>Update Product</button>
                        <button type='reset' className='font-lato-bold text-sm text-[#555C68]'>Cancel</button>
                    </div>
                </form>
                <PopupDialog
                    show={showDialog}
                    close={() => { setShowDialog(false) }}
                    title='Update Product'
                    content='Are you sure you want to update this product?'
                    action1={async () => {
                        handleUpdate();
                        setShowDialog(false)
                    }}
                    action2={() => {
                        setShowDialog(false)
                    }}
                />
            </div>
        </div>
    )
}

export default UpdateProduct