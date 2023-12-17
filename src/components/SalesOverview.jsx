import React from 'react'
import {
    salesIcon,
    costIcon,
    revenueIcon,
    profitIcon,
} from '../assets/images'

function SalesOverview() {
    return (
        <div className='flex flex-col w-full flex-1 h-full bg-white rounded-lg border p-4'>
            <h1 className='font-lato-bold text-sm'>Sales Overview</h1>
            <div className='flex flex-col py-4 px-1'>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-1 flex-row'>
                        <div className='w-10 h-10 bg-[#fff2cc] p-2 rounded-lg'>
                            <img src={salesIcon} className='w-6 h-6' />
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='font-lato-bold text-xs'>Total Sales</p>
                            <p className='font-lato-bold'>200</p>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-row'>
                        <div className='w-10 h-10 p-2 rounded-lg bg-[#8400ff]/10'>
                            <img src={revenueIcon} className='w-6 h-6' />
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='font-lato-bold text-xs'>Revenue</p>
                            <p className='font-lato-bold'>P100</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row py-4 w-full'>
                    <div className='flex flex-1 flex-row'>
                        <div className='w-10 h-10 p-2 bg-[#ff007b]/10 rounded-lg'>
                            <img src={costIcon} className='w-6 h-6' />
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='font-lato-bold text-xs'>Cost</p>
                            <p className='font-lato-bold'>P200</p>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-row'>
                        <div className='w-10 h-10 py-2 pl-[10px] bg-[#6EBC25]/20 rounded-lg'>
                            <img src={profitIcon} className='w-6 h-6' />
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='font-lato-bold text-xs'>Profit</p>
                            <p className='font-lato-bold'>P100</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesOverview