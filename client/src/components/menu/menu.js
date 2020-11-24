import React, { Component } from 'react';
import {MDCMenu} from '@material/menu';
import {List, ListItem} from '../list';
import MenuSurface from '../menu-surface';

import './menu.scss';

export class Menu extends Component {
    constructor(props){
        super(props);

        this.menu = React.createRef();
        this.mdcMenu = null;
    }

    componentDidMount(){
        const {open, onSelect, onOpen, onClose} = this.props;

        this.mdcMenu = new MDCMenu(this.menu.current);
        this.mdcMenu.open = !!open;

        if(onSelect){
            this.mdcMenu.listen('MDCMenu:selected', (e) => {
                onSelect(e);
            });
        }

        if(onClose){
            this.mdcMenu.menuSurface_.listen('MDCMenuSurface:closed', (e) => {
                onClose(e);
            })
        }

        if(onOpen){
            this.mdcMenu.menuSurface_.listen('MDCMenuSurface:opened', (e) => {
                onOpen(e);
            })
        }

        console.log(this.mdcMenu);
    }

    componentDidUpdate(prevProp){
        const {open} = this.props;

        if(prevProp.open != open){
            this.mdcMenu.open = open;
        }
    }

    getInner() {
        const {children, list, open} = this.props;

        return <List 
            role="menu" 
            aria-hidden={!open} 
            aria-orientation="vertical" 
            tabindex="-1"
        >
            {children ? children : list}
        </List>;
    }

    getClassNames(){
        const {className, fixed} = this.props;

        return [
            fixed ? "mdc-menu-surface--fixed" : false,
            "mdc-menu mdc-menu-surface", 
            className
        ].filter(Boolean).join(' ');
    }

    render () {
        return (
            <div class={this.getClassNames()} ref={this.menu}>
                {this.getInner()}
            </div>
        )
    }
}

export const MenuItem = (props) =>  {
    return (
        <ListItem role="menuitem" tabIndex={0} {...props} />
    );
}