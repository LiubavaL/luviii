import React from 'react'
import Tab from '../../components/tab'

export default {
    title: 'Front/Atoms/Tab',
    component: Tab
}

const Template = args => <Tab {...args}/>

export const Default = Template.bind({})
Default.args = {
    label: "Title"
}

export const Active = Template.bind({})
Active.args = {
    ...Default.args,
    active: true
}

export const Stacked = Template.bind({})
Stacked.args = {
    ...Default.args,
    active: true,
    stacked: true
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    ...Default.args,
    active: true,
    icon: "favorite"
}

export const WithIndicatorIcon = Template.bind({})
WithIndicatorIcon.args = {
    ...Default.args,
    indicatorIcon: "favorite"
}

export const WithIndicatorIconActive = Template.bind({})
WithIndicatorIconActive.args = {
    ...Default.args,
    indicatorIcon: "favorite",
    active: true
}