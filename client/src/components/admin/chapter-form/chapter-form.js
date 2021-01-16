import React, { Component } from 'react'

import Button from '../../button'
import PagesForm from '../pages-form'
import ComicHeadForm from '../comic-head-form'

import './chapter-form.scss'

export default class ChapterForm extends Component {
    state = {
        title: this.props.title,
        description: this.props.description,
        cover: this.props.cover,
        newPages: this.props.newPages,
        pages: this.props.pages,
    }

    // onChange({target: {name, value}}){
    //     this.setState({
    //         [name]: value
    //     })
    // }

    // onCoverChange = cover => this.setState({cover})
    // onCoverChange = arhive => this.setState({newPages: arhive})

    render(){
        const {
            title,
            description,
            cover,
            newPages,
            pages
        } = this.state
        const {
            onChange,
            onCoverChange,
            onPageChange,
            onSave,
            onCancel
        } = this.props

        return <div className="chapter-form">
            <div className="chapter-form__comic-head-form">
                <ComicHeadForm 
                    title={title}
                    description={description}
                    cover={cover}
                    onChange={onChange}
                    onCoverChange={onCoverChange}
                />
            </div>
            <div className={`chapter-form__pages`}>
                <PagesForm 
                    file={newPages}
                    pages={pages}
                    onChange={onPageChange} 
                />
            </div>
            <div className="chapter-form__actions">
                <Button 
                    onClick={onSave}
                    outlined>
                    Сохранить
                </Button>
                <Button
                    onClick={onCancel}
                    >
                    Отмена
                </Button>
            </div>
        </div>
    }
}