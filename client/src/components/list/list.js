import React, { Component } from 'react';

import {MDCList} from '@material/list';
import {MDCRipple} from '@material/ripple';
import Icon from '../icon';

import './list.scss';


export class List extends Component {
    constructor(props){
        super(props);

        this.list = React.createRef();
    }

    componentDidMount(){
        const list = new MDCList(this.list.current);
        //the list will allow the user to use the Space or Enter keys to select or deselect a list item
        // list.singleSelection = true;
    }

    getClassNames(){
      const {twoLine, nonInteractive, dense, avatarList, className	} = this.props;

      return [className, `mdc-list 
              ${twoLine ? 'mdc-list--two-line' : '' } 
              ${nonInteractive ? 'mdc-list--non-interactive' : ''} 
              ${dense ? 'mdc-list--dense' : ''}
              ${avatarList ? 'mdc-list--avatar-list' : ''}`].filter(Boolean).join(' ');
    }

    render(){
        const {children, tag = "ul"} = this.props;
        const Tag = `${tag}`;

        return (
            <Tag className={this.getClassNames()} ref={this.list} role="listbox">
                {children}
            </Tag>
      );
    }
}

export const ListGroup = ({children}) => {
    return (<div className="mdc-list-group">{children}</div>);
}

export const ListGroupSubheader = ({children}) => {
    return (<h3 className="mdc-list-group__subheader">{children}</h3>);
}

export const ListDivider = ({inline, padded, inset}) => {
    const classNames = `mdc-list-divider ${padded ? 'mdc-list-divider--padded' : ''} ${inset ? 'mdc-list-divider--inset' : ''}`
    const separator = inline ? 
          <li role="separator" className={classNames}></li> :
          <hr className={classNames} />;

    return separator;
}

export const ListItemPrimaryText = ({children}) => {
  return <span className="mdc-list-item__primary-text">{children}</span>;
}

export const ListItemSecondaryText = ({children}) => {
  return <span className="mdc-list-item__secondary-text">{children}</span>;
}

export const ListItemText = ({children}) => {
  return <span className="mdc-list-item__text">{children}</span>;
}

export const ListItemGraphic = ({icon}) => {
  // const iconToRender = (typeof icon === "string") ? <i className="mdc-card__views-icon material-icons">{icon}</i> : icon; 

  return <span className="mdc-list-item__graphic"><Icon src={icon} /></span>;
}

export const ListItemMeta = ({children}) => {
  return <span className="mdc-list-item__meta">{children}</span>
}

export class ListItem extends Component {
  constructor(props){
    super(props);
    this.listItem = React.createRef();
  }

  componentDidMount(){
    if(this.props.withRipple){
      this.listItem = new MDCRipple(this.listItem.current);
    }
  }

  getClassNames(){
    const {selected, disabled, activated,accentuated, className} = this.props;

    return [className,
            `mdc-list-item 
            ${accentuated ? 'mdc-list-item--accentuated' : ''} 
            ${selected ? 'mdc-list-item--selected' : ''} 
            ${disabled ? 'mdc-list-item--disabled' : ''} 
            ${activated ? 'mdc-list-item--activated' : ''}`].filter(Boolean).join(' ');
  }

  render(){
    const {children, selected, onClick, ...rest} = this.props;

    return (
      // TODO сделать для первого элемента для фоткуса tabindex="0"
      <li 
        ref={this.listItem}
        className={this.getClassNames()}
        role="option" 
        aria-selected={selected} 
        tabIndex={selected ? 0 : undefined}
        {...rest}
        >
          <span class="mdc-list-item__ripple"></span>
          {children}
      </li>
    );
  }
}