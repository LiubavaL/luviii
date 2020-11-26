import React from 'react'
import ChapterItem from '../components/admin/chapter-item'

export default {
    title: 'Admin/Composite/Chapter',
    component: ChapterItem
}

const Template = args => <ChapterItem {...args}/>


export const Default = Template.bind({})

Default.args = {
    title: "Глава 1",
    desc: "Product doesn't match the description? Contact us within 30 days after you receive it!Product doesn't match the description? Contact us within 30 days after you receive it!"
}

export const WithMenuOpened = Template.bind({})

WithMenuOpened.args = {
    ...Default.args,
    initialMenuOpen: true
}