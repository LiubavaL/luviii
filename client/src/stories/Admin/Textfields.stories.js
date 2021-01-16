import React from 'react'

import ImageField from '../../components/admin/image-field'

export default {
    title: 'Admin/Atoms/Button/ImageField',
    component: ImageField
}

const Template = args => <ImageField {...args}/>

export const Empty = Template.bind({})
Empty.args = {

}

export const Filled = Template.bind({})
Filled.args = {
    initialValue: "https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg"
}

// export const FilledHover = Template.bind({})
// FilledHover.args = {

// }

export const Uploading = Template.bind({})
Uploading.args = {
    initialLoading: true
}

export const ReuploadHover = Template.bind({})
ReuploadHover.args = {
    initialValue: "https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg",
    initialModified: true
}