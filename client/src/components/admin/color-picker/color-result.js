import React from 'react'

const ColorResult = ({color: {h, s, l, a}, ...rest}) => {
    return (
        <div 
            className="color-picker__color-result" 
            style={{background: `hsla(${h}, ${s}%, ${l}%, ${a})`}}
            {...rest}
        ></div>)
}

export default ColorResult