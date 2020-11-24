import React, { Component } from 'react';

import TextField from '../text-field';
import MenuSurface from '../menu-surface';
import {
    List,
    ListItem,
    ListItemGraphic,
    ListItemText,
    ListItemPrimaryText,
    ListItemSecondaryText
} from '../list';

import './search.scss';
import MenuSurfaceAnchor from '../menu-surface-anchor';

export default class Search extends Component {
    getClassNames(){
        const {open, className} = this.props;

        return [
            `search${open ? ' search_opened' : ''}`, 
            className
        ].filter(Boolean).join(' ');
    }

    render(){
        const {onClick, onKeyDown, onBlur, refInput, menuOpen} = this.props;

        return (
            <form className={this.getClassNames()} action="/search">
                {/* <img src={searchIcon} /> */}
                <button onClick={onClick} className='search__icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18">
                        <path fill="#141124" d="M12.602 11.5c.986-1.214 1.577-2.76 1.577-4.446C14.18 3.158 11.021 0 7.125 0 3.23 0 .071 3.158.071 7.054c0 3.896 3.158 7.054 7.054 7.054 1.685 0 3.232-.59 4.445-1.577l5.255 5.255c.285.285.747.285 1.032 0 .285-.285.285-.747 0-1.032L12.602 11.5zm-5.477 1.149c-3.09 0-5.594-2.505-5.594-5.595S4.035 1.46 7.125 1.46c3.09 0 5.595 2.505 5.595 5.595s-2.505 5.595-5.595 5.595z"/>
                    </svg>
                </button>
               
                <MenuSurfaceAnchor>
                    <TextField 
                        placeholder="Search"
                        refInput={refInput} 
                        type="search" 
                        name="q" 
                        className="search__input" 
                        onKeyDown={onKeyDown}
                        onBlur={onBlur}
                        autoComplete='off'
                        icon="search"
                        // outlined
                        // fullWidth
                    />

                        <MenuSurface 
                            anchorCorner='bottomStart' 
                            className="search__autocomplete" 
                            fullWidth
                            open={menuOpen}>
                                <List twoLine avatarList>
                                    <ListItem>
                                        <ListItemGraphic icon={<img src="https://www.canva.com/wp-content/themes/canvaabout/img/colorPalette/image4.jpg" />} />
                                        <ListItemText>
                                            <ListItemPrimaryText>Title 1</ListItemPrimaryText>
                                            <ListItemSecondaryText>Content 1</ListItemSecondaryText>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemGraphic icon={<img src="https://c.disquscdn.com/uploads/users/27578/3691/avatar92.jpg?1521554683" />} />
                                        <ListItemText>
                                            <ListItemPrimaryText>Title 2</ListItemPrimaryText>
                                            <ListItemSecondaryText>Content 2</ListItemSecondaryText>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemGraphic icon={<img src="https://c.disquscdn.com/uploads/users/28079/9614/avatar92.jpg?1520287786" />} />
                                        <ListItemText>
                                            <ListItemPrimaryText>Title 3</ListItemPrimaryText>
                                            <ListItemSecondaryText>Content 3</ListItemSecondaryText>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                        </MenuSurface>
                </MenuSurfaceAnchor>
            </form>
        );
    }
}