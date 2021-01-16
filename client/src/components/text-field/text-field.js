import React, { Component } from 'react';

import {MDCTextField} from '@material/textfield';
// import Icon from '../icon';
import TextFieldIcon from '../text-field-icon';
import HelperText from '../helper-text/helper-text';

import './text-field.scss';

export default class TextField extends Component {
    mdcComponent = null

    constructor(props){
        super(props);
        this.input = React.createRef();
        // this.leadingIcon = React.createRef();
        // this.trailingIcon = React.createRef();
    }

    componentDidMount(){
        this.mdcComponent = new MDCTextField(this.input.current);
        this.mdcComponent.useNativeValidation = false
        this.mdcComponent.valid = !this.props.invalid

        console.log('textField mounted', this.mdcComponent, this.mdcComponent.valid)

        //если есть leading icon
        // if(this.leadingIcon.current) {
        //     const mdcLeadingIcon = new MDCTextFieldIcon(this.leadingIcon.current);
        // }
        //если есть trailing icon 
        // if(this.trailingIcon.current){
        //     const mdcTrailingIcon = new MDCTextFieldIcon(this.trailingIcon.current);
        // }
    }

    componentDidUpdate(prevProps){
        const {invalid} = this.props
        if(prevProps.invalid !== invalid) {
            this.mdcComponent.valid = !invalid
            console.log('textField update', this.mdcComponent, this.mdcComponent.valid)
        }
    }

    renderField(){
        const {textarea} = this.props;

        if(textarea){
            return this.getTextArea();
        }

        return this.getTextField();
    }

    getClassNames(){
        const {
            textarea, 
            disabled, 
            outlined, 
            fullWidth, 
            label, 
            icon, 
            trailingIcon,
            invalid
        } = this.props;

        console.log('getClassNames invalid ', invalid)

        return `mdc-text-field
            ${fullWidth ? 'mdc-text-field--fullwidth' : ''}
            ${invalid ? 'mdc-text-field--invalid' : ''}
            ${textarea ? 'mdc-text-field--textarea' : ''}
            ${disabled ? 'mdc-text-field--disabled' : ''}
            ${icon ? 'mdc-text-field--with-leading-icon' : ''}
            ${trailingIcon ? 'mdc-text-field--with-trailing-icon' : ''}
            ${!label ? 'mdc-text-field--no-label' : ''}
            ${outlined ? 'mdc-text-field--outlined' : 'mdc-text-field--filled'}`;
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
        const {className, outlined, label, icon, trailingIcon, refInput, prefix, suffix, value = '',  ...rest} = this.props;

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
                <>
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
                </>
            );
        }
        return (
            <>
                <span className="mdc-text-field__ripple"></span>
                {this.renderLabel(label)}
                {this.renderPrefix(prefix)}
                {this.getIcon(icon, 'leading')}
                {input}
                {this.getIcon(trailingIcon, 'trailing')}
                {this.renderSuffix(suffix)}
                <span className="mdc-line-ripple"></span>
            </>
        );
    }

    renderLabel(label, id){
        if(!label) {
            return null;
        }

        return <span className="mdc-floating-label" id={id}>{label}</span>;
    }

    getTextArea(){
        const {label, refInput, outlined, ...rest} = this.props

        if(outlined){
            return (
                <>
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
                </>
            )
        }

        return (
            <>
                <span class="mdc-text-field__ripple"></span>
                {this.renderLabel(label)}
                <span class="mdc-text-field__resizer">
                    <textarea
                        ref={refInput} 
                        className="mdc-text-field__input"
                        aria-labelledby="my-label-id" 
                        aria-label={label}
                        {...rest}
                    ></textarea>
                </span>
                <span class="mdc-line-ripple"></span>
            </>
        )
    }

    renderHelpText(helpText, isPersistent, invalid){
        if(!helpText) {
            return null;
        }

       return (
            <div className="mdc-text-field-helper-line">
                <HelperText 
                    isPersistent={isPersistent}
                    invalid={invalid}>
                        {helpText}
                </HelperText>
            </div>
        );
    }

    renderCharacterCount(maxLength, withCounter){
        if(!(maxLength && withCounter)){
            return null
        }

        return (
            <div class="mdc-text-field-helper-line">
                <div class="mdc-text-field-character-counter">0 / {maxLength}</div>
            </div>
        )
    }

    renderPrefix(prefix){
        if(!prefix){
            return null
        }

        return <span class="mdc-text-field__affix mdc-text-field__affix--prefix">{prefix}</span>
    }

    renderSuffix(suffix){
        if(!suffix){
            return null
        }
        return <span class="mdc-text-field__affix mdc-text-field__affix--suffix">{suffix}</span>
    }

    render(){
        //fullWidth и FloatingLabel несовместимы
        const { helpText, isPersistent, invalid, maxLength, withCounter } = this.props;

        return( 
            <React.Fragment>
                <label className={ this.getClassNames() } ref={this.input}>
                    { this.renderField() }
                </label>
                { this.renderHelpText(helpText, isPersistent, invalid) }
                {this.renderCharacterCount(maxLength, withCounter)}
            </React.Fragment>
        );
    }
}