import React, { Component } from 'react';

import TextField from '../text-field';
import Avatar from '../avatar';
import Button from '../button';
import IconButton from '../icon-button';

import './comment-input.scss';

export default class CommentInput extends Component {
    state = {
        focused: false
    }

    componentDidMount(){
        // this.textarea.addEventListener
    }

    setFocus(isFocused){
        this.setState({
            focused: !!isFocused
        })
    }

    getClassNames(){
        const {focused} = this.state;

        return `comment-input${focused ? ' comment-input--focused': ''}`;
        // return `comment-input comment-input--focused`;
    }

    render(){
        const {avatar} = this.props,
            {focused} = this.state,
            rows = focused ? 3 : 1;
            console.log('focused', focused);
            console.log('rows', rows);


        return (
            <div className={this.getClassNames()}>
                <div className="comment-input__avatar">
                    <Avatar src={avatar} />
                </div>
                <div className="comment-input__body">
                    <TextField 
                        placeholder="What do you think? 🤔" 
                        textarea 
                        rows={rows} 
                        onFocus = {() => this.setFocus(true)}
                        onBlur={() => this.setFocus(false)}
                        fullWidth
                    />
                    <div className="comment-input__actions">
                        <div className="comment-input__media">
                            <IconButton icon="mood" />
                            <IconButton icon="attach_file" />
                            <IconButton icon="camera_alt" />
                        </div>
                        <div className="comment-input__submit">
                            <Button raised>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}