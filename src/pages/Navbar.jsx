import React, { useState } from 'react'
import { Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { ListItemIcon, Menu, MenuItem, MenuList } from '@mui/material';
import { useDispatch } from "react-redux";
import { logout } from '../states/customer'
import { useNavigate } from 'react-router-dom';

function Navbar({ user, screen, signin }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setOpen(true);
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className='w-full bg-white border rounded-lg shadow-sm'>
            <div className='w-full h-16 flex flex-row items-center px-4 justify-between'>
                <h1 className='font-lato-bold'>{screen.header}</h1>
                {!user._id ? <div className='flex flex-row'>
                    <button
                        onClick={() => { signin() }}
                        className='w-28 p-1 rounded-lg font-lato-bold text-base bg-[#ffc100]'>Signin</button>
                </div>
                    :
                    <div className='flex flex-row items-center gap-4 px-2 select-none'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <img
                                alt="Profile"
                                src={user.imageUrl}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <p className='text-[#555C68] text-sm font-lato-bold'>{user.name}</p>
                        </div>
                        <Cog6ToothIcon onClick={handleClick} className='w-5 text-[#555C68] cursor-pointer' />
                    </div>
                }
            </div>
            <Menu
                className='ml-[-10px]'
                id="customer-logout"
                anchorEl={anchorEl}
                open={open}
                dense='true'
                onClose={() => {
                    setAnchorEl(null)
                }}
            >
                <MenuList className='focus:outline-none'>
                    <MenuItem
                        onClick={() => {
                            setOpen(false);
                            dispatch(logout())
                            navigate(0)
                        }}>
                        <ListItemIcon>
                            <ArrowRightOnRectangleIcon className='w-5' />
                        </ListItemIcon>
                        <p className='text-sm'>Logout</p>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default Navbar