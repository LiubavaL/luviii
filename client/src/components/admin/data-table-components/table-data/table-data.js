import React from 'react'

import './table-data.scss'

const TableData = ({data, width, numeric, asInner, withCheckbox}) => {
    const styles = !!width ? {width} : null

    // console.log('TableData styles', styles)
    const getClassNames = () => {
        let classNames = `mdc-data-table__cell 
        ${withCheckbox ? 'mdc-data-table__cell--checkbox' : ''}
        ${numeric ? 'mdc-data-table__cell--numeric' : ''}
        `
        return classNames
    }

    // if(asInner){
    //     return <td>
    //         <div
    //             className="mdc-data-table__cell"
    //             style={styles} 
    //             dangerouslySetInnerHTML={{__html: data}}
    //         />
    //     </td>
    // }

    return (
        <td
            className={getClassNames()}
            style={styles} >
                {
                    asInner ? <div
                        className="mdc-data-table__cell"
                        style={styles} 
                        dangerouslySetInnerHTML={{__html: data}}
                    /> : data
                }
        </td>
    )
}

export default TableData