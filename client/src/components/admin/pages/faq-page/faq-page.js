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
import { Dialog, DialogActions, DialogContent, DialogButton, DialogTitle } from '../../../dialog'
import DataTable from '../../data-table-components/data-table/data-table'
import { Formik } from 'formik';
import * as Yup from 'yup';

import './faq-page.scss'

export default class FaqPage extends Component {
    validationSchema = Yup.object({
        question: Yup.string()
            .required('Required'),
        answer: Yup.object()
            .nullable()
            .transform(function (currentValue, originalvalue) {
                // console.log('HAS TEXT = ', originalvalue.getCurrentContent().hasText())
                // console.log('HAS TEXT getplain = ', currentValue.getCurrentContent().getPlainText().trim() === "")
                return this.isType(currentValue) && currentValue.getCurrentContent().getPlainText().trim() === "" ? null : currentValue
            })
            .required('Required')
    })

    state = {
        faqs: [],
        dialog: {
            open: false,
            type: ''// delete, edit, add
        },
        selectedItems: [],
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

    handleDelete = async (id) => {
        const resId = await apiService.deleteFaq(id)

        if(resId){
            const updFaqs = this.state.faqs.filter(({_id}) => _id !== id)
            this.setState({
                faqs: updFaqs,
                dialog: {
                    open: false
                }
            })
        }
    }

    handleDeleteSelected = async () => {
        const {selectedItems} = this.state
        const deletedIds = await apiService.deleteFaqs(selectedItems)

        if(deletedIds.length){
            const updFaqs = this.state.faqs.filter(({_id}) => selectedItems.indexOf(_id) === -1)
            const updSelected = selectedItems.filter(_id => deletedIds.indexOf(_id) === -1)

            this.setState({
                faqs: updFaqs,
                dialog: {
                    open: false
                },
                selectedItems: updSelected
            })
        }
    }

    prepareFormEditor(form){
        const editorState = form.answer
        const contentState = editorState.getCurrentContent()
        const preparedForm = {...form, answer: JSON.stringify(convertToRaw(contentState))}

        return preparedForm
    }

    handleSubmit = async(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2));

        const {faqs} = this.state
        const form = this.prepareFormEditor(values)
        let resultFaqs = []

        if(form._id){
            const faq = await apiService.editFaq(form)
            const updatedIndex = faqs.findIndex(({_id}) => _id === faq._id)

            resultFaqs = [
                ...faqs.slice(0, updatedIndex),
                faq,
                ...faqs.slice(updatedIndex + 1)
            ]
        } else {
            const faq = await apiService.addFaq(form)

            resultFaqs = [
                ...this.state.faqs,
                faq
            ]
        }
        
