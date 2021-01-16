import React from 'react'

import TableData from '../table-data'
import Actions from '../actions'
import Checkbox from '../../../checkbox'

import './row.scss'

const Row = ({id, data, selected, onSelect, onEdit, onDelete}) => {
    /**
     * data = [
     *  {rowData, width},
     *  {rowData, width},
     *  {rowData, width},
     * ]
     */
    const renderData = (data) => {
        return data.map(item => <TableData {...item} />)
    }

    const getClassNames = () => {
        let classNames = `mdc-data-table__row
            ${selected ? 'mdc-data-table__row--selected' : ''}
        `
        return classNames
    }

    return (
        <tr 
            data-row-id={id}
            className={getClassNames()}
            aria-selected={selected ? "true" : ''}
        >
            <TableData 
                data={<div class="mdc-checkbox mdc-data-table__row-checkbox">
                    <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u1"/>
                    <div class="mdc-checkbox__background">
                        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                        </svg>
                        <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                    <div class="mdc-checkbox__ripple"></div>
                </div>
            } 
            withCheckbox
            />
            {/* <TableData 
                data={<Checkbox 
                    checked={selected} 
                    onChange={e => onSelect(e.target.checked, id)}
                    />
                }
                withCheckbox
             /> */}
            {renderData(data)}
            <TableData 
                data={<Actions 
                    id={id} 
                    onEdit={onEdit} 
                    onDelete={onDelete}
                />} 
            />
        </tr>
    )
}

export default Row


{/* <tr data-row-id="u0" class="mdc-data-table__row">
    <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
    <div class="mdc-checkbox mdc-data-table__row-checkbox">
        <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0"/>
        <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
        </div>
        <div class="mdc-checkbox__ripple"></div>
    </div>
    </td>
    <th class="mdc-data-table__cell" scope="row" id="u0">Arcus watch slowdown</th>
    <td class="mdc-data-table__cell">Online</td>
    <td class="mdc-data-table__cell">Medium</td>
    <td class="mdc-data-table__cell">Triaged</td>
    <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
    <td class="mdc-data-table__cell">Allison Brie</td>
</tr>
<tr data-row-id="u1" class="mdc-data-table__row mdc-data-table__row--selected" aria-selected="true">
    <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
        <div class="mdc-checkbox mdc-data-table__row-checkbox mdc-checkbox--selected">
        <input type="checkbox" class="mdc-checkbox__native-control" checked aria-labelledby="u1"/>
        <div class="mdc-checkbox__background">
            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
            </svg>
            <div class="mdc-checkbox__mixedmark"></div>
        </div>
        <div class="mdc-checkbox__ripple"></div>
        </div>
    </td>
    <th class="mdc-data-table__cell" scope="row" id="u1">monarch: prod shared ares-managed-features-provider-heavy</th>
    <td class="mdc-data-table__cell">Offline</td>
    <td class="mdc-data-table__cell">Huge</td>
    <td class="mdc-data-table__cell">Triaged</td>
    <td class="mdc-data-table__cell mdc-data-table__cell--numeric">0:33</td>
    <td class="mdc-data-table__cell">Brie Larson</td>
</tr> */}