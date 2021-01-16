import React from 'react'
import TextField from '../../components/text-field'

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
    outlined: true
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

export const WithCounter = Template.bind({})
WithCounter.args = {
    ...Default.args,
    maxLength: 10,
    withCounter: true
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

export const WithHelpTextPersistent = Template.bind({})
WithHelpTextPersistent.args = {
    ...Default.args,
    isPersistent: true,
    helpText: "Help text"
}

export const WithMaxLength = Template.bind({})
WithMaxLength.args = {
    ...Default.args,
    maxLength: 20
}

export const WithSuffix = Template.bind({})
WithSuffix.args = {
    ...Default.args,
    suffix: ".00"
}

export const WithPrefix = Template.bind({})
WithPrefix.args = {
    ...Default.args,
    prefix: "$"
}

export const Invalid = Template.bind({})
Invalid.args = {
    ...Default.args,
    invalid: true,
    helpText: "Введите не менее 10 символов"
}

export const InvalidOutline = Template.bind({})
InvalidOutline.args = {
    ...Invalid.args,
    ...Outlined.args,
    // useNativeValidation: false,
    value: "invalid value"
    // required: true,
    // pattern: "[A-Za-z]{3}"
}

export const Textarea = Template.bind({})
Textarea.args = {
    ...Default.args,
    textarea: true,
    rows: 7,

}

export const TextareaOulined = Template.bind({})
TextareaOulined.args = {
    ...Textarea.args,
    outlined: true
}

export const TextareaWithCounter = Template.bind({})
TextareaWithCounter.args = {
    ...Textarea.args,
    maxLength: 15,
    withCounter: true
}

export const TextareaInvalid = Template.bind({})
TextareaInvalid.args = {
    ...Textarea.args,
    invalid: true
}

