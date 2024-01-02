import React, { useEffect, useReducer } from 'react'
import SalesOverview from './SalesOverview'
import PurchaseOverview from './PurchaseOverview'
import SalesForecast from './SalesForecast'
import {
    forecastIcon,
    growthIcon
} from '../../assets/images'

function Dashboard({ sales, products, orders, customers }) {

    const [stats, setStats] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            fetchState: 0,
            sales: 0,
            cost: 0,
            revenue: 0,
            stocks: 0,
            products: 0,
            customers: 0,
            pending: 0,
            completed: 0
        });

    const computeSales = () => {

        var data = [];
        var sales = 0;
        var cost = 0;
        var stocks = 0;

        products['products'].map((item) => {
            data.push(
                {
                    productID: item._id,
                    name: item.name,
                    price: item.price,
                    item_cost: item.cost,
                    sold: item.sold,
                    sales: item.price * item.sold,
                    cost: item.cost * item.sold,
                    stock: item.price * (item.stock - item.sold)
                }
            )
        })

        data.map((item) => {
            sales += item.sales
            cost += item.cost
            stocks += item.stock
        })

        setStats({
            products: data.length,
            sales: sales,
            cost: cost,
            stocks: stocks,
            revenue: sales - cost
        })
    }

    const getCustomers = () => {

        setStats({
            customers: customers['count']
        })
    }

    const getOrders = () => {
        setStats({
            pending: !orders['orderGroup'][1] ? 0 : orders['orderGroup'][1].length,
            completed: !orders['orderGroup'][2] ? 0 : orders['orderGroup'][2].length
        })
    }

    useEffect(() => {
        getCustomers();
        computeSales();
        getOrders();
    }, [])

    return (
        <div className='flex flex-col h-full overflow-auto p-4 gap-2 text-[#555C68]'>
            <div className='h-[180px] w-full flex flex-row gap-2 '>
                <SalesOverview stats={stats} />
                <PurchaseOverview stats={stats} />
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