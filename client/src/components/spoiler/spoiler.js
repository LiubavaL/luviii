import React, { Component } from 'react';

import Typography from '../typography';

import './spoiler.scss';
import Icon from '../icon';

export default class Spoiler extends Component {
    openedClass = 'spoiler--opened';

    //these local variables are initialized after a call to the parent's constructor
    state = {
        open: !!this.props.defaultOpen
    }

    constructor(props){
        super(props);
        this.heading = React.createRef();
    }
    
    getClassNames = () => {
        const {open} = this.state;

        return `spoiler
            ${open ? ` ${this.openedClass}` : ''}
        `;
    };

    onHeadingClick = (e) => {
        const {onClose, onOpen} = this.props,
            heading = this.heading.current,
            {open} = this.state;

        heading.classList.toggle(this.openedClass, !open);

        this.setState((state) => {
            return {
                open: !state.open
            };
        });

        if(this.state.open){
            if(typeof onClose === 'function'){
                onClose();
            }
        } else {
            if(typeof onOpen === 'function'){
                onOpen();
            }
        }
    };

    render(){
        const {heading, body} = this.props;

        return (
            <div className={this.getClassNames()}>
                <button className="spoiler__heading" ref={this.heading} onClick={this.onHeadingClick}>
                    <span className="spoiler__typography">
                        <Typography use='headline5'>
                            {heading}
                        </Typography>
                    </span>
                    <span className="spoiler__icon">
                        <Icon src="close" />
                    </span>
                </button>
                <div className="spoiler__body">
                    <Typography>{body}</Typography>
                </div>
            </div>
        );
    }
}