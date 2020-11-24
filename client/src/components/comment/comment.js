import React, { Component } from 'react';

import Typography from '../typography';
import IconButton from '../icon-button';
import Button from '../button';
import {Menu, MenuItem} from '../menu';
import MenuSurfaceAnchor from '../menu-surface-anchor';
import Icon from '../icon';
import Avatar from '../avatar';

import './comment.scss';

export default class Comment extends Component {
    state={
        menuOpen: false,
        highlighted: true
    }

    setOpen(isOpen){
        if(this.state.menuOpen != isOpen){
            this.setState({
                menuOpen: isOpen
            });
        }
    }

    getClassNames(){
        const {highlighted, isLiked} = this.props;

        return `comment
            ${highlighted ? ' comment--highlighted' : ''}
            ${isLiked ? ' comment--liked' : ''}`;
    }

    renderLike(isMine, likes) {
        const button = isMine ? 
                <span className="comment__like-icon">
                    <Icon 
                        src="favorite" 
                        className="comment__like"
                        size="s"
                    />
                </span>
                : <IconButton 
                    icon="favorite" 
                    size="s" 
                    className="comment__like"
                />;

        const counter = likes > 0  ? <Typography use="button">{likes}</Typography> : null;

        return [button, counter];
    }

    render(){
        const {avatar, name, text, timestamp, likes, isMine} = this.props,
            {menuOpen} = this.state;

        return (
            <div className={this.getClassNames()}>
                <div className="comment__avatar">
                    <Avatar src={avatar} />
                </div>
                <div className="comment__content">
                    <div className="comment__head">
                        <Typography use="headline6">{name}</Typography>
                        <span className="comment__timestamp">
                            <Typography use="caption">{timestamp}</Typography>
                        </span>
                        <MenuSurfaceAnchor className="comment__menu">
                            <IconButton icon="more_horiz" size="s" onClick={() => this.setOpen(true)}></IconButton>
                            <Menu 
                                open={menuOpen} 
                                onClose={() => this.setOpen(false)} 
                                onSelect={() => this.setOpen(false)}
                            >
                                <MenuItem>Copy link</MenuItem>
                                {isMine && <MenuItem>Edit</MenuItem>}
                                {isMine && <MenuItem accentuated>Delete</MenuItem>}
                                {!isMine && <MenuItem>Report</MenuItem>}
                            </Menu>
                        </MenuSurfaceAnchor>
                    </div>
                    <div className="comment__body">
                        <Typography>{text}</Typography>
                        <div className="comment__actions">
                            <Button>REPLY</Button>
                            {this.renderLike(isMine, likes)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}