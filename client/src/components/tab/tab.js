import React, { Component } from 'react';

import {MDCTab} from '@material/tab';
import Icon from '../icon';
import TabIndicator from '../tab-indicator/tab-indicator';

import './tab.scss';

export default class Tab extends Component {
    constructor(props){
        super(props);
        this.tab = React.createRef();
    }

    componentDidMount(){
        const mdcTab = new MDCTab(this.tab.current);
    }

    getClassNames(){
        const {active, stacked} = this.props;

        return `mdc-tab
            ${active ? 'mdc-tab--active' : ''}
            ${stacked ? 'mdc-tab--stacked' : ''}`;
    }

    renderIndicator(){
        const {indicatorIcon, fade, active} = this.props;
        return <TabIndicator active={active} fade={fade} icon={indicatorIcon}/>
    }

    renderLabel(label){
        return <span class="mdc-tab__text-label">{label}</span>;
    }

    render(){
        const {spanContent, icon, label, active, children} = this.props;

        if(children){
            label = children;
        }

        return (
            <button 
                class={this.getClassNames()} 
                role="tab" 
                aria-selected={active} 
                tabindex={active ? 0 : -1} 
                ref={this.tab}
                // onClick={onClick}
            >
                <span class="mdc-tab__content">
                    {icon && <Icon tag="span" className="mdc-tab__icon" src={icon} />}
                    {label && this.renderLabel(label)}
                    {spanContent && this.renderIndicator()}
                </span>
                {!spanContent && this.renderIndicator()}
                <span class="mdc-tab__ripple"></span>
            </button>
        );
    }
}