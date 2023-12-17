import React from 'react'
import {
    costIcon,
    purchaseIcon,
} from '../assets/images'

function PurchaseOverview() {
    return (
        <div className='w-[300px] h-full bg-white rounded-lg border p-4'>
            <h1 className='font-lato-bold text-sm'>Purchase Overview</h1>
            <div className='flex flex-col py-4 px-1 gap-4'>
                <div className='flex flex-1 flex-row'>
                    <div className='w-10 h-10 p-2 bg-[#fff2cc] rounded-lg'>
                        <img src={purchaseIcon} className='w-6 h-6' />
                    </div>
                    <div className='flex flex-col px-4'>
                        <p className='font-lato-bold text-xs'>No. of Purchase</p>
                        <p className='font-lato-bold'>10</p>
                    </div>
                </div>
                <div className='flex flex-1 flex-row'>
                    <div className='w-10 h-10 p-2 bg-[#ff007b]/10 rounded-lg'>
                        <img src={costIcon} className='w-6 h-6' />
                    </div>
                    <div className='flex flex-col px-4'>
                        <p className='font-lato-bold text-xs'>Cost</p>
                        <p className='font-lato-bold'>P200</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseOverview