import React, { Component } from 'react';

import {MDCMenuSurface, Corner} from '@material/menu-surface';

import './menu-surface.scss';

/** A generic menu component for displaying any type of content. */
export default class MenuSurface extends Component {

    ANCHOR_CORNER_MAP = {
        bottomEnd: 'BOTTOM_END',
        bottomLeft: 'BOTTOM_LEFT',
        bottomRight: 'BOTTOM_RIGHT',
        bottomStart: 'BOTTOM_START',
        topEnd: 'TOP_END',
        topLeft: 'TOP_LEFT',
        topRight: 'TOP_RIGHT',
        topStart: 'TOP_START'
      };

    constructor(props){
        super(props);
        this.menuSurface = React.createRef();
        this.mdcComponent = null;
    }

    componentDidMount(){
        const {onClose, onOpen, anchorElement, anchorCorner, open} = this.props;
        this.mdcComponent = new MDCMenuSurface(this.menuSurface.current);
        
        if(anchorElement){
            this.mdcComponent.anchorElement = anchorElement;
        }
        
        if(anchorCorner){
            this.mdcComponent.setAnchorCorner(Corner[this.ANCHOR_CORNER_MAP[anchorCorner]]);
        }

        if(onClose){
            this.mdcComponent.listen('MDCMenuSurface:closed', (e) => onClose(e))
        }

        if(onOpen){
            this.mdcComponent.listen('MDCMenuSurface:opened', (e) => onOpen(e))
        }

        if(open){
            this.mdcComponent.open();
        }
    }

    componentDidUpdate(prevProps){
        const {open} = this.props;

        if(open != prevProps.open){
            if(open){
                this.mdcComponent.open();
            } else {
                this.mdcComponent.close();
            }
        }
    }

    getClassNames(){
        const {fixed, fullWidth} = this.props;

        return `mdc-menu-surface
            ${fullWidth ? ' mdc-menu-surface--fullWidth' : ''}
            ${fixed ? ' mdc-menu-surface--fixed' : ''}`;
    }

    render(){
        const {children} = this.props;

        return (
            <div className={this.getClassNames()} ref={this.menuSurface}>
                {children}
            </div>
        );
    }
}