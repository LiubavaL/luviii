import React, {Component} from 'react';

import {MDCRipple} from '@material/ripple';
import {MDCIconButtonToggle} from '@material/icon-button';
import Icon from '../icon';

import './icon-button.scss';

export default class IconButton extends Component {
    constructor(props){
        super(props);
        this.container = React.createRef();
        this.mdcIconButtonToggle = null;
        this.mdcIconButtonRipple = null;
    }

    componentDidMount (){
        const {withRipple, onIcon, isOn, onChange} = this.props;

        if(onIcon){
            this.mdcIconButtonToggle = new MDCIconButtonToggle(this.container.current);
            this.mdcIconButtonToggle.on = !!isOn;

            if(onChange){
                this.mdcIconButtonToggle.listen('MDCIconButtonToggle:change', (e) => onChange(e));
            }
        } else if(withRipple){
            this.mdcIconButtonRipple = new MDCRipple(this.container.current);
            this.mdcIconButtonRipple.unbounded = true; 
        }
    }

    componentWillUnmount(){
        if(this.mdcIconButtonToggle){
            this.mdcIconButtonToggle.destroy();
        }
        if(this.mdcIconButtonRipple){
            this.mdcIconButtonRipple.destroy();
        }
    }

    getClassNames(){
        const { size = "m" } = this.props;

        return `mdc-icon-button material-icons mdc-icon-button--size_${size}`;
    }

    render () {
        const {icon, tag = 'button', onIcon, className : extraClass, ...rest} = this.props,
            Tag = `${tag}`;

        return (
            <Tag 
                className={[this.getClassNames(), extraClass].filter(Boolean).join(' ')}
                aria-label="Add to favorites"
                data-aria-label-on="Remove from favorites"
                data-aria-label-off="Add to favorites"
                aria-pressed="true"
                ref={this.container}
                {...rest}
            >
               <Icon src={icon} className="mdc-icon-button__icon"/>
               {onIcon && <Icon src={onIcon} className='mdc-icon-button__icon mdc-icon-button__icon--on' />}
            </Tag>
        );
    }
}