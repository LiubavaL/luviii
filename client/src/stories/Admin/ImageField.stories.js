import React from 'react'

import ImageField from '../../components/admin/image-field'

export default {
    title: 'Admin/Composite/Image Field',
    component: ImageField
}

const Template = args => <ImageField {...args} />

export const Default = Template.bind({})
Default.args = {
    onChange: (file) => console.log('Chenged to file ', file)
}

export const WithInitialValue = Template.bind({})
WithInitialValue.args = {
    ...Default.args,
    initialValue: "images/happyNY.png"
}

export const WithInitialLoading = Template.bind({})
WithInitialLoading.args = {
    initialLoading: true
}

export const WithInitialModified = Template.bind({})
WithInitialModified.args = {
    ...WithInitialValue.args,
    initialModified: true
}

export const Invalid = Template.bind({})
Invalid.args = {
    ...Default.args,
    invalid: true,
    helpText: "Required"
}
