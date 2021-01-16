import React from 'react'

import './helper-text.scss'

const HelperText = ({isPersistent, invalid, children}) => {
    return (
        <div 
            className={
                `mdc-text-field-helper-text
                ${isPersistent ? ' mdc-text-field-helper-text--persistent' : ''}
                ${invalid ? ' mdc-text-field-helper-text--validation-msg' : ''}`
            } 
            aria-hidden="true">
                {children}
        </div>
    )
}

export default HelperText