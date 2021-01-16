import React from 'react'
import Comment from '../../components/comment'

export default {
    title: 'Front/Composite/Comment',
    component: Comment
}

const Template = args => <Comment {...args}/>

export const Base = Template.bind({})

Base.args = {
    name: "will_smith",
    text: "hmm.. im questioning about the definition of death in this manga. hahaha. just died and back to ori world or death like SAO? 🤓",
    likes: "0",
    timestamp: "1m"
}
export const WithAvatar = Template.bind({})

WithAvatar.args = {
    ...Base.args,
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png",
}

export const IsMine = Template.bind({})

IsMine.args = {
    ...Base.args,
    isMine: true
}

export const Highlighted = Template.bind({})

Highlighted.args = {
    ...Base.args,
    highlighted: true
}

export const WithLikes = Template.bind({})

WithLikes.args = {
    ...Base.args,
    likes: 2
}

export const Liked = Template.bind({})

Liked.args = {
    ...Base.args,
    isLiked: true
}