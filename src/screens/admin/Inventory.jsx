import React, { useState, useMemo } from 'react'
import {
    PlusIcon
} from '@heroicons/react/24/outline'
import barcode from '../../assets/images/barcode.png'
import Backdrop from '@mui/material/Backdrop';
import AddProduct from '../../components/AddProduct';

function Inventory() {

    const [query, setQuery] = useState("");
    const [addProduct, setAddProduct] = useState(false);

    const columns = useMemo(
        () => [
            {
                name: "Student ID",
                selector: (row) => row.student.studentId,
                width: '100px'
            },
            {
                name: "Name",
                selector: (row) => row.student.name,
                width: '200px'
            },
            {
                name: "Date Record",
                selector: (row) => format(row.dateRecord.toDate(), 'LL/dd/yyyy'),
                width: '110px'
            },
            {
                name: "Time",
                selector: (row) => format(row.dateRecord.toDate(), 'hh:mm a'),
                width: '110px'
            },
            {
                name: "Status",
                cell: function (row) {

                    return (
                        row.status == 0 ?
                            <div className="flex bg-[#339655] rounded-sm items-center justify-center w-[90px] h-[20px] cursor-pointer">
                                <p className="font-roboto-bold text-white text-xs">
                                    INSIDE
                                </p>
                            </div> :
                            <div className="flex bg-[#fb0200] rounded-sm items-center justify-center w-[90px] h-[20px] cursor-pointer">
                                <p className="font-roboto-bold text-white text-xs">
                                    OUTSIDE
                                </p>
                            </div>
                    )
                },
                width: '100px'
            },
        ]
    );

    return (
        <div className='flex flex-row w-full h-full p-4 text-[#555C68] gap-4'>
            <div className='flex flex-col flex-1 h-full rounded-lg border bg-white p-4'>
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
                    // onClick={() => {
                    //     setAddProduct(false)
                    // }}
                    >
                        <AddProduct close={() => { setAddProduct(false) }} />
                    </Backdrop>
                </div>

            </div>
            <div className='w-[250px] h-full rounded-lg border bg-white p-4'>
                <h1 className='font-lato-black text-base'>Overview</h1>
            </div>
        </div>
    )
}

export default Inventory