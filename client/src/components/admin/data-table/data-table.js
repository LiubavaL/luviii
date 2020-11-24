import React, { Component } from 'react'

import Checkbox from '../../checkbox'
import IconButton from '../../icon-button'

import './data-table.scss'

const TableHeadCol = ({name, sortable, onClick}) => {
    if(sortable){
        return (
            <th>
                <button onClick={onClick}>
                    <span>{name}</span>
                </button>
            </th>
        )
    }

    return (
        <th>
            <span>{name}</span>
        </th>
    )
}

const TableHead = ({keys}) => {
    const tableHeadToRender = keys.map(({name, sortable, onClick, width}) => {
        return <TableHeadCol 
            name={name}
            sortable={sortable}
            width={width}
            onClick={onClick}
        />
    })

    return <thead>{tableHeadToRender}</thead>
}

const TableBody = ({data}) => {
    const rowsToRender = data.map((item) => {
        const rowToRender = Object.keys(item).map(key => {
            return <td>{item[key]}</td>
        })

        return <tr>
                <td><Checkbox /></td>
                    {rowToRender}
                <td><Actions /></td>
            </tr>
    })

    return (
        <tbody>
            {rowsToRender}
        </tbody>
    )
}

const Actions = ({id}) => {
    return <>
            <IconButton icon="edit" onClick={() => console.log('edit row with id = ', id)}/>
            <IconButton icon="trash" onClick={() => console.log('delete row with id = ', id)}/>
        </>
}

export default class DataTable extends Component {
    state = {
        sort: {
            field: "created_at",
            dir: "asc"
        }
    }

    /* 
    Данные, отправленные через props
    data = [
            {id: 1, name: "Some name here", description: "sdfsd sdfsdf", created_at: "09-07-19"},
            {id: 2, name: "HEre is ndfdf dfdf", description: "sdf NJkjn KJN sdfsdf", created_at: "02-05-20"},
            {id: 3, name: "dfDsdfsdf name here", description: "Dsdfsd sdsd sdfsdf", created_at: "20-07-20"}
        ]

    Список ключей для заголовка таблицы, передается через props
    keys = [
        {
            field: "name",
            name: "Column Name",
            sortable: true,
            component: <Component />,
            width: "10%"
        }
    ]
    */

    render(){
        const {data, keys} = this.props

        let preparedKeys = [
            {
                component: <Checkbox />
            },
            ...keys,
            {
                name: "Действия"
            }
        ]

        return (
            <table>
                <TableHead keys={preparedKeys}/>
                <TableBody data={data}/>
            </table>
        )
    }
}