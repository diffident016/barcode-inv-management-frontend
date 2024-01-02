import React, { useReducer } from 'react'

function Sales({ sales }) {

    const [stats, setStats] = useReducer((prev, next) => {
        return { ...prev, ...next }
    },
        {
            sales: 0,
            cost: 0,
            revenue: 0
        });

    const display = [
        {
            id: 0,
            label: "Sales",
            field: 'sales'
        },
        {
            id: 1,
            label: "Cost",
            field: 'cost'
        },
        {
            id: 2,
            label: "Revenue",
            field: 'revenue'
        }
    ]

    return (
        <div className='w-full h-full p-4 overflow-hidden'>
            <div className='w-full h-full flex flex-col overflow-auto text-[#555C68] font-lato'>
                <div className='w-full flex flex-row gap-4'>
                    {
                        display.map((item) => {
                            return (
                                <div key={item.id} className='select-none flex flex-col w-full h-28 bg-white rounded-lg shadow-sm border py-2 px-4'>
                                    <h1 className='font-lato-bold text-base'>{item.label}</h1>
                                    <h1 className='p-2 py-4 font-lato-black text-2xl'>{stats[item.field]}</h1>
                                </div>
                            )
                        })
                    }
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Sales