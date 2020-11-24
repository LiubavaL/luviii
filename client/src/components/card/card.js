import React, {Component} from 'react';

import Button from '../button';
import Illustration from '../illustration';
import Carousel from 'react-bootstrap/Carousel'; 
import Typography from '../typography';
import IconButton from '../icon-button';
import Link from '../link';

import {MDCRipple} from '@material/ripple';


import './card.scss';
import '../carousel/carousel.scss';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.illustration = React.createRef();
    }

    componentDidMount(){
        MDCRipple.attachTo(this.illustration.current);
    }

    renderCarousel(imgs){
        const carouselItems = imgs.map((imgItem) => {
            return (
                <Carousel.Item>
                    <Illustration 
                        src={imgItem} 
                        fixedHeight  
                        onClick={this.props.onClick}
                    />
                </Carousel.Item>
            );
        }),
        carousel = <Carousel 
                        prevLabel="" 
                        nextLabel="" 
                        interval={null}>
                            {carouselItems}
                    </Carousel>;

       return carousel;
    }

    handleImgLoadError = () => {
        const {onGridItemLoad, onImgError} = this.props;

        if(onImgError){
             onImgError();
        }
        if(onGridItemLoad){
            onGridItemLoad();
        }
    }

    render() {
        const {
            title,
            text,
            imgs, 
            views,
            date,
            onClick,
            onShareClick,
            onGridItemLoad
        } = this.props;
        let renderedImages = null
        
        if(Array.isArray(imgs)) {
            if(imgs.length === 1){
                renderedImages = <Illustration 
                    src={imgs} 
                    onClick={onClick} 
                    onLoad={onGridItemLoad} 
                    onError={this.handleImgLoadError}
                    tabIndex="0"
                />
            } else if(imgs.length > 1){
                renderedImages = this.renderCarousel(imgs)
                if(onGridItemLoad){
                    onGridItemLoad()
                }
            }
        } else {
            if(onGridItemLoad){
                onGridItemLoad()
            }
        }

        const textToRender = text ? 
            <div className="mdc-card__text">
                <Typography use="body1">{text}</Typography>
                <div className="mdc-card__link">
                    {/* <Link href="#" type="action" accentuated>Read All</Link> */}
                    <Button label="Read All" onClick={onClick} outlined withRipple/>
                </div>
            </div> : null
        const titleToRender = title ? 
            <div className="mdc-card__title">
                <Typography use="headline4">{title}</Typography>
            </div> : null

        return (
            <div className="mdc-card">
                <div className="mdc-card__illustration" ref={this.illustration}>
                    {renderedImages}
                </div>
                {/* <div className="mdc-card__media mdc-card__media--16-9" style={backgroundImage}></div> */}
                <div className="mdc-card__description">
                    {titleToRender}
                    <div className="mdc-card__meta">
                        <div className="mdc-card__date">
                            <Typography use="subtitle2">{date}</Typography>
                        </div>
                        <div className="mdc-card__views">
                            <Typography use="subtitle2">
                                {views} 
                                <i className="mdc-card__views-icon material-icons">visibility</i>
                            </Typography>
                        </div>
                        <div className="mdc-card__button">
                            <IconButton icon="share" onClick={onShareClick}/>
                            {/* <Button label="Share" onClick={onShareClick}/> */}
                        </div>
                    </div>
                    {textToRender}
                </div>
            </div>
        )
    }
}