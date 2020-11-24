import React, { Component } from 'react';

import {Dialog, DialogContent} from '../dialog';
import SocialLink from '../social-link';
import Typography from '../typography';
import Separator from '../separator';

import './auth-popup.scss';
import TextField from '../text-field';
import Button from '../button';

export default class AuthPopup extends Component {
    render(){
        const {open, onClosed} = this.props;

        return (
            <Dialog 
                open={open} 
                onClosed={onClosed}
            >
                    <div className="auth-popup">
                        <div className="auth-popup__headline">
                        <DialogContent>
                            <Typography use="headline2" theme="light">Sign Up</Typography>
                            <Typography use="headline4" theme="light">to leave a comment!</Typography>
                        </DialogContent>

                        </div>
                        <div className="auth-popup__body">
                            <DialogContent>
                                <Typography use="headline3">Using social platforms</Typography>
                                <ul className="auth-popup__social-list">
                                    <li className="auth-popup__social-item">
                                        <SocialLink type="fb" href="#"/>
                                    </li>
                                    <li className="auth-popup__social-item">
                                        <SocialLink type="vk" href="#"/>
                                    </li>
                                    <li className="auth-popup__social-item">
                                        <SocialLink type="twitter" href="#"/>
                                    </li>
                                    <li className="auth-popup__social-item">
                                        <SocialLink type="gplus" href="#"/>
                                    </li>
                                </ul>
                               <div className="auth-popup__separator">
                                    <Separator label="or"/>
                               </div>
                               <div className="auth-popup__title">
                                    <Typography use="headline3">As a guest</Typography>
                               </div>
                               <div className="auth-popup__textfield">
                                    <TextField placeholder="Name"/>
                               </div>
                               <div className="auth-popup__textfield">
                                    <TextField 
                                        placeholder="Email" 
                                        helpText="Address never made public" 
                                        isPersistent
                                    />
                               </div>
                               <div className="auth-popup__btn">
                                    <Button raised>Sign Up</Button>
                               </div>
                            </DialogContent>
                        </div>
                    </div>
            </Dialog>
        );
    }
}