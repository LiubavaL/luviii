import React, { Component } from 'react';

import {MDCDialog} from '@material/dialog';
import Button from '../button';
import IconButton from '../icon-button';

import './dialog.scss';

export class Dialog extends Component {
    mdcComponent = null;

    constructor(props){
        super(props);
        this.dialogRoot = React.createRef();
    }

    componentDidMount(){
        const {onClosed} = this.props;

        this.mdcComponent = new MDCDialog(this.dialogRoot.current);
        this.mdcComponent.listen('MDCDialog:closed', onClosed);
        this.sync();
    }

    componentDidUpdate(prevProps){
        //эту проверку можно убрать
        if(this.props.open != prevProps.open){
            this.sync();
        }
    }

    componentWillUnmount(){
        this.mdcComponent.destroy();
    }

    sync = () => {
        if(this.props.open){
            this.mdcComponent.open();
        } else {
            this.mdcComponent.close();
        }
    }

    renderCloseIcon(){
        const {noClose} = this.props;

        const renderedCloseIcon = noClose ? null : 
            <div className="mdc-dialog__close">
                <IconButton 
                    className="mdc-icon-button--dialog-close"
                    icon="close" 
                    data-mdc-dialog-action='close' 
                    withRipple
                    size="l"
                />
            </div>;

        return renderedCloseIcon;
    }

    render(){
        const {children, rootChildren, className, fullWidth } = this.props;

        return(
            <DialogRoot childRef={this.dialogRoot} className={className} fullWidth={fullWidth}>
                {rootChildren}
                <div className="mdc-dialog__container">
                    <div className="mdc-dialog__surface"
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="my-dialog-title"
                        aria-describedby="my-dialog-content">
                            {this.renderCloseIcon()}
                        {/* <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>Dialog body goes here.</DialogContent>
                        <DialogActions>
                            <DialogButton label="Prev"/>
                            <DialogButton label="Next"/>
                        </DialogActions> */}
                        {children}
                    </div>
                </div>
                <DialogScrim/>
            </DialogRoot>
        );
    }
}


export const DialogRoot = ({className : extraClasses, children, childRef, fullWidth}) => {
    const getClassNames = () => {
        const generalClasses = `mdc-dialog
            ${fullWidth ? ' mdc-dialog--fullWidth' : ''}`;

        return [generalClasses, extraClasses].filter(Boolean).join(' ');
    };

    return <div className={getClassNames()} ref={childRef}>{children}</div>;
}

export const DialogTitle = ({children}) => {
    return (
        <div className="mdc-dialog__title">{children}</div>
    );
}

export const DialogContent = ({children}) => {
    return (
        <div className="mdc-dialog__content">{children}</div>
    );
}

export const DialogScrim = ({disableInteraction}) => {
    const style = disableInteraction ? {pointerEvents: 'none'} : {};

    return <div className="mdc-dialog__scrim" style={style}></div>;
}

export const DialogActions = ({children}) => {
    return <footer className="mdc-dialog__actions">{children}</footer>;
}

export const DialogButton = ({action = '', ...rest}) => {
    return (
        <div className="mdc-dialog__button">
            <Button data-mdc-dialog-action={action} {...rest}/>
        </div>
    );
}
