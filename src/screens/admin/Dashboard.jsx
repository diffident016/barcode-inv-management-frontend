import React from 'react'
import SalesOverview from '../../components/SalesOverview'
import PurchaseOverview from '../../components/PurchaseOverview'
import UsersOverview from '../../components/UsersOverview'
import SalesForecast from '../../components/SalesForecast'
import {
    forecastIcon,
    growthIcon
} from '../../assets/images'

function Dashboard() {
    return (
        <div className='flex flex-col h-full overflow-auto p-4 gap-2 text-[#555C68]'>
            <div className='h-[180px] w-full flex flex-row gap-2 '>
                <SalesOverview />
                <PurchaseOverview />
                <UsersOverview />
            </div>
            <div className='flex flex-row w-full h-full gap-2'>
                <SalesForecast />
                <div className='flex flex-col w-[300px] h-full bg-white border rounded-lg p-4'>
                    <h1 className='font-lato-bold text-sm'>Actual Sales</h1>
                    <div className='flex w-full flex-row py-6 px-2'>
                        <div className='w-12 h-12 bg-[#fff2cc] p-2 rounded-lg'>
                            <img src={growthIcon} className='w-8 h-8' />
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='font-lato-bold opacity-70 text-sm'>Sales</p>
                            <p className='font-lato-bold'>4600</p>
                        </div>
                    </div>
                    <h1 className='font-lato-bold text-sm pt-2'>Forcasted Sales</h1>
                    <div className='flex w-full flex-row py-6 px-2'>
                        <div className='w-12 h-12 bg-[#8400ff]/10 p-2 rounded-lg'>
                            <img src={forecastIcon} className='w-8 h-8' />
                        </div>
                        <div className='flex flex-col px-4'>
                            <p className='font-lato-bold opacity-70 text-sm'>Sales</p>
                            <p className='font-lato-bold'>3590</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard