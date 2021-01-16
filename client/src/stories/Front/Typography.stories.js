import React from 'react'
import Typography from '../../components/typography'


export default {
    title: 'Front/Atoms/Typography',
    component: Typography,
}
const Template = args => <Typography {...args}>Some typography text</Typography>

export const Default = Template.bind({})
Default.args = {
}

export const Headline1 = Template.bind({})
Headline1.args = {
    use: "headline1"
}

export const Headline2 = Template.bind({})
Headline2.args = {
    use: "headline2"
}

export const Headline3 = Template.bind({})
Headline3.args = {
    use: "headline3"
}

export const Headline4 = Template.bind({})
Headline4.args = {
    use: "headline4"
}

export const Headline5 = Template.bind({})
Headline5.args = {
    use: "headline4"
}

export const Headline6 = Template.bind({})
Headline6.args = {
    use: "headline4"
}

export const Subtitle1 = Template.bind({})
Subtitle1.args = {
    use: "subtitle1"
}

export const Subtitle2 = Template.bind({})
Subtitle2.args = {
    use: "subtitle2"
}

export const Body1 = Template.bind({})
Body1.args = {
    use: "body1"
}

export const Body2 = Template.bind({})
Body2.args = {
    use: "body2"
}

export const Button = Template.bind({})
Button.args = {
    use: "button"
}

export const Caption = Template.bind({})
Caption.args = {
    use: "caption"
}

export const Overline = Template.bind({})
Overline.args = {
    use: "overline"
}

export const Accented = Template.bind({})
Accented.args = {
    theme: "accent"
}

export const Light = Template.bind({})
Light.args = {
    weight: "light"
}

export const Centered = Template.bind({})
Centered.args = {
    centered: true
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    ...Headline1.args,
    icon: "star"
}

export const WithTrailingIcon = Template.bind({})
WithTrailingIcon.args = {
    ...Headline1.args,
    trailingIcon: "star"
}