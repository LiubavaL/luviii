import React, { Component } from 'react'

import Typography from '../../typography'
import Link from '../../link'

import './pages-form.scss'

export default class PagesForm extends Component {
    // state = {
    //     file: 
    // }

    renderPages(pages){
        const pagesList = pages.map(
            src => <li className="pages-form__item">
                        <img src={src} className="pages-form__image" />
                    </li>
        )

        return <ul className="pages-form__list">{pagesList}</ul>
    }

    renderFilename(file){
        return <div className="pages-form__filename">
            <Typography>{file.name}</Typography>
        </div>
    }

    onChange = (e) => {
        this.props.onChange(e.target.files[0])
    }

    render(){
        const {
            pages,
            file
        } = this.props
        
        const hasPages = Array.isArray(pages)
        const actionLabel = (hasPages || file) ? 'Заменить' : 'Добавить'
        
        return (
            <div className={`pages-form${hasPages ? ' pages-form--with-pages' : ''}`}>
                <div className="pages-form__typography">
                    <Typography use="overline">Страницы:</Typography>
                </div>
                {hasPages && this.renderPages(pages)}
                {file && this.renderFilename(file)}
                <label className="pages-form__input">
                    <input 
                        type="file" 
                        accept="application/zip" 
                        onChange={this.onChange}
                    />
                    {actionLabel}
                </label>
                {/* <Link type="action">{actionLabel}</Link> */}
            </div>
        )
    }
}