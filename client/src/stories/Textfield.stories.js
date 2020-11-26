import React from 'react'
import TextField from '../components/text-field'

export default {
    title: 'Front/Atoms/TextField',
    component: TextField
}

const Template = args => <TextField {...args}/>

export const Default = Template.bind({})
Default.args = {
    label: "Label"
}

export const Outlined = Template.bind({})
Outlined.args = {
    outline: true
}

export const FullWidth = Template.bind({})
FullWidth.args = {
    fullWidth: true
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
    placeholder: "placeholder"
}

export const Disabled = Template.bind({})
Disabled.args = {
    ...Default.args,
    disabled: true
}

export const WithValue = Template.bind({})
WithValue.args = {
    ...Default.args,
    value: "pref-filled value"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    ...Default.args,
    icon: {icon: "search", tabindex: 0}
}

export const WithTrailingIcon = Template.bind({})
WithTrailingIcon.args = {
    ...Default.args,
    trailingIcon: {icon: "close", tabindex: 0}
}


export const WithHelpText = Template.bind({})
WithHelpText.args = {
    ...Default.args,
    helpText: "Help text"
}

export const WithMaxLength = Template.bind({})
WithMaxLength.args = {
    ...Default.args,
    maxLength: 20
}

export const Textarea = Template.bind({})
Textarea.args = {
    textarea: true,
    rows: 7
}

