import { MinusCircleIcon, MinusIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

function ShowProduct({ product, action }) {


    return (
        <div className='w-[800px] h-[500px] bg-[#f5f7f8] rounded-lg'>
            <div className='flex flex-row w-full h-full'>
                <div className='flex h-full items-center justify-center w-[45%]'>
                    <img src={product.photoUrl} className='w-64' />
                </div>
                <div className='flex-1 text-[#555C68] bg-white shadow-sm h-full rounded-e-lg p-4'>
                    <div className='flex flex-row justify-end'>
                        <XMarkIcon onClick={() => {
                            action();
                        }} className='w-5 cursor-pointer' />
                    </div>
                    <div className='w-full h-full flex flex-col p-4 mt-4'>
                        <h1 className='max-w-min text-xs font-lato-bold rounded-xl px-2 py-[2px] text-[#ffc100] border border-[#ffc100]'>{product.category.category_name}</h1>
                        <h1 className='py-4 font-lato-bold text-xl'>{product.name}</h1>
                        <p className='py-1 font-lato text-sm text-justify'>{product.description}</p>
                        <p className='pt-3 font-lato-bold text-xs opacity-90'>PRICE</p>
                        <p className='font-lato-bold text-lg tracking-wide'>{product.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'PHP',
                        })}</p>
                        <div className='py-3 flex flex-row justify-between'>
                            <div className='flex flex-col'>
                                <p className='pt-3 font-lato-bold text-xs opacity-90'>QUANTITY</p>
                                <div className='my-1 items-center flex flex-row max-w-min py-1 px-2 border rounded-[15px] shadow-sm'>
                                    <MinusIcon className='w-4 ' />
                                    <p className='w-8 bg-white text-center font-lato-bold'>0</p>
                                    <PlusIcon className='w-4' />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <p className='pt-3 font-lato-bold text-xs opacity-90'>STOCK</p>
                                <div className='my-1 items-center flex flex-row max-w-min py-1 px-2 border rounded-[15px] shadow-sm'>
                                    <p className='w-8 bg-white text-center font-lato-bold' >{product.available}</p>
                                </div>
                            </div>
                        </div>
                        <div className='py-3 flex flex-row justify-between gap-4 font-lato-bold text-sm'>
                            <button className='w-full text-[#ffc100]  h-10 border border-[#ffc100] rounded-lg shadow-sm'>Add to Cart</button>
                            <button className='w-full h-10 shadow-sm rounded-lg bg-[#ffc100]'>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowProduct