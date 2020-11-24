import React, { Component } from 'react';

import {Dialog, DialogContent, DialogTitle} from '../dialog';
import Select from '../select';
import TextField from '../text-field';
import Typography from '../typography';
import Button from '../button';

import './contact-popup.scss';

export default class ContactPopup extends Component {
    render(){
        const {open, onClose} = this.props;

        return (
            <Dialog className="mdc-dialog--type_contact" open={open} onClose={onClose} fullWidth> 
                <DialogTitle>
                    <Typography use="headline3" centered>Contact Me</Typography>
                </DialogTitle>
                <DialogContent>
                    <form className="contact">
                        <Select 
                            label="Select a topic"
                            options={['Art usage', 'Commission', 'Comic', 'Other']}
                            onChange={() => {}} 
                        />
                        <div className="contact__textarea">
                            <TextField placeholder="What do you need help with?" fullWidth textarea rows={7}/>
                        </div>
                        <div className="contact__attachment">
                            <Button icon="attach_file" type="button">Attach file...</Button>
                        </div>
                        <div className="contact__btn">
                            <Button raised fullWidth>Send</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }
}