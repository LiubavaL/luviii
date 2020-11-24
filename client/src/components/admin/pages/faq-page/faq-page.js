import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Button from '../../../button'
import IconButton from '../../../icon-button'
import Loader from '../../../loader'
import ErrorIndicator from '../../../error-indicator'
import apiService from '../../../../services/api-service';

import TextEditor from '../../editor'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import './faq-page.scss'

export default class FaqPage extends Component {
    state = {
        faqs: [],
        form: {
            answer: this.createEmptyEditor()
        },
        error: false,
        loading: true
    }

    handleError(){
        this.setState({
            loading: false,
            error: true
        })
    }

    createEmptyEditor(){
        return EditorState.createEmpty()
    }

    async componentDidMount(){
        try {
            const faqs = await apiService.getFaqs()

            this.setState({
                faqs,
                loading: false,
                error: false
            })
        } catch(e){
            this.handleError()
        }
    }

    handleEdit = (id) => {
        const {faqs} = this.state
        const faqToEdit = faqs.find(({_id}) => id === _id)

        const contentState = convertFromRaw(JSON.parse(faqToEdit.answer))
        const editorState = this.state.form.answer
        const newEditorState = EditorState.push(editorState, contentState)

        this.setState({
            form: {
                ...faqToEdit,
                answer: newEditorState
            }
        })
    }

    handleDelete = async (id) => {
        const resId = await apiService.deleteFaq(id)

        if(resId){
            const updFaqs = this.state.faqs.filter(({_id}) => _id !== id)
            this.setState({
                faqs: updFaqs
            })
        }
    }

    prepareFormEditor(form){
        const editorState = form.answer
        const contentState = editorState.getCurrentContent()
        const preparedForm = {...form, answer: JSON.stringify(convertToRaw(contentState))}

        return preparedForm
    }

     handleSubmit = async(e) => {
        e.preventDefault()

        const {faqs} = this.state
        const form = this.prepareFormEditor(this.state.form)
       
        if(form._id){
            const faq = await apiService.editPost(form)
            const updatedIndex = faqs.findIndex(({_id}) => _id === faq._id)

            this.setState({
                faqs: [
                    ...faqs.slice(0, updatedIndex),
                    faq,
                    ...faqs.slice(updatedIndex + 1)
                ],
                form: {
                    answer: this.createEmptyEditor()
                }
            })
        } else {
            const faq = await apiService.addPost(form)

            this.setState({
                faqs: [
                    ...this.state.faqs,
                    faq
                ],
                form: {
                    answer: this.createEmptyEditor()
                }
            })
        }
    }

    renderFaqs(faqs){
        if(!faqs || !faqs.length){
            return <div>Faq пока нет.</div>
        }

        const faqsToRender = faqs.map(({_id, question, answerMarkup}) => {
            return (
                <div>
                    <div>
                        <Typography use="headline3">{question}</Typography>
                        <span dangerouslySetInnerHTML={{__html: answerMarkup}} /> 
                    </div>
                    <div>
                        <Button onClick={() => this.handleEdit(_id)}>Изменить</Button>
                        <Button onClick={() => this.handleDelete(_id)}>Удалить</Button>
                    </div>
                </div>
            )
        })

        return faqsToRender
    }

    onChange = (e) => {
            this.setState({
                form: {
                    ...this.state.form,
                    [e.target.name]: e.target.value
                }
            })
    }

    handleEditorChange = (editorState) => {
        this.setState({
            form: {
                ...this.state.form,
                answer: editorState
            }
        })
    }

    render(){
        const {form: {_id, question, answer}, faqs} = this.state

        return (
            <div className="faq-page">
                <Typography use="headline1">FAQ</Typography>
                <Typography use="headline3">Список</Typography>
                {this.renderFaqs(faqs)}
                <Typography use="headline3">Добавить вопрос</Typography>
                <form>
                    <TextField 
                        label="Вопрос"
                        name="question"
                        value={question}
                        onChange={this.onChange}
                    />
                    <TextEditor 
                        placeholder="Ответ..."
                        editorState={answer}
                        onEditorStateChange={this.handleEditorChange}
                    />
                    <Button onClick={this.handleSubmit}>{_id ? 'Редактировать' : 'Добавить'}</Button>
                </form>
            </div>
        )
    }
}