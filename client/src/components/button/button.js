import React, {Component} from 'react';

import {MDCRipple} from '@material/ripple';
import Icon from '../icon';

import './button.scss';

export default class Button extends Component {
    constructor(props){
        super(props);
        this.button = React.createRef();
    }

    componentDidMount(){
        if(!!this.props.withRipple){
            new MDCRipple(this.button.current);
        }
    }

    getClassNames(){
        const { outlined, raised, unelevated, fullWidth, className } = this.props;
        const classNames = `mdc-button 
            ${ fullWidth ? 'mdc-button--fullwidth' : '' } 
            ${ raised ? 'mdc-button--raised' : '' } 
            ${ outlined ? 'mdc-button--outlined' : ''} 
            ${ unelevated ? 'mdc-button--unelevated' : ''}`;

        return [classNames, className].filter(Boolean).join(' ');
    }

    renderIcon(icon){
        if(!icon){
            return null;
        }

        if(typeof icon === "string"){
            return <div className="mdc-button__icon"><Icon src={icon} /></div>;
        }

        return icon;
    }

    // getFrontIcon(){
    //     const {icon} = this.props;

    //     return this.renderIcon(icon);
    // }

    // getTrailingIcon(){
    //     const {trailingIcon} = this.props;

    //     return this.renderIcon(trailingIcon);
    // }

    render () {
        const {label, children, className, icon, trailingIcon, tag = "button", ...rest} = this.props;
        const Tag = `${tag}`;
        
        return (
            <Tag 
                className={this.getClassNames()}
                ref={this.button} 
                {...rest}
            >
                {this.renderIcon(icon)}
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">
                    {label}
                    {children}
                </span>
                {this.renderIcon(trailingIcon)}
            </Tag>
        );
    }
}