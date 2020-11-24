import React, { Component } from 'react';

import {MDCRadio} from '@material/radio';
import {MDCFormField} from '@material/form-field';

import './radio.scss';

export default class Radio extends Component {
    constructor(props){
        super(props);
        this.radio = React.createRef();
        // this.formField = React.createRef();
    }

    componentDidMount(){
        const radio = new MDCRadio(this.radio.current);
        // const formField = new MDCFormField(this.formField.current);
        // formField.input = radio;
    }

    getClassNames(){
        const {disabled} = this.props;

        return `mdc-radio ${disabled ? 'mdc-radio--disable' : ''}`;
    }

    render(){
        const {id = "radio-1", label, disabled, name="radios", checked, value} = this.props;

        return (
            // <div class="mdc-form-field" ref={this.formField}>
                <div class={this.getClassNames()} ref={this.radio}>
                    <input 
                        class="mdc-radio__native-control" 
                        type="radio" 
                        id={id} 
                        name={name} 
                        checked={checked} 
                        disabled={disabled}
                        value={value}
                    />
                    <div class="mdc-radio__background">
                        <div class="mdc-radio__outer-circle"></div>
                        <div class="mdc-radio__inner-circle"></div>
                    </div>
                    <div class="mdc-radio__ripple"></div>
                </div>
                // {label && <label for={id}>{label}</label>}
            // </div>
      );
    }
}