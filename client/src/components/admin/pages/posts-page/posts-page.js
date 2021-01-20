import React, { Component } from 'react'

import apiService from '../../../../services/api-service';
import Loader from '../../../loader';
import ErrorIndicator from '../../../error-indicator'
import Typography from '../../../typography';
import TextField from '../../../text-field'
import Button from '../../../button';
import IconButton from '../../../icon-button'
import TextEditor from '../../editor'
import {convertFromRaw, EditorState, convertToRaw} from 'draft-js'
import { Dialog, DialogActions, DialogContent, DialogButton, DialogTitle } from '../../../dialog'
import DataTable from '../../data-table-components/data-table/data-table'
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormDataHelper from '../../../../helpers/FormDataHelper'

import './posts-page.scss'

export default class PostsPage extends Component {
    validationSchema = Yup.object({
        //хотя бы одно из 3х полей должно быть заполнено
        title: Yup.string()
            .required('Required'),
        text: Yup.object()
            // .nullable()
            .transform(function (currentValue, originalvalue) {
                // console.log('HAS TEXT = ', originalvalue.getCurrentContent().hasText())
                // console.log('HAS TEXT getplain = ', currentValue.getCurrentContent().getPlainText().trim() === "")
                return this.isType(currentValue) && currentValue.getCurrentContent().getPlainText().trim() === "" ? null : currentValue
            })
            .required('Required'),
        // images: Yup.mixed()
        //     .required('Required')
    })
    
    state = {
        posts: [],
        dialog: {
            open: false,
            type: ''// delete, edit, add
        },
        selectedItems: [],
        loading: true,
        error: false
    }

    constructor(props){
        super(props)

        this.form = React.createRef()
    }
    
    //TODO метод вынести в TextEditor, чтобы не повторялся?
    createEmptyEditor(){
        return EditorState.createEmpty()
    }

    async componentDidMount(){
        try {
            const posts = await apiService.getPosts()

            this.setState({
                posts,
                loading: false,
                error: false
            })
        } catch (e) {
            this.setState({
                loading: false,
                error: true
            })
        }
    }

    handleSubmit = async (values) => {
        const editorState = values.text
        //отдельно сериалищуем содержимое text editor
        const preparedText = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        let formData = new FormData()
        let updPosts = []
        const {posts} = this.state

        formData = FormDataHelper.convertModelToFormData(formData, {...values, text: preparedText})

        // for(const name in values){
        //     console.log('name', name)
        //     const value = values[name]

        //     if( value instanceof FileList){
        //         console.log('formdata load files', name, value)
        //         for(let i = 0; i < value.length; i++) {
        //             formData.append(`${name}`, value[i])
        //         }
        //     } else if(Array.isArray(value) 
        //         || typeof value === 'object' && value !== null){

        //     }
        //     else {
        //         formData.append(name, value)
        //     }
        // }

        //edit
        if(values._id){
            const post = await apiService.editPost(formData)
            const postIndex = posts.findIndex(({_id}) => _id === post._id)

            updPosts = [
                ...posts.slice(0, postIndex),
                post,
                ...posts.slice(postIndex + 1)
            ]
            console.log('edit post result ', posts)
        } else {
            const post = await apiService.addPost(formData)

            updPosts = [
                ...posts,
                post
            ]
        }

        this.setState({
            posts: updPosts,
            dialog: {
                open: false
            }
        })

        //очищаем поле с данными формы
        // this.setState({
        //     form: {
        //         text: this.createEmptyEditor()
        //     }
        // })
        // //для того, чтобы стерлось поле с type=file
        // this.values.current.reset()
    }

    // handleChange = (e) => {
    //     this.setState({
    //         form: {
    //             ...this.state.form,
    //             [e.target.name]: e.target.value
    //         }
    //     })
    // }

    // handleEditorChange = (editorState) => {
    //     this.setState({
    //         form: {
    //             ...this.state.form,
    //             text: editorState
    //         }
    //     })
    // }

