import React from 'react'
import Checkbox from '../components/checkbox'

export default {
    title: "Front/Atoms/Checkbox",
    component: Checkbox
}

const Template = args => <Checkbox {...args}/>

export const Base = Template.bind({})

export const WithLabel = Template.bind({})

WithLabel.args = {
    label: "hey"
}