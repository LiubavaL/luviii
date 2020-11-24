import React, { Component, useState } from 'react'

import Typography from '../../typography'
import MenuSurfaceAnchor from '../../menu-surface-anchor'
import {Menu} from '../../menu'
import {
    List,
    ListItem,
    ListItemGraphic,
    ListItemText
} from '../../list'
import IconButton from '../../icon-button'
import Icon from '../../icon'

import './volume-item.scss'

const VolumeItem = ({id, title, desc, cover = "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg", initialMenuOpen = false}) => {
    const [menuOpen, setMenuOpen] = useState(initialMenuOpen)
    return (
        <li className="volume__item">
            <span className="volume__checkbox"></span>
            <span className="volume__move">
                <button className="drag">
                    <Icon src="drag_indicator" />
                </button>
            </span>
            <div className="volume__cover" style={{backgroundImage: `url(${cover})`}}></div>
            <span>
                <Typography use="headline5">{title}</Typography>
                <Typography use="caption">{desc}</Typography>
            </span>
            <span className={`volume__more${menuOpen ? ' volume__more--open' : ''}`}>
                <MenuSurfaceAnchor id="demo-menu">
                    <IconButton 
                        icon="more_horiz"
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                    <Menu 
                        open={menuOpen}
                        onClose={() => setMenuOpen(false)}
                        onSelect={() => setMenuOpen(false)}
                    >
                        <List>
                            <ListItem>
                                <ListItemGraphic icon="edit" />
                                <ListItemText>Редактировать</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemGraphic icon="delete_outline" />
                                <ListItemText>Удалить</ListItemText>
                            </ListItem>
                        </List>
                    </Menu>
                </MenuSurfaceAnchor> 
            </span>
        </li>
    )
}

export default VolumeItem