import React from 'react'

import ComicHeadForm from '../../components/admin/comic-head-form'

export default {
    title: 'Admin/Composite/Comic Head Form',
    component: ComicHeadForm
}

const Template = args => <ComicHeadForm {...args} />

export const Default = Template.bind({})

Default.args = {

}

export const Filled = Template.bind({})

Filled.args = {
    cover: 'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
    title: 'Глава 1',
    description: 'ddactions/dist/preset/addArgs.js-generated-other-entry.js ./node_modules/@storybook/addon-backgrounds/dist/preset/addDecorator.js-generated-other-entry.js ./node_modules/@storybook/addon-backgrounds/dist/preset/addParameter.js-generated-other-entry.js ./.storybook/preview.js-generated-config-entry.js ./.storybook/generated-stories-entry.js ./node_modules/webpack-hot-middleware/client.js?reload=true&quiet=false&noInfo=undefined'
}