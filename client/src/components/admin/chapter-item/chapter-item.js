import React, { useState } from 'react'

import Typography from '../../typography'
import MenuSurfaceAnchor from '../../menu-surface-anchor'
import {Menu} from '../../menu'
import {
    List,
    ListItem,
    ListItemGraphic,
    ListItemText
} from '../../list'
import Icon from '../../icon'
import IconButton from '../../icon-button'

import './chapter-item.scss'

const ChapterItem = ({id, title, desc, cover = "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg", initialMenuOpen}) => {
    const [menuOpen, setMenuOpen] = useState(initialMenuOpen)

    return (
        <li className="chapters__item">
            <span className="chapters__checkbox"></span>
            <span className="chapters__move">
                <button className="drag">
                    <Icon src="drag_indicator" size="s"/>
                </button>
            </span>
            <div className="chapters__cover" style={{backgroundImage: `url(${cover})`}}></div>
            <span>
                <Typography use="subtitle1">{title}</Typography>
            </span>
            <span className={`chapters__more${menuOpen ? ' chapters__more--open' : ''}`}>
                <MenuSurfaceAnchor>
                    <IconButton 
                        icon="more_horiz"
                        onClick={() => setMenuOpen(!menuOpen)}
                        size="s"
                    />
                    <Menu 
                        open={menuOpen}
                        onSelect={() => setMenuOpen(false)}
                        onClose={() => setMenuOpen(false)}
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

export default ChapterItem