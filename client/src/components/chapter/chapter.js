import React, { Component } from 'react';

import Typography from '../typography';
import {Link} from 'react-router-dom';
//  TODO MDCRipple вынести в context, т.к. это доджен быть синглтон
import {MDCRipple} from '@material/ripple';

import './chapter.scss';

export default class Chapter extends Component {
    getClassNames (){
        const {isNew} = this.props;

        return `chapter${isNew ? ' chapter--new' : ''}`;
    };

    constructor(props){
        super(props);
        this.chapter = React.createRef();
    }

    componentDidMount(){
        console.log('current link', this.chapter.current);
        MDCRipple.attachTo(this.chapter.current);
    }

    render(){
        const {index, title, date, cover, href='#' } = this.props;

        return <Link to={href} className={this.getClassNames()} >
        {/* <span className="chapter"> */}
            {/* <img className="chapter__cover" src={cover} width="100" height="100" /> */}
            <div className="chapter__cover" style={{background: `url(${cover}) 50% 50% / cover`}}></div>
            <span className="chapter__col" ref={this.chapter}>
                <span className="chapter__index">
                    {index}
                </span>
                <span className="chapter__body">
                    <Typography use="headline6">{title}</Typography>
                    <Typography use="caption">{date}</Typography>
                </span>
            </span>
            <span className="chapter__indicator"></span>
        {/* </span> */}
        </Link>;
    }
}