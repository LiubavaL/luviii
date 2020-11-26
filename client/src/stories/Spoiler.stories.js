import React from 'react'
import Spoiler from '../components/spoiler'

export default {
    title: 'Front/Composite/Spoiler',
    component: Spoiler
}

const Template = args => <Spoiler {...args}/>

export const Default = Template.bind({}) 
Default.args = {
    heading: "Which Apple PencW hich Apple Pencil will work with my iPad Which Ap ple Pencil will work with my iPadWh ich Apple Pencil will work with my iPa dil will work with my iPad?",
    body: "There are two Apple Pencil models. The original Apple Pencil is compatible with the 12.9‑inch iPad Pro (1st and 2nd generations), 10.5‑inch iPad Pro, 9.7‑inch iPad Pro, and iPad (6th generation). Apple Pencil (2nd generation) is compatible with the 12.9‑inch iPad Pro (3rd generation) and 11‑inch iPad Pro." 
}

export const Opened = Template.bind({})
Opened.args = {
    ...Default.args,
    defaultOpen: true
}