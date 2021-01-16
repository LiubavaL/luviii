import React from 'react'
import ChapterForm from '../../components/admin/chapter-form'
import {BrowserRouter as Router} from 'react-router-dom'

export default {
    title: 'Admin/Composite/Chapter Form',
    component: ChapterForm,
    decorators: [story => <Router>{story()}</Router>]
}

const Template = args => <ChapterForm {...args}/>

export const Default = Template.bind({})

Default.args = {

}

export const WithArchive = Template.bind({})

WithArchive.args = {
    newPages: new File([123], 'pagesArchive.zip')
}

export const Filled = Template.bind({})

Filled.args = {
    title: 'Глава 1',
    description: 'Опсиание ваыва ыва ыва а ываы ваыва аыва ыв аыва',
    cover: 'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
    pages: [
        'https://img2.yaoi-chan.me/manga/-9new/l/1544877304_liquor_and_cigarette_c05_blastillusion-team/liquor-cigarette_c04_p024.png',
        'https://img2.yaoi-chan.me/manga/-9new/l/1544877304_liquor_and_cigarette_c05_blastillusion-team/liquor-cigarette_c04_p024.png',
        'https://img2.yaoi-chan.me/manga/-9new/l/1544877304_liquor_and_cigarette_c05_blastillusion-team/liquor-cigarette_c04_p024.png',
        'https://img2.yaoi-chan.me/manga/-9new/l/1544877304_liquor_and_cigarette_c05_blastillusion-team/liquor-cigarette_c04_p024.png',
        'https://img2.yaoi-chan.me/manga/-9new/l/1544877304_liquor_and_cigarette_c05_blastillusion-team/liquor-cigarette_c04_p024.png',
        'https://img2.yaoi-chan.me/manga/-9new/l/1544877304_liquor_and_cigarette_c05_blastillusion-team/liquor-cigarette_c04_p024.png',
        'https://img2.yaoi-chan.me/manga/-9new/l/1544877304_liquor_and_cigarette_c05_blastillusion-team/liquor-cigarette_c04_p024.png',
    ],
    newPages: new File([123], 'pagesArchive.zip')
}