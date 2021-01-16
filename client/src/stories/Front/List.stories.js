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
    ListItemSecondaryText } from '../../components/list'

import Radio from '../../components/radio'
import Checkbox from '../../components/checkbox'

export default {
    title: "Front/Composite/List",
    component: List
}

export const Base = () => <List>
        <ListItem selected>Title 1</ListItem>
        <ListItem>Title 2</ListItem>
        <ListItem>Title 3</ListItem>
    </List>

export const WithRadio = () => <List>
    <ListItem withRipple>
        <ListItemText>
            Title 1
        </ListItemText>
        <ListItemMeta>
            <Radio name="radio1" id="radio_1" value="12"/>
        </ListItemMeta>
    </ListItem>
    <ListItem withRipple>
        <ListItemText>
            Title 2
        </ListItemText>
        <ListItemMeta>
            <Radio name="radio1" id="radio_2" value="13"/>
        </ListItemMeta>
    </ListItem>
    <ListItem withRipple>
        <ListItemText>
            Title 3
        </ListItemText>
        <ListItemMeta>
            <Radio name="radio1" id="radio_3" value="14"/>
        </ListItemMeta>
    </ListItem>
</List>

export const WithCheckbox = () => <List>
    <ListItem key={1}  onClick={() => console.log('1')}>
        <ListItemText>
            Label 1
        </ListItemText>
        <ListItemMeta>
            <Checkbox id="checkbox1" name="checkbox1" value="1" checked />
        </ListItemMeta>
    </ListItem>
    <ListItem key={2}>
        <ListItemText>
            Label 2
        </ListItemText>
        <ListItemMeta>
            <Checkbox id="checkbox2" name="checkbox1" value="2" />
        </ListItemMeta>
    </ListItem>
    <ListItem key={3}>
        <ListItemText>
            Label 3
        </ListItemText>
        <ListItemMeta>
            <Checkbox id="checkbox3" name="checkbox1" value="3" />
        </ListItemMeta>
    </ListItem>
</List>

export const WithIcon = () => <List>
<ListItem withRipple>
    <ListItemGraphic icon="thump_up"/>
    <ListItemText>
        Title 1
    </ListItemText>
</ListItem>
<ListItem withRipple>
    <ListItemGraphic icon="favorite"/>
    <ListItemText>
        Title 2
    </ListItemText>
</ListItem>
<ListItem withRipple>
    <ListItemGraphic icon="search"/>
    <ListItemText>
        Title 3
    </ListItemText>
</ListItem>
</List>

export const Group = () => <ListGroup>
    <ListGroupSubheader>Group 1</ListGroupSubheader>
    <List twoLine>
        <ListItem selected>
            <ListItemText>
                <ListItemPrimaryText>Title 1</ListItemPrimaryText>
                <ListItemSecondaryText>Content</ListItemSecondaryText>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText>
                <ListItemPrimaryText>Title 2</ListItemPrimaryText>
                <ListItemSecondaryText>Content </ListItemSecondaryText>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemText>
                <ListItemPrimaryText>Title 3</ListItemPrimaryText>
                <ListItemSecondaryText>Content</ListItemSecondaryText>
            </ListItemText>
            <ListItemMeta>NEW!</ListItemMeta>
        </ListItem>
    </List>
    <ListDivider inner="false"/>
    <ListGroupSubheader>Group 2</ListGroupSubheader>
    <List twoLine avatarList>
        <ListItem>
            <ListItemGraphic icon={<img src="/images/default.png" />} />
            <ListItemText>
                <ListItemPrimaryText>Title 4</ListItemPrimaryText>
                <ListItemSecondaryText>Content</ListItemSecondaryText>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemGraphic icon={<img src="/images/default.png" />} />
            <ListItemText>
                <ListItemPrimaryText>Title 5</ListItemPrimaryText>
                <ListItemSecondaryText>Content</ListItemSecondaryText>
            </ListItemText>
        </ListItem>
        <ListItem>
            <ListItemGraphic icon={<img src="/images/default.png" />} />
            <ListItemText>
                <ListItemPrimaryText>Title 6</ListItemPrimaryText>
                <ListItemSecondaryText>Content</ListItemSecondaryText>
            </ListItemText>
        </ListItem>
    </List>
</ListGroup>