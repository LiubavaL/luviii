import React from 'react'

import './table-data.scss'

const TableData = ({/*data,*/ width, numeric, asInner, withCheckbox, children}) => {
    const styles = !!width ? {width} : null

    // console.log('TableData styles', styles)
    const getClassNames = () => {
        let classNames = `mdc-data-table__cell 
        ${withCheckbox ? 'mdc-data-table__cell--checkbox' : ''}
        ${numeric ? 'mdc-data-table__cell--numeric' : ''}
        `
        return classNames
    }

    if(asInner){
        return  <td
            className={getClassNames()}
            // style={styles} 
            dangerouslySetInnerHTML={{__html: children}}
        />
    }

    return (
        <td 
            className={getClassNames()}
            // style={styles}
            >
                {children}
        </td>
    )
}

export default TableData