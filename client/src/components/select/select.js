import React, { Component } from 'react';

import {MDCSelect} from '@material/select';
import Icon from '../icon';

import {List, ListItem, ListGroupSubheader, ListDivider, ListGroup} from '../list';

import './select.scss';

export default class Select extends Component {
    constructor(props){
        super(props);
        this.select = React.createRef();
        this.mdcComponent = null;
    }

    componentDidMount(){
        const {onChange} = this.props;

        this.mdcComponent = new MDCSelect(this.select.current);

        console.log('select componentDidMount this.mdcComponent ', this.mdcComponent );

        if(onChange){
            this.mdcComponent.listen('MDCSelect:change', () => {
                console.log('select change  ', this.mdcComponent.selectedIndex, this.mdcComponent.value);

                onChange({selectedIndex: this.mdcComponent.selectedIndex, value: this.mdcComponent.value});
            });
        }
    }

    componentDidUpdate(prevProps){
        console.log('select componentDidUpdate', prevProps.defaultValue, this.props.defaultValue)

        if(this.props.defaultValue != prevProps.defaultValue){
            const selectedIndex = Object.keys(this.props.options).indexOf(this.props.defaultValue )

            if( this.mdcComponent.selectedIndex !== selectedIndex){
                console.log('select mdcComponent', this.mdcComponent)
                console.log('select mdcComponent value', this.mdcComponent.value)
                // console.log('select mdcComponent Object.keys(this.props.options', Object.keys(this.props.options).findIndex(this.props.defaultValue ))
                // this.mdcComponent.selectedIndex = Object.keys(this.props.options)
                this.mdcComponent.selectedIndex = selectedIndex
            }
        }
    }

    componentWillUnmount(){
        this.mdcComponent.destroy();
    }

    createSelectOptions(options){
        /* formatted array
            options = [
                {
                    label: "",
                    value: 1
                },
                {
                    label: "",
                    options: [
                        {
                            label: "",
                            value: 2
                        },
                        {
                            label: "",
                            value: 2
                        }
                    ]
                },
                {
                    label: "",
                    value: 1,
                    aria-disabled: true,
                    tabIndex: -1
                }
            ]
        */

       if(Array.isArray(options) && options[0] && typeof options[0] === 'object'){
            return options.map((option) => {
                if(typeof option !== 'object'){
                    throw new Error(`Encountered non object for Select ${option}`);
                }
                //учитываем 2 уровня
                return {...option, options: this.createSelectOptions(option.options)};
                // return option;
            });
       }

        // simple array ['Cookies', 'Pizza', 'Icecream']
        if(Array.isArray(options)){
            return options.map((option, i) => {
                return {value: i, label: option};
            });
        }

        /* object map 
            options = {
                '1': 'Cookie',
                '2': 'Pineapple',
                '3': 'Orange' 
            }
        */

        if(typeof options === 'object'){
            return Object.keys(options).map((key) => {
                return {
                    value: key,
                    label: options[key]
                };
            });
        }

        return options;
    }

    renderOption({value, label, options,  ...rest}){
        return <ListItem data-value={value} disabled={!!options}  role='option' {...rest}>{label}</ListItem>;
    }

    renderOptions(options, defaultValue, placeholder = null){
        /*
            добавляем пустую опцию в случаях:
            1)когда задан placeholder
            2)когда не задано значение по умолчанию defaultValue
            3)TODO задано несущесвтующее
        */
        const hasEmptyOption = typeof defaultValue === "undefined" || !!placeholder;

        //option {label: 'Label', value: 1, aria-disabled': true, tabIndex: -1}'
     
        const renderedOptions = options.map(({options:subOptions, ...option}, index) => {
            
            let renderedOption = [];

            //в 1 итерацию доабвляме пустую опцию, если она должна быть
            if(hasEmptyOption && !index){
                renderedOption.push(
                    this.renderOption({
                        value: "", 
                        label: placeholder ? placeholder : '',
                        selected: true,
                        disabled: true
                    })
                );
            }

            //если есть 2 уровень
            if(subOptions){
                renderedOption.push(
                    <ListGroup>
                        <ListGroupSubheader>{option.label}</ListGroupSubheader>
                        <List>
                            {subOptions.map((subOption) => {
                                const isSelected = subOption.value == defaultValue && !hasEmptyOption;
                                return this.renderOption({...subOption, selected: isSelected, key: subOption.value});
                            })}
                        </List>
                        
                        {index < options.length -1 && <ListDivider />}
                    </ListGroup>
                );
            } else {
                const isSelected = option.value == defaultValue
                // const isSelected = option.value == defaultValue && !hasEmptyOption;

                renderedOption.push(
                    this.renderOption({...option, selected: isSelected, key: option.value})
                );
            }

            return renderedOption;
        });

        return renderedOptions;
    }

    getClassNames(){
        const {disabled, label, outlined, icon, simple, theme} = this.props;

        return `mdc-select
            ${simple ? ' mdc-select--simple' : ''}
            ${theme ? ` mdc-select--theme_${theme}` : ''}
            ${disabled ? ' mdc-select--disabled' : ''}
            ${label ? '' : ' mdc-select--no-label'}
            ${outlined ? ' mdc-select--outlined' : ''}
            ${icon ? ' mdc-select--with-leading-icon' : ''}`
    }

    getStyleVariant(){
        const {outlined, simple, label} = this.props;
        let styleElements = null;

        if(outlined){
            styleElements = <div className="mdc-notched-outline">
                <div className="mdc-notched-outline__leading"></div>
                {label && 
                    <div className="mdc-notched-outline__notch">
                        <span id="outlined-select-label" className="mdc-floating-label">{label}</span>
                    </div>
                }
                <div className="mdc-notched-outline__trailing"></div>
            </div>
        } else {
            styleElements = <React.Fragment>
                {label && <span className="mdc-floating-label">{label}</span>}
                {!simple && <div className="mdc-line-ripple"></div>}
            </React.Fragment>;
        }

        return styleElements;
    }
    
    render(){
        const {options, defaultValue, placeholder = null, icon} = this.props,
            preparedOptions = this.createSelectOptions(options);

        return (
            <div className={this.getClassNames()} ref={this.select} role="listbox">
                <div className="mdc-select__anchor">
                    {icon && <Icon src={icon} className="mdc-select__icon"/>}
                    <i className="mdc-select__dropdown-icon"></i>
                    <div className="mdc-select__selected-text" role="button" aria-haspopup="listbox"></div>
                    {this.getStyleVariant()}
                </div>
                <div className="mdc-select__menu mdc-menu mdc-menu-surface">
                    <List>
                        {this.renderOptions(preparedOptions, defaultValue, placeholder)}
                    </List>
                </div>
            </div>
        );
    }
}