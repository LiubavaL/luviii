import React from 'react'
import TabBar from "../components/tab-bar"
import Tab from '../components/tab'

export default {
    title: "Front/Composite/TabBar",
    component: TabBar,
    args: {
        onActivate: e => console.log('TabBar onActivate')
    }
}

const Template = args => <TabBar {...args}/>

export const Default = Template.bind({})
Default.args = {
    tabs: [
        {label: 'Tab 1'},
        {label: 'Tab 2'},
        {label: 'Tab 3' },
    ]
}

export const DefaultSelected = Template.bind({})
DefaultSelected.args = {
    ...Default.args,
    defaultSelected: 1
}

export const Fade = Template.bind({})
Fade.args = {
    ...Default.args,
    fade: true
}

export const IconIndicator = Template.bind({})
IconIndicator.args = {
    tabs:[
        {label: 'Tab 1', indicatorIcon: "search"},
        {label: 'Tab 2', indicatorIcon: "favorite"},
        {label: 'Tab 3', indicatorIcon: "grade"},
    ]
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    tabs:[
        {label: 'Tab 1', icon: "search"},
        {label: 'Tab 2', icon: "favorite"},
        {label: 'Tab 3', icon: "grade"},
    ]
}

export const ExplicitChildren = () => <TabBar>
    <Tab label="Tab active" active/>
    <Tab label="Tab with Icon" icon="favorite"/>
    <Tab label="Simple"/>
    <Tab label="Tab indicatorIcon" indicatorIcon="search"/>
</TabBar>


