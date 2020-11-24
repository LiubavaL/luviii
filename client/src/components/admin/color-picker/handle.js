import React from 'react'


const Handle = ({left, size}) => {
    return <div 
        className="color-picker__handle" 
        style={{left, width: `${size}px`, height: `${size}px`}}>
    </div>
}

export default Handle