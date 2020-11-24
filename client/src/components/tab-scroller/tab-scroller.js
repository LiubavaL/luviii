import React, { Component } from 'react';

import {MDCTabScroller} from '@material/tab-scroller';

import './tab-scroller.scss';

export default class TabScroller extends Component {
    constructor(props){
        super(props);
        this.tabScroller = React.createRef();
    }

    componentDidMount(){
        new MDCTabScroller(this.tabScroller.current);
    }

    render(){
        const {children} = this.props;

        return (
            <div class="mdc-tab-scroller" ref={this.tabScroller}>
                <div class="mdc-tab-scroller__scroll-area">
                    <div class="mdc-tab-scroller__scroll-content">{children}</div>
                </div>
            </div>
        );
    }
}