        this.setState({
            faqs: resultFaqs,
            dialog: {
                open: false
            }
        })
        // setSubmitting(false);
    }

    renderFaqs(faqs, selectedItems){
        return <DataTable 
            config = {[
                {
                    field: "_id", 
                    name: "ID",
                    sortable: true,
                    width: '15%'
                },
                {
                    field: "question", 
                    name: "Вопрос",
                    sortable: true,
                    width: '20%'
                },
                {
                    field: "answerMarkup", 
                    name: "Ответ",
                    sortable: true,
                    width: '30%',
                    asInner: true
                }
            ]}
            data={faqs}
            selectedItems={selectedItems}
            onSelect={this.onSelect}
            onEdit={this.onEditClick}
            onDelete={this.onDeleteClick}
        />
    }

    //Modal
    renderModalByType(type){
        const {dialog: {_id}} = this.state

        switch (type) {
            case 'add':
            case 'edit':
                let initialValues = {
                    _id: null,
                    question: '',
                    answer: this.createEmptyEditor()
                }

                if(_id){
                    const faqToEdit = this.state.faqs.find(faq => faq._id === _id)
                    const contentState = convertFromRaw(JSON.parse(faqToEdit.answer))
                    const editorState = this.createEmptyEditor()
                    const newEditorState = EditorState.push(editorState, contentState)

                    initialValues = {
                        _id,
                        question: faqToEdit.question,
                        answer: newEditorState
                    }
                } 

                return <>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={this.handleSubmit}
                    >
                        {
                            (formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <DialogTitle>{formik.values.id ? 'Редактирование' : 'Добавление'} вопроса</DialogTitle>
                                    <DialogContent>
                                        <TextField 
                                            label="Вопрос"
                                            name="question"
                                            // value={question}
                                            // onChange={this.onChange}

                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.question}
                                            invalid={formik.touched.question && !!formik.errors.question}
                                            helpText={(formik.touched.question && formik.errors.question) ? formik.errors.question : null}
                                        />
                                        <TextEditor 
                                            placeholder="Ответ..."
                                            editorState={formik.values.answer}
                                            onEditorStateChange={(editorState) => formik.setFieldValue('answer', editorState)}
                                            invalid={formik.touched.answer && !!formik.errors.answer}
                                            helpText={(formik.touched.answer && formik.errors.answer) ? formik.errors.answer : null}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <DialogButton 
                                            label={formik.values.id ? "Редактировать" : "Добавить"}
                                            // onClick={this.handleSubmit}
                                            raised
                                        />
                                        <DialogButton 
                                            label="Отмена"
                                            action="close"
                                            type="button"
                                            outlined
                                            />
                                    </DialogActions>
                                </form>
                            )
                        }
                    </Formik>
                    
                </>
            case 'delete': 
                return  <>
                    <DialogTitle>Удаление</DialogTitle>
                    <DialogContent>Вы действительно хотите удалить вопрос?</DialogContent>
                    <DialogActions>
                        <DialogButton label="Удалить" onClick={() => this.handleDelete(_id)} raised/>
                        <DialogButton label="Отмена" action="close" outlined/>
                    </DialogActions>
                </>
            case 'delete_all': 
                return  <>
                    <DialogTitle>Удаление</DialogTitle>
                    <DialogContent>Вы действительно хотите удалить выделенные вопросы?</DialogContent>
                    <DialogActions>
                        <DialogButton label="Удалить" onClick={() => this.handleDeleteSelected()} raised/>
                        <DialogButton label="Отмена" action="close" outlined/>
                    </DialogActions>
                </>
            default: return null
        }
    }

    onModalClose = () => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: false,
                type: '',
                _id: null
            }
        })
    }

    onAddClick = () => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: true,
                type: 'add'
            }
        })
    }

    onEditClick = (_id) => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: true,
                type: 'edit',
                _id
            }
        })
    }

    onDeleteClick = (_id) => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: true,
                type: 'delete',
                _id
            },
        })
    }

    onDeleteSelectedClick = () => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: true,
                type: 'delete_all'
            }
        })
    }

    onSelect = ({selected, rowId}) => {
        const {selectedItems} = this.state

        if(selected && selectedItems.indexOf(rowId) == -1){
            this.setState({
                selectedItems: [...selectedItems, rowId]
            })
        } else {
            const removeIndex = selectedItems.indexOf(rowId)
            this.setState({
                selectedItems: [
                    ...selectedItems.slice(0, removeIndex),
                    ...selectedItems.slice(removeIndex + 1)
                ]
            })
        }
    }

    render(){
        const {faqs, dialog: {open, type}, selectedItems, loading, error} = this.state

        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator message={error}/>
        }

        return (
            <div className="faq-page">
                <Typography use="headline1">FAQ</Typography>
                <div>
                    <Button onClick={this.onAddClick} raised>Добавить</Button>
                </div>
                {!!selectedItems.length && <Button onClick={this.onDeleteSelectedClick}>Удалить выделенные</Button>}
                {this.renderFaqs(faqs, selectedItems)}
                <Dialog open={open} onClosed={this.onModalClose}>
                    {this.renderModalByType(type)}
                </Dialog>
            </div>
        )
    }
}