import React, { Component } from 'react';

import {MDCFormField} from '@material/form-field';
import {MDCCheckbox} from '@material/checkbox';

import './checkbox.scss';

export default class Checkbox extends Component {
    constructor(props){
        super(props);
        this.input = React.createRef();
        // this.field = React.createRef();
    }

    componentDidMount(){
        const checkbox = new MDCCheckbox(this.input.current);
        // const formField = new MDCFormField(this.field.current);
        // formField.input = checkbox;
    }

    getCheckboxClassNames(){
        const {disabled, headerRow} = this.props;

        return `mdc-checkbox
            ${disabled ? ' mdc-checkbox--disabled' : ''}
            ${headerRow ? ' mdc-data-table__header-row-checkbox' : ''}
        `
    }

    renderCheckbox(){
        const {id = 'checkbox_1', label, ...rest} = this.props;

        return <>
            <div className={this.getCheckboxClassNames()} ref={this.input}>
                <input type="checkbox"
                    className="mdc-checkbox__native-control"
                    id={id} 
                    {...rest}
                />
                <div className="mdc-checkbox__background">
                    <svg className="mdc-checkbox__checkmark"
                        viewBox="0 0 24 24">
                        <path className="mdc-checkbox__checkmark-path"
                            fill="none"
                            d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                    </svg>
                    <div className="mdc-checkbox__mixedmark"></div>
                </div>
                <div className="mdc-checkbox__ripple"></div>
            </div>
            {label && <label for={id}>{label}</label>}
        </>
    }

    render(){
        // const {headerRow} = this.props;

        // if(headerRow){
        //     return this.renderCheckbox()
        // }

        return (
            <div className="mdc-form-field" ref={this.field}>
                {this.renderCheckbox()}
            </div>
      );
    }
}