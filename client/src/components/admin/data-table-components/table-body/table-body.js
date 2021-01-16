import React from 'react'

import './table-body.scss'

const TableBody = ({children}) => {
    return (
        <div className="tbody">
            {children}
        </div>
    )

}

export default TableBody