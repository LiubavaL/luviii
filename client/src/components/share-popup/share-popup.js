import React, { Component } from 'react';

import {Dialog, DialogContent, DialogTitle} from '../dialog';
import TextField from '../text-field';
import SocialLink from '../social-link';
import Typography from '../typography';

import './share-popup.scss';

export default class SharePopup extends Component {
    render(){
        const {open, onClosed} = this.props,
            iconData = {
                icon: "file_copy", 
                tabIndex: 0, 
                onClick: () => {console.log('copy link to buffer clicked!')}
            };

        return (
            // <Dialog >
            <Dialog open={open} onClosed={onClosed} >
                <DialogTitle>
                    <Typography use="headline3">Share</Typography>
                </DialogTitle>
                <DialogContent>
                    <ul className="share__social-links">
                        <li className="share__social-link"><SocialLink type="vk" href=""/></li>
                        <li className="share__social-link"><SocialLink type="fb" href=""/></li>
                        <li className="share__social-link"><SocialLink type="twitter" href=""/></li>
                        <li className="share__social-link"><SocialLink type="tumblr" href=""/></li>
                        <li className="share__social-link"><SocialLink type="email" href=""/></li>                        
                    </ul>
                    <div className="share__link">
                        <TextField 
                            value="luviii.love/illustration/23sdfy"
                            trailingIcon={iconData}/>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}