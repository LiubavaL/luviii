import React from 'react'

import Icon from '../../../icon'

import './table-head-data.scss'
import IconButton from '../../../icon-button'

const TableHeadData = ({label, sortable, width, columnId, sort, children, withCheckbox}) => {
    const data = !!children ? children : label
    const getClassNames = () => {
        return `mdc-data-table__header-cell 
            ${withCheckbox ? ' mdc-data-table__header-cell--checkbox' : '' }
            ${sortable ?  ` mdc-data-table__header-cell--with-sort` : ''}
            ${sortable && sort ?  ` mdc-data-table__header-cell--sorted` : ''}
        `
    }

    if(sortable){
        return (
            <th
            className={getClassNames()}
            role="columnheader"
            scope="col"
            aria-sort="none"
            data-column-id={columnId}
            // style={{width}}
            >
                <div class="mdc-data-table__header-cell-wrapper">
                    <div class="mdc-data-table__header-cell-label"> {data} </div>
                    <IconButton icon="arrow_upward" className="mdc-data-table__sort-icon-button" aria-label="Sort by dessert" aria-describedby="dessert-status-label"></IconButton>
                    {/* <button class="mdc-icon-button material-icons mdc-data-table__sort-icon-button" aria-label="Sort by dessert" aria-describedby="dessert-status-label">arrow_upward</button> */}
                    <div class="mdc-data-table__sort-status-label" aria-hidden="true" id="dessert-status-label"></div>
                </div>
            </th>
        )
    }

    return (
        <th 
            className={getClassNames()} 
            role="columnheader" 
            scope="col">
                {data}
        </th>
    )
}

export default TableHeadData