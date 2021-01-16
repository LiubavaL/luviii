import React from 'react'
import Card from '../../components/card'

export default {
    title: 'Front/Composite/Card',
    component: Card
}

const Template = args => <Card {...args} />

export const CardWithImage = Template.bind({})

CardWithImage.args = {
    imgs: ['images/happyNY.png'],
    views: 923,
    date: "1m ago"
}
export const CardWithImages = Template.bind({})

CardWithImages.args = {
    imgs: ['images/happyNY.png', 'images/microcosmos.png', 'images/red.png'],
    views: 923,
    date: "1m ago"
}

export const CardWithDesc = Template.bind({})

CardWithDesc.args = {
    text: "Description text" ,
    views: 923,
    date: "1m ago"
}

export const CardWithTitle = Template.bind({})

CardWithTitle.args = {
    title: "New t-shirts arrived!",
    views: 123,
    date: "2 days ago" 
}

export const CardFull = Template.bind({})

CardFull.args = {
    title: "Hey everybody!",
    text: "<div>In case you haven\'t heard, <br>I opened a Patreon account!💡💡💡There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    imgs: ["images/happyNY.png"],
    views: 123,
    date: "1m ago"
}