    handleFileSelect = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.files
            }
        })
    }

    // handleEdit(id){
    //     const postToEdit = this.state.posts.find(post => post._id === id)
    //     let form = {}

    //     //TODO deep copy of post item nedeed
    //     for(let prop in postToEdit){
    //         if(prop === 'text'){
    //             const contentState = convertFromRaw(JSON.parse(postToEdit[prop]))
    //             const editorState = this.state.form.text
    //             form[prop] = EditorState.push(editorState, contentState)
    //         } else {
    //             const node = document.getElementsByName(prop)[0]
    //             if(node){
    //                 if(prop === 'images'){
    //                     form['imagesToDelete'] = []
    //                 } else {
    //                     form[prop] = postToEdit[prop]
    //                 }
    //             }
    //         }
    //     }

    //     this.setState({form})
    // }

    async handleDelete(id) {
        const [resId] = await apiService.deletePost(id)
        
        if(resId === id){
            this.setState(({posts}) => {
                const idx = posts.findIndex(({_id}) => _id !== id)

                return {
                    posts: [
                        ...posts.slice(0, idx),
                        ...posts.slice(idx + 1)
                    ],
                    dialog: {
                        open: false
                    }
                }
            })
        }
    }

    handleDeleteSelected = async () => {
        const {selectedItems} = this.state
        const deletedIds = await apiService.deletePosts(selectedItems)

        if(deletedIds.length){
            const updPosts = this.state.posts.filter(({_id}) => selectedItems.indexOf(_id) === -1)
            const updSelected = selectedItems.filter(_id => deletedIds.indexOf(_id) === -1)

            this.setState({
                posts: updPosts,
                dialog: {
                    open: false
                },
                selectedItems: updSelected
            })
        }
    }

    renderPosts(posts, selectedItems){
        // if(!posts || !posts.length) {
        //     return <div>Постов пока нет.</div>
        // }

        // return posts.map(({_id, title, textMarkup, images}) => {
        //     return <div key={_id}>
        //         <div>Название: {title}</div>
        //         <div>Текст:  <span dangerouslySetInnerHTML={{__html: textMarkup}} /> </div>
        //         {images && <span>{this.renderImages(images)}</span>}
        //         <Button onClick={e => this.handleEdit(_id)}>Изменить</Button>
        //         <Button onClick={e => this.handleDelete(_id)}>Удалить</Button>
        //     </div>
        // })

        return <DataTable 
            config = {[
                {
                    field: "_id", 
                    name: "ID",
                    sortable: true,
                    width: '15%'
                },
                {
                    field: "title", 
                    name: "Заголовок",
                    sortable: true,
                    width: '20%'
                },
                {
                    field: "textMarkup", 
                    name: "Текст",
                    sortable: true,
                    width: '30%',
                    asInner: true
                },
                {
                    field: "images", 
                    name: "Картинки",
                    width: '30%',
                    render: this.renderImages
                }
            ]}
            data={posts}
            selectedItems={selectedItems}
            onSelect={this.onSelect}
            onSelectAll={this.onSelectAll}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
        />
    }

    //TODO  вынести картинку с кнопками действия в отдельный компонент
    renderImagesWithActions(images){
        return images.map((image, i) => {
            return (
                <div className="image_input">
                    <img src={image} width="100"/>
                    <IconButton icon="delete" onClick={e => this.handleImageDelete(e, i)}/>
                </div>
            )
        })
    }

    handleImageDelete(e, i){
        e.preventDefault()

        this.setState({
            form: {
                ...this.state.form,
                imagesToDelete: [
                    ...this.state.form.imagesToDelete,
                    i
                ]
            }
        })
    }

    renderImages(images) {
        return images.map(image => {
            return <img src={image} width="100"/>
        })
    }

    //Modal
    renderModalByType(type){
        const {dialog: {_id}} = this.state

        switch (type) {
            case 'add':
            case 'edit':
                let initialValues = {
                    _id: null,
                    title: '',
                    text: this.createEmptyEditor(),
                    images: []
                }

                if(_id){
                    const postToEdit = this.state.posts.find(p => p._id === _id)

                    const contentState = convertFromRaw(JSON.parse(postToEdit.text))
                    const editorState = this.createEmptyEditor()
                    const newEditorState = EditorState.push(editorState, contentState)

                    initialValues = {
                        _id,
                        title: postToEdit.title,
                        text: newEditorState,
                        images: postToEdit.images
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
                                    <DialogTitle>{formik.values._id ? 'Редактирование' : 'Добавление'} поста</DialogTitle>
                                    <DialogContent>
                                        <TextField 
                                            label="Заголовок"
                                            name="title"

                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            // value={formik.values.question}
                                            {...formik.getFieldProps('title')}
                                            invalid={formik.touched.title && !!formik.errors.title}
                                            helpText={(formik.touched.title && formik.errors.title) ? formik.errors.title : null}
                                        />
                                        <TextEditor 
                                            placeholder="Текст..."
                                            editorState={formik.values.text}
                                            onEditorStateChange={(editorState) => formik.setFieldValue('text', editorState)}
                                            invalid={formik.touched.text && !!formik.errors.text}
                                            helpText={(formik.touched.text && formik.errors.text) ? formik.errors.text : null}
                                        />
                                        {this.renderImages(formik.values.images)}
                                    </DialogContent>
                                    <DialogActions>
                                        <DialogButton 
                                            label={formik.values._id ? "Редактировать" : "Добавить"}
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
                    <DialogContent>Вы действительно хотите удалить пост?</DialogContent>
                    <DialogActions>
                        <DialogButton label="Удалить" onClick={() => this.handleDelete(_id)} raised/>
                        <DialogButton label="Отмена" action="close" outlined/>
                    </DialogActions>
                </>
            case 'delete_all': 
                return  <>
                    <DialogTitle>Удаление</DialogTitle>
                    <DialogContent>Вы действительно хотите удалить выделенные посты?</DialogContent>
                    <DialogActions>
                        <DialogButton label="Удалить" onClick={this.handleDeleteSelected} raised/>
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

    onAdd = () => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: true,
                type: 'add'
            }
        })
    }

    onEdit = (_id) => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: true,
                type: 'edit',
                _id
            }
        })
    }

    onDelete = (_id) => {
        this.setState({
            dialog: {
                ...this.state.dialog,
                open: true,
                type: 'delete',
                _id
            },
        })
    }

    onDeleteSelected = () => {
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

    onSelectAll = (selected) => {
        this.setState({
            selectedItems: selected ? this.state.posts.map(({_id}) => _id) : []
        })
    }

    renderSelectedActions(selectedItems){
        if(selectedItems.length === 0) {
            return null
        }

        return <Button onClick={this.onDeleteSelected}>Удалить выделенные</Button>
    }

    render(){
        const {loading, error, posts, selectedItems, dialog: {open, type}/*form: {_id, title = "", text, imagesToDelete}*/} = this.state
            // postToEdit = posts ? posts.find(post => post._id === _id) : null,
            // imagesToRender = postToEdit ? postToEdit.images.filter((image, i) => !imagesToDelete.includes(i)) : null
        
        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator />
        }

        return <div>
            <Typography use="headline1">Посты</Typography>
            <div>
                <Button onClick={this.onAdd} raised>Добавить</Button>
            </div>
            {this.renderSelectedActions(selectedItems)}
            {this.renderPosts(posts, selectedItems)}
            {/* <form ref={this.form}>
                <input type="hidden" name="_id" value={_id}/>
                <TextField 
                    name="title" 
                    label="Заголовок" 
                    value={title}
                    onChange={this.handleChange} 
                    outlined/>

                <TextEditor 
                    editorState={text}
                    onEditorStateChange={this.handleEditorChange}
                    placeholder="Текст"
                />
                <legend>
                    <input 
                        type="file" 
                        name="images" 
                        onChange={this.handleFileSelect}
                        accept="image/*"
                        multiple
                    />
                </legend>
                {imagesToRender && this.renderImagesWithActions(imagesToRender)}
                <Button onClick={this.handleSubmit}> {_id ? 'Рерактировать' : 'Добавить'}</Button>
            </form> */}
            <Dialog open={open} onClosed={this.onModalClose}>
                {this.renderModalByType(type)}
            </Dialog>
        </div>
    }
}