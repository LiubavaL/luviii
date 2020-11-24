import React, { Component , Children} from 'react';

import {MDCTabBar} from '@material/tab-bar';

import TabScroller from '../tab-scroller';
import Tab from '../tab';

import './tab-bar.scss';

export default class TabBar extends Component {
    constructor(props){
        super(props);
        this.tabBar = React.createRef();
        this.mdcComponent = null;
        // this.state = {
        //     selectedId: props.defaultSelected ? props.defaultSelected : null
        // };
    }

    componentDidMount(){
        const {onActivate} = this.props;
        this.mdcComponent = new MDCTabBar(this.tabBar.current);
        if(typeof onActivate === 'function'){
            this.mdcComponent.listen("MDCTabBar:activated", onActivate)
        }
    }

    componentWillUnmount(){
        this.mdcComponent.destroy();
    }

    // onTabClick(id) {
    //     console.log('on tab click ', id);
    //     this.setState({
    //         selectedId: id
    //     });

    //     //onActivate - callback, который вызывается при смене активного таба
    //     this.props.onActivate(e);

    //     // document.getElementById(id).display = 'block'
    // }

    renderTabs(){
        const {children, tabs, fade, defaultSelected} = this.props;
        let extraProps = {};

        if(typeof fade !== "undefined"){
            extraProps.fade = !!fade;
        }

        if(children){
            return Children.map(children, (child, i) => {
                const active = i === defaultSelected - 1;
                return React.cloneElement(child, {...extraProps, active: active})
            })
        }

        if(tabs){
            return tabs.map((tab, i) => {
                const active = i === defaultSelected - 1;

                return <Tab 
                    key={i} 
                    contentId={i} 
                    active={active}
                    // onClick={(e) => this.onTabClick({...e, })} 
                    {...tab} 
                    {...extraProps} 
                />;
            })
        }

        return null;
    }

    render(){
        return (
            <div class="mdc-tab-bar" role="tablist" ref={this.tabBar}>
                <TabScroller>
                    {this.renderTabs()}
                    {/* {children} */}
                </TabScroller>
            </div>
        );
    }
}