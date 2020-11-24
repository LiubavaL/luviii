import React from 'react'

import './color-picker.scss'

const Modal = ({children, show, onClick}) => {
    const styles = {
        // display: show ? 'block' : 'none',
        transform: show ? '' : 'scale(0)'
    }

    return (
        <div className="color-picker__modal-wrapper" style={styles}>
            <div className="color-picker__modal">
                {children}
            </div>
            <div className="color-picker__backdrop" onClick={onClick}></div>
        </div>
    )
}

export default Modal