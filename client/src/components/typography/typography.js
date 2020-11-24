import React, { Component } from 'react';

import Icon from '../icon';

import './typography.scss';

export default class Typography extends Component {
    getClassNames(){
        const {className, theme, centered, weight, use = 'body1'} = this.props;

        return [
            className, 
            theme ? `mdc-typography--theme_${theme}` : false, 
            weight ? `mdc-typography--weight_${weight}` : false, 
            centered ? 'mdc-typography--centered' : false, 
            `mdc-typography mdc-typography--${use}`
        ].filter(Boolean).join(' ');
    }

    renderIcon(icon){
        if(!icon){
            return null;
        }

        if(typeof icon === "string"){
            return <Icon src={icon} tag="span" />;
        }

        return icon;
    }

    render(){
        const typography = {
            headline1: 'h1',
            headline2: 'h2',
            headline3: 'h3',
            headline4: 'h4',
            headline5: 'h5',
            headline6: 'h6',
            subtitle1: 'h6',
            subtitle2: 'h6',
            body1: 'p',
            body2: 'p',
            button: 'span',
            caption: 'span',
            overline: 'span',
        }
        const {use = 'body1', children, icon, trailingIcon} = this.props,
            Tag = `${typography[use]}`;

        return (
            <Tag className={this.getClassNames()} >
                {this.renderIcon(icon)}
                {children}
                {this.renderIcon(trailingIcon)}
            </Tag>
        );
    }
}