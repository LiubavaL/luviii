import React from 'react'
import {Menu} from '../components/menu'
import MenuSurface from '../components/menu-surface'
import MenuSurfaceAnchor from '../components/menu-surface-anchor'

import { 
    List, 
    ListItem } from '../components/list'

export default {
    title: "Front/Composite/Menu",
    component: Menu
}

export const Default = () => <MenuSurfaceAnchor>
    <button id="menu-button" onClick={() => console.log('toggle menu')}>Open Menu</button>
    <Menu open={true}>
        <List>
            <ListItem>Title 1</ListItem>
            <ListItem>Title 2</ListItem>
            <ListItem>Title 3</ListItem>
        </List>
    </Menu>
</MenuSurfaceAnchor>

export const Tooltip = () => <MenuSurfaceAnchor>
    <button 
        onMouseOver={() => console.log('mouse over tootlitp')}
        onMouseOut={() => console.log('tooltip hide')}
    >Opened Tooltip</button>
    <MenuSurface 
        anchorCorner='bottomStart' 
        open={true}
    >
        I'm a tooltip (bottomStart)
    </MenuSurface>
    <MenuSurface 
        anchorCorner='bottomEnd' 
        open={true}
    >
        I'm a tooltip (bottomEnd)
    </MenuSurface>
    <MenuSurface 
        anchorCorner='topStart' 
        open={true}
    >
        I'm a tooltip (topStart)
    </MenuSurface>
    <MenuSurface 
        anchorCorner='topEnd' 
        open={true}
    >
        I'm a tooltip (topEnd)
    </MenuSurface>
</MenuSurfaceAnchor>