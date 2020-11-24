import React, { Component } from 'react';

import {MDCTextField} from '@material/textfield';
// import Icon from '../icon';
import TextFieldIcon from '../text-field-icon';

import './text-field.scss';

export default class TextField extends Component {
    constructor(props){
        super(props);
        this.input = React.createRef();
        // this.leadingIcon = React.createRef();
        // this.trailingIcon = React.createRef();
    }

    componentDidMount(){
        const textField = new MDCTextField(this.input.current);

        //если есть leading icon
        // if(this.leadingIcon.current) {
        //     const mdcLeadingIcon = new MDCTextFieldIcon(this.leadingIcon.current);
        // }
        //если есть trailing icon 
        // if(this.trailingIcon.current){
        //     const mdcTrailingIcon = new MDCTextFieldIcon(this.trailingIcon.current);
        // }
    }

    renderField(){
        const {textarea} = this.props;

        if(textarea){
            return this.getTextArea();
        }

        return this.getTextField();
    }

    getClassNames(){
        const {textarea, disabled, outlined, fullWidth, label, icon, trailingIcon} = this.props;

        return `mdc-text-field
            ${fullWidth ? 'mdc-text-field--fullwidth' : ''}
            ${textarea ? 'mdc-text-field--textarea' : ''}
            ${disabled ? 'mdc-text-field--disabled' : ''}
            ${icon ? 'mdc-text-field--with-leading-icon' : ''}
            ${trailingIcon ? 'mdc-text-field--with-trailing-icon' : ''}
            ${!label ? 'mdc-text-field--no-label' : ''}
            ${outlined ? 'mdc-text-field--outlined' : ''}`;
    }


    //leadOrTrail = 'leading' | 'trailing'
    getIcon(iconData, leadOrTrail){
        if(!iconData){
            return null;
        }
        
        if(typeof iconData === "string"){
            const icon = iconData;
            // return <i 
            // ref={leadOrTrail === 'leading' ? this.leadingIcon : this.trailingIcon}
            // className={`material-icons mdc-text-field__icon mdc-text-field__icon--${leadOrTrail}`}
            // >{icon}</i>
            return <TextFieldIcon 
                // ref={leadOrTrail === 'leading' ? this.leadingIcon : this.trailingIcon}
                className={`mdc-text-field__icon--${leadOrTrail}`}
                src={icon}
            />;
        } else {
            const {icon, ...rest} = iconData;
            // return  <i 
            //     ref={leadOrTrail === 'leading' ? this.leadingIcon : this.trailingIcon}
            //     className={`material-icons mdc-text-field__icon mdc-text-field__icon--${leadOrTrail}`}
            //     role="button"
            //     {...rest}
            // >{icon}</i>;
            return <TextFieldIcon 
                // ref={leadOrTrail === 'leading' ? this.leadingIcon : this.trailingIcon}
                className={`mdc-text-field__icon--${leadOrTrail}`}
                src={icon}
                role="button"
                {...rest}
            />;
        }
    }

    getTextField(){
        const {className, outlined, label, icon, trailingIcon, refInput, value = '',  ...rest} = this.props;

        const input = <input 
                        ref={refInput} 
                        className={["mdc-text-field__input", className].filter(Boolean).join(' ')}
                        aria-labelledby="my-label-id" 
                        aria-label={label}
                        value={value}
                        {...rest}
                    />;

        if(outlined){
            return (
                <React.Fragment>
                    {input}
                    {this.getIcon(icon, 'leading')}
                    {this.getIcon(trailingIcon, 'trailing')}
                    <div className="mdc-notched-outline">
                        <div className="mdc-notched-outline__leading"></div>
                        <div className="mdc-notched-outline__notch">
                            {this.renderLabel(label)}
                        </div>
                        <div className="mdc-notched-outline__trailing"></div>
                    </div>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <div className="mdc-text-field__ripple"></div>
                {input}
                {this.getIcon(icon, 'leading')}
                {this.getIcon(trailingIcon, 'trailing')}
                {this.renderLabel(label)}
                <div className="mdc-line-ripple"></div>
            </React.Fragment>
        );
    }

    renderLabel(label, id){
        if(!label) {
            return null;
        }

        return <span className="mdc-floating-label" id={id}>{label}</span>;
    }

    getTextArea(){
        const {label, refInput, ...rest} = this.props;

        return (
            <React.Fragment>
                <textarea 
                    ref={refInput} 
                    className="mdc-text-field__input" 
                    aria-labelledby="my-label-id" 
                    aria-label={label}
                    {...rest}
                ></textarea>
                <div className="mdc-notched-outline">
                    <div className="mdc-notched-outline__leading"></div>
                    <div className="mdc-notched-outline__notch">
                        {this.renderLabel(label)}
                    </div>
                     <div className="mdc-notched-outline__trailing"></div>
                </div>
            </React.Fragment>
        );
    }

    renderHelpText(helpText, isPersistent){
        if(!helpText) {
            return null;
        }

       return (
            <div className="mdc-text-field-helper-line">
                <div className={`mdc-text-field-helper-text${isPersistent ? ' mdc-text-field-helper-text--persistent' : ''}`} aria-hidden="true">{helpText}</div>
            </div>
        );
    }

    render(){
        //fullWidth и FloatingLabel несовместимы
        const { helpText, isPersistent } = this.props;

        return( 
            <React.Fragment>
                <label className={ this.getClassNames() } ref={this.input}>
                    { this.renderField() }
                </label>
                { this.renderHelpText(helpText, isPersistent) }
            </React.Fragment>
        );
    }
}