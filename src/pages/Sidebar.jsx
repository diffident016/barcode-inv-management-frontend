import { Badge } from '@mui/material'
import React from 'react'

function Sidebar({ screens, setScreen, screen }) {
    return (
        <div className='py-2 flex flex-col w-full h-full px-2 font-lato gap-2 select-none'>
            {
                screens.map((item, index) => {
                    return (
                        <div
                            id={item.label}
                            onClick={() => {
                                setScreen(index)
                            }}
                            className={`flex flex-row h-12 ${screen == index ? 'text-[#ffc100]' : 'text-[#555C68]'} items-center gap-4 cursor-pointer`}>
                            <Badge badgeContent={item.count} color='warning'>
                                <div className={`w-[32px] h-[32px] p-1 rounded-full ${screen == index && 'bg-[#fff2cc]'}`}>
                                    {item.icon}
                                </div>
                            </Badge>
                            <p className={`font-lato-bold text-base`}>{item.label}</p>
                        </div>)
                })
            }
        </div>
    )
}

export default Sidebar