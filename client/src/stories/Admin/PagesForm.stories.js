import React from 'react'

import PagesForm from '../../components/admin/pages-form'

export default {
    title: 'Admin/Composite/PagesForm',
    components: PagesForm
}

const Template = args => <PagesForm {...args}/>

export const Default = Template.bind({})
console.log('DEFAULT', Default)
Default.args = {
    
}

export const WithUploaded = Template.bind({})
WithUploaded.args = {
    file: new File([123], 'file.zip')
}

export const WithPages = Template.bind({})
WithPages.args = {
    pages: [
        'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
        'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
        'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
        'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
        'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
        'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
        'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
    ]
}