import React from 'react'
import Button from '../components/button'

export default {
  title: 'Front/Atoms/Button',
  component: Button,
  // argTypes: {
  //   backgroundColor: { control: 'green' },
  // },
}

const Template = (args) => <Button {...args} />

export const Link = Template.bind({})
Link.args = {
  tag: 'a',
  label: 'link',
  href: "#"
}

export const Basic = Template.bind({})
Basic.args = {
  label: 'link'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'disabled',
  disabled: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  label: 'favorite',
  icon: 'favorite'
}

export const WithTrailingIcon = Template.bind({})
WithTrailingIcon.args = {
  label: 'favorite',
  trailingIcon: 'trailing favorite'
}

export const Outlined = Template.bind({})
Outlined.args = {
  label: 'label',
  outlined: true
}

export const OutlinedDisabled = Template.bind({})
OutlinedDisabled.args = {
  label: 'disabled',
  outlined: true,
  disabled: true
}

export const Raised = Template.bind({})
Raised.args = {
  raised: true,
  unelevated: true,
  label: 'label'
}

export const RaisedDisabled = Template.bind({})
RaisedDisabled.args = {
  disabled: true,
  raised: true,
  label: 'label'
}

