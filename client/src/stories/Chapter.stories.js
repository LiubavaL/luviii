import React from 'react'

import Chapter from '../components/chapter'
import {BrowserRouter as Router} from 'react-router-dom'

export default {
    title: 'Front/Composite/Chapter',
    component: Chapter,
    decorators: [story => <Router>{story()}</Router>]
}

const Template = args => <Chapter {...args}/>

export const Default = Template.bind({})
Default.args = {
    title: "September and part. My One And Only Love (The End)",
    index: "01",
    date: "7 Jul, 2019",
    cover: "images/default.png"
}

export const New = Template.bind({})
New.args = {
    ...Default.args,
    isNew: true
}

