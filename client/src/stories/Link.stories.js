import React from 'react'
import Link from '../components/link'
import {BrowserRouter as Router} from 'react-router-dom'

export default {
    title: 'Front/Atoms/Link',
    component: Link
}

const Template = args => <Router><Link {...args} /></Router>
const baseArgs = {
    href: "#",
    children: "Link"
}

export const Header = Template.bind({})
Header.args = {
    ...baseArgs,
    type: "header-nav"
}

export const HeaderAccentuated = Template.bind({})
HeaderAccentuated.args = {
    ...Header.args,
    accentuated: true
}

export const FooterNav = Template.bind({})
FooterNav.args = {
    ...baseArgs,
    type: "footer-nav"
}

export const Action = Template.bind({})
Action.args = {
    ...baseArgs,
    type: "action"
}

export const ActionAccentuated = Template.bind({})
ActionAccentuated.args = {
    ...Action.args,
    accentuated: true
}
