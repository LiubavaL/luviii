import React, { Component } from 'react'

import ImageField from '../image-field'
import TextField from '../../text-field'

import './comic-head-form.scss'

export default class ComicHeadForm extends Component {
    render(){
        const {title, cover, description, onChange, onCoverChange} = this.props

        return  <div className="comic-head-form">
            <div className="comic-head-form__image-field">
                <ImageField 
                    initialValue={cover}
                    onChange={onCoverChange}
                />
            </div>
            <div className="comic-head-form__headlines">
                <TextField 
                    value={title}
                    label="Название главы"
                    onChange={onChange}
                    name="title"
                    outlined
                />
                <TextField 
                    value={description}
                    label="Описание главы"
                    onChange={onChange}
                    rows={3}
                    name="description"
                    textarea
                />
            </div>
        </div>
    }
}