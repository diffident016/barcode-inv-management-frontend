import React, { useState, useMemo } from 'react'
import {
    PlusIcon
} from '@heroicons/react/24/outline'
import barcode from '../../assets/images/barcode.png'
import Backdrop from '@mui/material/Backdrop';
import AddProduct from '../../components/AddProduct';
import DataTable from "react-data-table-component";
import Loader from '../../components/Loader';
import sameleProducts from '../../assets/data/products.json'

function Inventory() {

    const [query, setQuery] = useState("");
    const [addProduct, setAddProduct] = useState(false);

    const products = useMemo(() => sameleProducts['products'].map((item) => item), [sameleProducts])

    const columns = useMemo(
        () => [
            {
                name: "#",
                cell: (row) => {
                    return (
                        <div className='flex flex-row h-full w-full'>
                            <div className='w-6'>

                            </div>
                            <div className='p-[1px] w-12 h-12 rounded-lg border'>
                                <img className='w-full h-full rounded-lg object-cover' src={row.photoUrl} alt='product photo' />
                            </div>

                        </div>
                    )
                },
                width: '120px'
            },
            {
                name: "SKU",
                selector: (row) => "000",
                width: '120px'
            },
            {
                name: "Product Name",
                selector: (row) => row.product_name,
                width: '250px'
            },
            {
                name: "Category",
                selector: (row) => row.category,
                width: '180px'
            },
            {
                name: "Price",
                selector: (row) => row.price,
                width: '100px'
            },
            {
                name: "Cost",
                selector: (row) => row.cost,
                width: '100px'
            },
            {
                name: "Stock",
                selector: (row) => row.stock,
                width: '100px'
            },
        ]
    );

    return (
        <div className='flex flex-row w-full h-full p-4 text-[#555C68] gap-4'>
            <div className='flex flex-col flex-1 h-full rounded-lg border bg-white p-6 overflow-hidden'>
                <h1 className='font-lato-black text-base'>Inventory</h1>
                <div className='flex flex-row justify-between w-full items-center pt-4'>
                    <input
                        value={query}
                        onChange={(e) => {
                            const query = e.target.value
                            setQuery(query)
                        }}
                        className='px-2 text-sm rounded-md h-8 w-52 border focus:outline-none'
                        placeholder='Quick Search' />
                    <div className='flex flex-row gap-2 select-none '>
                        <div className='flex gap-2 cursor-pointer'>
                            <img src={barcode} className='w-5' />
                            <h1 className='font-lato-bold text-sm'>Scan Barcode</h1>
                        </div>
                        <h1
                            onClick={() => { setAddProduct(true) }}
                            className='px-2 cursor-pointer flex gap-2 font-lato-bold text-sm text-[#555C68]'>
                            <span>{<PlusIcon className='w-5' />}</span> Add Product</h1>
                    </div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={addProduct}
                    >
                        <AddProduct close={() => { setAddProduct(false) }} />
                    </Backdrop>
                </div>
                <div className='flex flex-col w-full h-full px-2'>
                    <div className='flex flex-row w-full h-14 border-b items-center'>
                        {
                            columns.map((item) => {
                                return (
                                    <p style={{ width: item.width }} className='text-[#555C68]/80 text-sm font-lato-bold mx-1'>{item.name}</p>
                                );
                            })
                        }
                    </div>
                    <div className='flex flex-col overflow-auto h-full w-full pb-12'>
                        {
                            products.map((item) => {
                                return (
                                    <div className='flex flex-row w-full h-16 border-b py-2'>
                                        {
                                            columns.map((col) => {
                                                return (
                                                    <div style={{ width: col.width }} className='overflow-ellipsis mx-1 h-full flex flex-row items-center'>
                                                        {col.cell ? col.cell(item)
                                                            : <p className='w-full font-lato-bold text-sm overflow-hidden text-ellipsis'>{col.selector(item)}</p>}
                                                    </div>
                                                )
                                            })}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* <div className='w-[200px] h-full rounded-lg border bg-white p-4'>
                <h1 className='font-lato-black text-base'>Overview</h1>
            </div> */}
        </div>
    )
}

export default Inventory