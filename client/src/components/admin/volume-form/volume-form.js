import React, { Component } from 'react'

import ComicHeadForm from '../comic-head-form'
import Typography from '../../typography'
import ChapterItem from '../../admin/chapter-item'
import Button from '../../button'
import ChapterForm from '../chapter-form/chapter-form'

import './volume-form.scss'

export default class VolumeForm extends Component {
    state = {
        chapterFormOpened: !!this.props.initialChapterFormOpened
    }

    onAddChapterClick = () => {
        this.setState({
            chapterFormOpened: true
        })
    }

    onAddChapterCancel = () => {
        this.setState({
            chapterFormOpened: false
        })
    }

    renderChapters(chapters){
        if(!Array.isArray(chapters)){
            return null
        }

        return chapters.map(
            ch => <li className="volume-form__chapters-item">
                <ChapterItem title={ch.title}/>
            </li>
        )
    }

    render(){
        const {
            title, 
            description, 
            cover,
            chapters,
            onChange, 
            onCoverChange,
            onSave,
            onCancel
        } = this.props
        const {chapterFormOpened} = this.state

        return <div className="volume-form">
            <ComicHeadForm 
                title={title}
                description={description}
                cover={cover}
                onChange={onChange}
                onCoverChange={onCoverChange}
            />
            <div className="volume-form__chapters">
                <Typography use="overline">Главы</Typography>
                <ol className="volume-form__chapters-list">
                    {this.renderChapters(chapters)}
                    <li className="volume-form__chapters-item">
                        {chapterFormOpened ? 
                            <ChapterForm 
                                onCancel={this.onAddChapterCancel}
                            />
                            :
                            <button 
                                className="volume-form__add-chapter"
                                onClick={this.onAddChapterClick}
                            >
                                    <span className="volume-form__add-chapter-icon">+</span> Новая глава
                            </button>
                        }
                    </li>
                </ol>
            </div>
            <div className="volume-form__actions">
                <Button 
                    onClick={onSave}
                    raised>
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