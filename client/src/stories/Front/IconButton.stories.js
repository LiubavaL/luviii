import React from 'react'
import IconButton from '../../components/icon-button'

export default {
    title: 'Front/Atoms/IconButton',
    component: IconButton
}

const Template = args => <IconButton {...args} />

export const Base = Template.bind({})
Base.args = {
    icon: "search",
    withRipple: true
}

export const WithToggle = Template.bind({})
WithToggle.args = {
    icon: "search",
    onIcon: "favorite",
    onChange: e => {console.log('icon button toggled, e', e)}
}

export const WithToggleOn = Template.bind({})
WithToggleOn.args = {
    ...WithToggle.args,
    isOn: true
}