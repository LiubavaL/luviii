import React, { Component } from 'react';

import {MDCTabIndicator} from '@material/tab-indicator';
import Icon from '../icon';

import './tab-indicator.scss';

export default class TabIndicator extends Component {
    constructor(props){
        super(props);
        this.tabIndicator = React.createRef();
    }

    componentDidMount(){
        new MDCTabIndicator(this.tabIndicator.current);
    }

    getClassNames(){
        const {active, fade} = this.props;

        return `mdc-tab-indicator
        ${active ? ' mdc-tab-indicator--active' : ''}
        ${fade ? ' mdc-tab-indicator--fade' : ''}`;
    }

    renderIcon(icon){
        return <Icon tag="span" className="mdc-tab-indicator__content mdc-tab-indicator__content--icon" aria-hidden="true" src={icon} />;
    }

    renderUnderline(){
        return <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>;
    }

    render(){
        const {icon} = this.props;

        return <span class={this.getClassNames()} ref={this.tabIndicator}>
            {!icon && this.renderUnderline()}
            {icon && this.renderIcon(icon)}
        </span>;
    }
}