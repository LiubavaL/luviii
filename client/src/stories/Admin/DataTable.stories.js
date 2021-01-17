import React from 'react'

import DataTable from '../../components/admin/data-table-components/data-table'

export default {
    title: 'Admin/Composite/DataTable/Table',
    component: DataTable
}

const Template = args => <DataTable {...args} />

export const Empty = Template.bind({})
Empty.args = {
    config: [
        {
            field: "id", 
            name: "ID",
            sortable: true,
            width: '15%'
        },
        {
            field: "name", 
            name: "Название",
            sortable: true,
            width: '20%'
        },
        {
            field: "description", 
            name: "Описание",
            sortable: true,
            width: '30%'
        },
        {
            field: "created_at", 
            name: "Дата создания",
            sortable: true,
            width: '30%'
        }
    ]
}

export const Filled = Template.bind({})
Filled.args = {
    ...Empty.args,
    data: [
        {id: 3456 , name: "some name here", description: "sdfsd sdfsdf", created_at: "09-07-19"},
        {id: 1234, name: "and is vxcvv xfdfgdfg dfdf", description: "345hkj NJkjn KJN sdfsdf", created_at: "02-05-20"},
        {id: 5678, name: "34553453 heref", description: "asdsf NJkjn KJN sdfsdf", created_at: "11-10-20"},
        {id: 8000, name: "099dgoues here", description: "ase check the Storybook config.f", created_at: "55-09-20"},
        {id: 2345, name: "1dfDsdfsdf name here", description: "ggsdf", created_at: "20-07-20"},
        {id: 8970, name: "Your title goues here", description: " problem persists, check the browser cons  problem persists, check the browser cons", created_at: "00-12-20"},
        {id: 120, name: "Hello everybody", description: "gcvf", created_at: "02-12-20"}
    ],
    selectedItems: [3456],
    defaultSortField: "id"
}