import React, { Component } from 'react';

import {MDCSelect} from '@material/select';
import Icon from '../icon';
import {List, ListItem, ListItemText, ListGroupSubheader, ListDivider, ListGroup} from '../list';

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

        if(onChange){
            this.mdcComponent.listen('MDCSelect:change', (e) => {
                console.log(`Selected option at index ${this.mdcComponent.selectedIndex} with value "${this.mdcComponent.value}"`);

                onChange(e);
            });
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.defaultValue != prevProps.defaultValue){
            const selectedIndex = Object.keys(this.props.options).indexOf(this.props.defaultValue )

            if( this.mdcComponent.selectedIndex !== selectedIndex){
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
        return <ListItem 
            data-value={value} 
            disabled={!!options}
            role='option'
            {...rest}>
                <ListItemText>{label}</ListItemText>
            </ListItem>;
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
                                return this.renderOption({...subOption, selected: isSelected, key: subOption.value, value: subOption.label});
                            })}
                        </List>
                        
                        {index < options.length -1 && <ListDivider />}
                    </ListGroup>
                );
            } else {
                const isSelected = option.value == defaultValue
                renderedOption.push(
                    this.renderOption({
                        ...option, 
                        selected: isSelected, 
                        key: option.value, 
                        value: option.label
                    })
                );
            }

            return renderedOption;
        });

        return renderedOptions;
    }

    getClassNames(){
        const {disabled, invalid, label, outlined, icon, simple, theme, className} = this.props;

        return `mdc-select ${className}
            ${simple ? ' mdc-select--simple' : ''}
            ${theme ? ` mdc-select--theme_${theme}` : ''}
            ${disabled ? ' mdc-select--disabled' : ''}
            ${invalid ? ' mdc-select--invalid' : ''}
            ${label ? '' : ' mdc-select--no-label'}
            ${outlined ? ' mdc-select--outlined' : '  mdc-select--filled'}
            ${icon ? ' mdc-select--with-leading-icon' : ''}`
    }

    getStyleVariant(){
        const {outlined, label} = this.props

        if(outlined){
            return (
                <div className="mdc-notched-outline">
                    <div className="mdc-notched-outline__leading"></div>
                    {label && 
                        <div className="mdc-notched-outline__notch">
                            <span id="outlined-select-label" className="mdc-floating-label">{label}</span>
                        </div>
                    }
                    <div className="mdc-notched-outline__trailing"></div>
                </div>
            )
        } 

        return (
            <>
                <span class="mdc-select__ripple"></span>
                {label && <span className="mdc-floating-label">{label}</span>}
            </>
        )
    }
    
    render(){
        const {options, defaultValue, placeholder = null, icon, simple, outlined} = this.props,
            preparedOptions = this.createSelectOptions(options);

        return (
            <div className={this.getClassNames()} ref={this.select} role="listbox">
                {/* <input type="hidden" name="demo-input" /> */}
                <div className="mdc-select__anchor"  role="button" aria-haspopup="listbox" tabindex="0">
                    {icon && <Icon src={icon} className="mdc-select__icon"/>}
                    {this.getStyleVariant()}
                    <span class="mdc-select__selected-text-container">
                        <span class="mdc-select__selected-text"></span>
                    </span>
                    <span class="mdc-select__dropdown-icon">
                        <svg
                            class="mdc-select__dropdown-icon-graphic"
                            viewBox="7 10 10 5">
                            <polygon
                                class="mdc-select__dropdown-icon-inactive"
                                stroke="none"
                                fill-rule="evenodd"
                                points="7 10 12 15 17 10">
                            </polygon>
                            <polygon
                                class="mdc-select__dropdown-icon-active"
                                stroke="none"
                                fill-rule="evenodd"
                                points="7 15 12 10 17 15">
                            </polygon>
                        </svg>
                    </span>
                    {!simple && !outlined && <div className="mdc-line-ripple"></div>}
                </div>
                <div className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth" role="listbox">
                    <List>
                        {this.renderOptions(preparedOptions, defaultValue, placeholder)}
                    </List>
                </div>
            </div>
        );
    }


        // <div class="mdc-select mdc-select--outlined mdc-select--no-label mdc-data-table__pagination-rows-per-page-select">
        //                     <div class="mdc-select__anchor" role="button" aria-haspopup="listbox" aria-labelledby="demo-pagination-select" tabindex="0">
        //                         <span class="mdc-select__selected-text-container">
        //                             <span id="demo-pagination-select" class="mdc-select__selected-text">10</span>
        //                         </span>
        //                         <span class="mdc-select__dropdown-icon">
        //                             <svg
        //                                 class="mdc-select__dropdown-icon-graphic"
        //                                 viewBox="7 10 10 5">
        //                                 <polygon
        //                                     class="mdc-select__dropdown-icon-inactive"
        //                                     stroke="none"
        //                                     fill-rule="evenodd"
        //                                     points="7 10 12 15 17 10">
        //                                 </polygon>
        //                                 <polygon
        //                                     class="mdc-select__dropdown-icon-active"
        //                                     stroke="none"
        //                                     fill-rule="evenodd"
        //                                     points="7 15 12 10 17 15">
        //                                 </polygon>
        //                             </svg>
        //                         </span>
        //                         <span class="mdc-notched-outline mdc-notched-outline--notched">
        //                             <span class="mdc-notched-outline__leading"></span>
        //                             <span class="mdc-notched-outline__trailing"></span>
        //                         </span>
        //                     </div>

        //                     <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth" role="listbox">
        //                         <ul class="mdc-list">
        //                             <li class="mdc-list-item mdc-list-item--selected" aria-selected="true" role="option" data-value="10">
        //                                 <span class="mdc-list-item__text">10</span>
        //                             </li>
        //                             <li class="mdc-list-item" role="option" data-value="25">
        //                                 <span class="mdc-list-item__text">25</span>
        //                             </li>
        //                             <li class="mdc-list-item" role="option" data-value="100">
        //                                 <span class="mdc-list-item__text">100</span>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
}