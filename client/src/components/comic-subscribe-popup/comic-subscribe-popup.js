import React, { Component } from 'react';

import {Dialog, DialogContent} from '../dialog';
import Typography from '../typography';
import TabBar from '../tab-bar';
import TextField from '../text-field';
import Link from '../link';
import Button from '../button'


import './comic-subscribe-popup.scss';

export default class ComicSubscribePopup extends Component {
    defaultSelectedTab = 1;

    onActivate(index){
        const tabContents = document.getElementsByClassName('comic-subscribe__tab-content');

        for(let i = 0; i < tabContents.length; i++){
            tabContents[i].style.display = "none";
        }

        document.getElementById(`subscribe-${index + 1}`).style.display = "";
    }

    componentDidMount(){
        this.onActivate(this.defaultSelectedTab - 1);
    }

    render(){
        const {open, onClosed} = this.props;

        return (
            <Dialog 
                    open={open} 
                    onClosed={onClosed}
                >
                <DialogContent>
                    <div className="comic-subscribe">
                        <div className="comic-subscribe__col">
                            <div className="comic-subscribe__title">
                                <Typography use="headline3">Don’t miss the updates!</Typography>
                            </div>
                            <div className="comic-subscribe__text">
                                <Typography className="mdc-typography--subscribe-brief">Be notified of new chapters as well as other news about the comic!</Typography>
                            </div>
                        </div>
                        <div className="comic-subscribe__col">
                            <TabBar 
                                tabs={[
                                    {label: 'By Email'},
                                    {label: 'Via Telegram' }
                                ]} 
                                defaultSelected={this.defaultSelectedTab}
                                onActivate={(e) => this.onActivate(e.detail.index)}
                            />
                            <div id="subscribe-1" className="comic-subscribe__tab-content">
                                <div className="comic-subscribe__caption">
                                    <Typography use="caption">Enter your mailing address to wish you’ll be notified:</Typography>
                                </div>
                                <form className="comic-subscribe__form">
                                    <TextField placeholder="example@mail.com"/>
                                    <div className="comic-subscribe__btn">
                                        <Button raised fullWidth>Subscribe</Button>
                                    </div>
                                </form>
                            </div>
                            <div id="subscribe-2" className="comic-subscribe__tab-content">
                                <div className="comic-subscribe__caption">
                                    <Typography use="caption">If you are a Telegram user, you can subscribe via special bot. To do so, you’ll need to go to the application via the link below.</Typography>
                                </div>
                                <div className="comic-subscribe__btn">
                                    <Button raised>Subscribe via Telegram Bot</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}