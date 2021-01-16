import React from 'react'

import './table-head.scss'

/*
    [
        {key, title, width, sortable},
        {key, title, width, sortable},
        {key, title, width, sortable}
    ]
*/
const TableHead = ({children}) => {
    return <div className="th">{children}</div>
}

export default TableHead