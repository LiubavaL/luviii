import React from 'react'

import './error-indicator.scss'

const ErrorIndicator = ({message}) => {
    return <div>Oops, error has occured. <p>Message: {message}</p></div>
}

export default ErrorIndicator