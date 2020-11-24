import React, { Component } from 'react';

import {MDCDrawer} from "@material/drawer";

import './drawer.scss';

export class Drawer extends Component {
    mdcComponent = null;

    componentDidMount(){
        const {onClosed, isModal, isDismissable, open} = this.props;

        if(isModal || isDismissable) {
            this.mdcComponent = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
            if(typeof onClosed === 'function'){
                this.mdcComponent.listen('MDCDrawer:closed', onClosed);
            }
            this.mdcComponent.open = !!open;
        }
    }

    componentDidUpdate(){
        const {isModal, isDismissable, open } = this.props;

        if(isModal || isDismissable && this.mdcComponent.open != open) {
            this.mdcComponent.open = open;
        }
    }

    getClassNames(){
        const {isModal, isDismissable} = this.props

        return `mdc-drawer 
        ${isModal ? 'mdc-drawer--modal' : ''}
        ${isDismissable ? 'mdc-drawer--dismissible' : ''}
        `
    }

    render() {
        const {children, isModal} = this.props;

        return (
            <>
                <aside className={this.getClassNames()}>
                    {children}
                </aside>
    
                {isModal && <div className="mdc-drawer-scrim"></div>}
            </>
        );
    }
}
export const DrawerHeader = ({children}) => {
    return <div className="mdc-drawer__header">{children}</div>
} 

export const DrawerTitle = ({title}) => {
    return <h3 className="mdc-drawer__title">{title}</h3>
}

export const DrawerSubtitle = ({subtitle}) => {
    return <h6 className="mdc-drawer__subtitle">{subtitle}</h6>
}

export const DrawerContent = ({children}) => {
    return <div className="mdc-drawer__content">{children}</div>
}

export const DrawerAppContent = ({children}) => {
    return <div className="mdc-drawer-app-content">{children}</div>
}