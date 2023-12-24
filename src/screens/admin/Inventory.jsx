import React, { useState, useMemo, useEffect } from 'react'
import {
    ChevronUpDownIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline'
import barcode from '../../assets/images/barcode.png'
import Backdrop from '@mui/material/Backdrop';
import AddProduct from '../../components/AddProduct';
import Barcode from 'react-barcode';
import { getAllProducts, loadProducts } from '../../api/product_api';

function Inventory({ user }) {

    const [query, setQuery] = useState("");
    const [addProduct, setAddProduct] = useState(false);
    const [products, setProducts] = useState([])
    const [isSelectAll, setSelectAll] = useState(false);

    useEffect(() => {

        console.log(user)
        getAllProducts(user._id).then((response) => response.json())
            .then((data) => {
                if (!data) return null;

                console.log(data)
                const products = data.map((item) => {
                    var item = item;

                    item['selected'] = false
                    return item
                });

                setProducts(products)
            })
            .catch((err) => console.log(err));

    }, [])

    const checkSelect = () => {
        var select = false;

        products.map((item) => {

            if (item['selected']) {
                select = true
                return
            }
        })

        return select
    }

    const selectAll = () => {

        setSelectAll(!isSelectAll)
        let newArr = [...products]

        newArr.map((_, index) => {
            newArr[index]['selected'] = isSelectAll;
        })

        setProducts(newArr)
    }

    const columns = useMemo(
        () => [
            {
                name: "#",
                cell: (row, index) => {
                    return (
                        <div className='flex flex-row h-full w-full items-center gap-5'>
                            <input onChange={(e) => {
                                let newArr = [...products]
                                newArr[index]['selected'] = e.target.checked;
                                setProducts(newArr)
                                checkSelect()
                            }} type='checkbox'
                                checked={row.selected}
                                className='h-3 w-3 rounded cursor-pointer' />
                            <div className='p-[1px] w-12 h-12 rounded-lg border'>
                                <img className='w-full h-full rounded-lg object-cover' src={row.photoUrl} alt='product photo' />
                            </div>
                        </div>
                    )
                },
                width: '100px'
            },
            {
                name: "Product Name",
                selector: (row) => row.name,
                width: '250px'
            },
            {
                name: "Category",
                selector: (row) => row.category.category_name,
                width: '180px'
            },
            {
                name: "Price",
                cell: (row) => <p className='w-full text-sm overflow-hidden text-ellipsis'>{row.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'PHP',
                })}</p>,
                width: '100px'
            },
            {
                name: "Cost",
                cell: (row) => <p className='w-full text-sm overflow-hidden text-ellipsis'>{row.cost.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'PHP',
                })}</p>,
                width: '100px'
            },
            {
                name: "Stock",
                cell: (row) => <p className='w-full text-sm overflow-hidden text-ellipsis'>{row.available}/{row.stock}</p>,
                width: '100px'
            },
            {
                name: "Barcode",
                cell: (row) =>
                    <div className='p'>
                        <Barcode
                            margin={0}
                            height={32}
                            width={1.5}
                            background='transparent'
                            fontSize={12}
                            value={row.barcode} />
                    </div>,
                width: '120px'
            }
        ]
    );

    return (
        <div className='w-full h-full p-4 text-[#555C68]'>
            <div className='flex flex-col flex-1 h-full rounded-lg border bg-white py-4 px-6'>
                <h1 className='font-lato-black text-base'>Inventory</h1>
                <div className='flex flex-row justify-between w-full items-center pt-4 pb-2'>
                    <div className='flex flex-row items-center'>
                        <input
                            value={query}
                            onChange={(e) => {
                                const query = e.target.value
                                setQuery(query)
                            }}
                            className='px-2 text-sm rounded-md h-8 w-52 border focus:outline-none'
                            placeholder='Quick Search' />
                        {checkSelect() && <div className='flex flex-row gap-2'>
                            <h1
                                onClick={() => { selectAll() }}
                                className='px-2 cursor-pointer select-none flex gap-2 font-lato-bold text-sm text-[#555C68]'>
                                <span>{<ChevronUpDownIcon className='w-5' />}</span> Select all</h1>
                            <h1
                                onClick={() => {

                                }}
                                className='px-2 cursor-pointer select-none flex gap-2 items-center font-lato-bold text-sm text-[#555C68]'>
                                <span>{<TrashIcon className='w-4' />}</span> Delete</h1>
                        </div>}

                    </div>

                    <div className='flex flex-row gap-2 select-none '>
                        <div onClick={() => { }} className='flex gap-2 cursor-pointer'>
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
                <div className='flex flex-col w-full h-full px-2 overflow-hidden'>
                    <div className='flex flex-row w-full h-14 border-b items-center drop-shadow-lg'>
                        {
                            columns.map((item) => {
                                return (
                                    <p style={{ width: item.width }} className='text-[#555C68]/80 text-sm font-lato-bold mx-1'>{item.name}</p>
                                );
                            })
                        }
                    </div>
                    {products.length == 0 ?
                        <div className='flex items-center justify-center w-full h-full'>
                            <h1>There are no products in the inventory.</h1>
                        </div>
                        : <div className='flex flex-col overflow-auto h-full w-full'>
                            {
                                products.map((item, index) => {
                                    return (
                                        <div
                                            onClick={() => { }}
                                            className={`${item.selected && 'bg-[#fff2cc]'} cursor-pointer flex flex-row w-full h-16 border-b py-2 hover:bg-[#fff2cc]`}>
                                            {
                                                columns.map((col) => {
                                                    return (
                                                        <div style={{ width: col.width }} className='text-ellipis font-lato mx-1 h-full flex flex-row items-center'>
                                                            {col.cell ? col.cell(item, index)
                                                                : <p className='w-full text-sm'>{col.selector(item)}</p>}
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    )
                                })
                            }
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Inventory