import React from 'react'
import VolumeForm from '../../components/admin/volume-form'

export default {
    title: 'Admin/Composite/Volume Form',
    component: VolumeForm
}

const Template = args => <VolumeForm {...args}/>

export const Default = Template.bind({})

Default.args = {

}

export const WithOpenForm = Template.bind({})
WithOpenForm.args = {
    initialChapterFormOpened: true
}

export const Filled = Template.bind({})

Filled.args = {
    title: 'Том 1',
    description: 'Опсиание ТОма 12д2лдль лотдотт',
    cover: 'https://img2.yaoi-chan.me/manga/-7new/c/1600765490_coyote_15-bulochki/001.jpg',
    chapters: [
        {title: "Глава 1"},
        {title: "Глава 2"},
        {title: "Глава 3"},
        {title: "Глава 4"}
    ]
}

export const FilledWithOpenAdd = Template.bind({})
FilledWithOpenAdd.args = {
    ...Filled.args,
    ...WithOpenForm.args
}