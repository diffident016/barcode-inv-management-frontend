import React, { useState, useMemo, useEffect } from 'react'
import category from '../../assets/data/category.json'
import { getAllProducts } from '../../api/product_api';
import barcode from '../../assets/images/barcode.png'
import { Backdrop } from '@mui/material';
import ShowProduct from './ShowProduct';

function Products({ signUp, user }) {

    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('Filter by category')
    const [products, setProducts] = useState([]);
    const [showProduct, setShowProduct] = useState(null);

    const categories = useMemo(() => category['categories'].map((cat) => {
        return {
            label: cat["category_name"],
            value: cat
        }
    }), [category]);

    useEffect(() => {
        getAllProducts('657175eea67f86460299f511').then((response) => response.json())
            .then((data) => {
                if (!data) return null;

                const products = data.map((item) => {
                    var newItem = item;

                    newItem['selected'] = false
                    return newItem
                });

                setProducts(products)
            })
            .catch((err) => console.log(err));

    }, [])

    return (
        <div className='w-full h-full flex flex-col overflow-hidden'>
            <div className='flex flex-row w-full my-4 items-center px-2 gap-4'>
                <div className='flex flex-col'>
                    <p className='font-lato-bold text-sm px-1 py-[2px]'>Search</p>
                    <input
                        value={query}
                        onChange={(e) => {
                            const query = e.target.value
                            setQuery(query)
                        }}
                        className='px-2 text-sm rounded-md h-9 w-52 border focus:outline-none bg-white shadow-sm'
                        placeholder='Search item' />
                </div>
                <div className='flex flex-col'>
                    <p className='font-lato-bold text-sm px-1 py-[2px]'>Category</p>
                    <div className='w-52 h-9 rounded-md focus:outline-none border px-1 bg-white shadow-sm'>
                        <select
                            value={filter}
                            defaultValue={'Filter by category'}
                            className='w-full h-full focus:outline-none bg-transparent text-sm '>
                            {categories.map((item, i) => <option id={item.id} value={JSON.stringify(item.value)}>{item.label}</option>)}
                        </select>
                    </div>
                </div>
                <div className='flex-1 flex flex-col self-end items-end'>
                    <div onClick={() => { }} className='shadow-sm flex gap-2 cursor-pointer justify-center h-9 p-2 w-52 rounded-md bg-white border'>
                        <img src={barcode} className='w-5' />
                        <h1 className='font-lato-bold text-sm'>Scan Barcode</h1>
                    </div>
                </div>


            </div>
            <div className='w-full h-full overflow-auto px-2'>
                <div className='w-full grid grid-cols-4 gap-4 py-2'>
                    {
                        products.map((item) => {
                            return (
                                <div key={item._id}
                                    onClick={() => { setShowProduct(item) }}
                                    className='cursor-pointer hover:ring-1 ring-[#ffc100] flex flex-col bg-white items-center h-[250px] w-full border rounded-lg shadow-sm p-4'>
                                    <div className='w-full h-28 flex justify-center'>
                                        <img src={item.photoUrl} alt={item.name} className='h-32 w-32 object-cover' />
                                    </div>
                                    <div className='flex w-full h-8 mt-8'>
                                        <h1 className='font-lato-bold leading-none'>{item.name}</h1>
                                    </div>
                                    <div className='mt-2 flex flex-row w-full justify-between'>
                                        <p className='font-lato-bold text-sm'>{item.price.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'PHP',
                                        })}</p>
                                        <p className='px-2 text-sm'>Stock: <span className='font-lato-bold'>{item.available}</span></p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!!showProduct}
            >
                {!!showProduct && <ShowProduct signUp={signUp} product={showProduct} action={() => { setShowProduct(null) }} />}
            </Backdrop>
        </div>
    )
}

export default Products