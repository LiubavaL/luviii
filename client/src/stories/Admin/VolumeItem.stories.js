import React from 'react'
import VolumeItem from '../../components/admin/volume-item'

export default {
    title: "Admin/Composite/Volume Item",
    component: VolumeItem
}

const Template = args => <VolumeItem {...args} />

export const Default = Template.bind({})
Default.args = {
    title: 'Том 2',
    desc: "Увлекательное продолжение истории первого тома!"
}

export const WithMenuOpen = Template.bind({})
WithMenuOpen.args = {
    ...Default.args,
    initialMenuOpen: true
}