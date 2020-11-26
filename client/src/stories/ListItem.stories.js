import React from 'react'
import { 
    List, 
    ListItem, 
    ListGroupSubheader, 
    ListGroup, 
    ListDivider, 
    ListItemMeta, 
    ListItemGraphic, 
    ListItemText, 
    ListItemPrimaryText,
    ListItemSecondaryText } from '../components/list'
import Radio from '../components/radio'
import Checkbox from '../components/checkbox'

export default {
    title: 'Front/Atoms/ListItem',
    component: ListItem
}

const Template = args => <ListItem {...args}>Item</ListItem>

export const Base = Template.bind({})
Base.args = {}

export const Selected = Template.bind({})
Selected.args = {
    selected: true
}

export const WithRipple = Template.bind({})
WithRipple.args = {
    withRipple: true
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true
}

export const PrimarySecondary = () => <ListItem>
    <ListItemText>
        <ListItemPrimaryText>Title 1</ListItemPrimaryText>
        <ListItemSecondaryText>Content</ListItemSecondaryText>
    </ListItemText>
</ListItem>

export const PrimarySecondaryWithGraphic = () => <ListItem>
    <ListItemGraphic icon={<img src="images/happyNY.png" />} />
    <ListItemText>
        <ListItemPrimaryText>Title 4</ListItemPrimaryText>
        <ListItemSecondaryText>Content</ListItemSecondaryText>
    </ListItemText>
</ListItem>

export const WithRadio = () => <ListItem >
    <ListItemGraphic icon="favorite"/>
    <ListItemText>
        Title 1
    </ListItemText>
    <ListItemMeta>
        <Radio name="radio1" id="radio_1" value="12"/>
    </ListItemMeta>
</ListItem>

WithRadio.args = {
    onClick: () => console.log('1')
}

export const WithCheckbox = () => <ListItem key={1} onClick={() => console.log('1')}>
    <ListItemText>
        Label
    </ListItemText>
    <ListItemMeta>
        <Checkbox id="checkbox1" name="checkbox1" value="1" />
    </ListItemMeta>
</ListItem>

export const WithNote = () => <ListItem >
    <ListItemText>
        Label
    </ListItemText>
    <ListItemMeta>NEW!</ListItemMeta>
</ListItem>

