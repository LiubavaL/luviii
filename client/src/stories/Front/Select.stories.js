import React from 'react'

import Select from '../../components/select'

export default {
    title: 'Front/Atoms/Select',
    component: Select,
    args: {
        onChange: () => {},
        options: ['Apple', 'Pineapple', 'Lemon'],
    }
}

const Template = args => <Select {...args}/>

export const Default = Template.bind({})
Default.args = {
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}

export const Outlined = Template.bind({})
Outlined.args = {
    outlined: true
}

export const Simple = Template.bind({})
Simple.args = {
    defaultValue: 0,
    simple: true
}

export const Light = Template.bind({})
Light.args = {
    theme: "light"
}

export const WithDefaultValue = Template.bind({})
WithDefaultValue.args = {
    defaultValue: "Apple"
}

export const WithDefaultValueNumber = Template.bind({})
WithDefaultValueNumber.args = {
    defaultValue: 0
}

export const WithLabel = Template.bind({})
WithLabel.args = {
    label: "Select a fruit"
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    icon: "favorite"
}

export const OptionsAsMap = Template.bind({})
OptionsAsMap.args = {
    options: {
        '1': 'One',
        '2': 'Two',
        '3': 'Three',
    }
}

export const WithLevels = Template.bind({})
WithLevels.args = {
    options: [
        {
            label: "Level1",
            value: 1
        },
        {
            label: "Level1 - title",
            options: [
                {
                    label: "level2 - 1",
                    value: 3
                },
                {
                    label: "level2 - 2",
                    value: 4,
                    'aria-disabled': true,
                    tabIndex: -1
                }
            ]
        },
        {
            label: "Level1",
            value: 2,
            'aria-disabled': true,
            tabIndex: -1
        }
    ]
}


