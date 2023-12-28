import { Dialog } from '@mui/material'
import React from 'react'

function PopupDialog({ open, close, children }) {
    return (
        <Dialog
            open={open}
            onClose={close}
        >
            {children}
        </Dialog>
    )
}

export default PopupDialog