import React, { Component, createRef } from 'react';

import {MDCTextFieldIcon} from '@material/textfield/icon';
import Icon from '../icon';

import './text-field-icon.scss';

export default class TextFieldIcon extends Component {
    constructor(props){
        super(props);
        this.icon = React.createRef();
        this.mdcComponent = null;
    }

    componentDidMount(){
        this.mdcComponent = new MDCTextFieldIcon(this.icon.current);
    }

    getClassNames(){
        const {className} = this.props;

        return ["mdc-text-field__icon", className].filter(Boolean).join(' ');
    }

    render(){
        const {className, ...rest} = this.props;

        return (
            <Icon 
                ref={this.icon}
                className={this.getClassNames()} 
                {...rest}
            />
        );
                // <i 
                //     ref={this.icon}
                //     className={this.getClassNames()} 
                //     tabindex="0" 
                //     role="button"
                //     {...rest}>
                //         event
                // </i>);
    }
}