import React from 'react'

import Radio from '../components/radio'

export default {
    title: 'Front/Atoms/Radio',
    component: Radio
}

const Template = args => <Radio {...args}/>

export const Default = Template.bind({})
Default.args = {
    label: "Radio button",
    name: "Label1",
    value: "1"
}

export const Disabled = Template.bind({})
Disabled.args = {
    ...Default.args,
    disabled: true
}

export const Checked = Template.bind({})
Checked.args = {
    ...Default.args,
    checked: true
}