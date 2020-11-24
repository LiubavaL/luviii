import React, { Component } from 'react'

import {history} from 'react-router-dom'

import apiService from '../../../../services/api-service';
import Loader from '../../../loader';
import ErrorIndicator from '../../../error-indicator'
import Typography from '../../../typography';
import TextField from '../../../text-field'
import Button from '../../../button';
import IconButton from '../../../icon-button'

import TextEditor from '../../editor'
import draftToHtml from 'draftjs-to-html'
import {convertFromRaw, EditorState, convertToRaw} from 'draft-js'

import FormDataHelper from '../../../../helpers/FormDataHelper'

export default class PostsPage extends Component {
    state = {
        posts: [],
        loading: true,
        error: false,
        form: {
            text: this.createEmptyEditor()
        }
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

    handleSubmit = async (e) => {
        e.preventDefault()

        const {form} = this.state
        const editorState = form.text
        //отдельно сериалищуем содержимое text editor
        const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        let formData = new FormData()

        formData = FormDataHelper.convertModelToFormData(formData, {...form, text})

        // for(const name in form){
        //     console.log('name', name)
        //     const value = form[name]

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
        if(form._id){
            const post = await apiService.editPost(formData)

            // функциональный вариант тут использовать не обязательно(у нас нет несколько вызоов setState подряд), но на всякий оставлю
            this.setState((prevState) => {
                const prevPosts = prevState.posts, 
                    postIndex = prevPosts.findIndex(prevPost => prevPost._id === post._id)

                const posts = [
                    ...prevPosts.slice(0, postIndex),
                    post,
                    ...prevPosts.slice(postIndex + 1)
                ]
                return {posts}
            })
        } 
        //add
        else {
            const post = await apiService.addPost(formData)

            this.setState({
                posts: [
                    ...this.state.posts,
                    post
                ]
            })
        }

        //очищаем поле с данными формы
        this.setState({
            form: {
                text: this.createEmptyEditor()
            }
        })
        //для того, чтобы стерлось поле с type=file
        this.form.current.reset()
    }

    handleChange = (e) => {
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
                text: editorState
            }
        })
    }

    handleFileSelect = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.files
            }
        })
    }

    async handleDelete(id) {
        const resId = await apiService.deletePost(id)
        
        if(resId === id){
            this.setState((prevState) => {
                const posts = prevState.posts.filter(post => post._id !== id)
                return {posts}
            })
        }
    }

    handleEdit(id){
        const postToEdit = this.state.posts.find(post => post._id === id)
        let form = {}

        console.log('--------this.state.posts=', this.state.posts)
        console.log('--------form=', postToEdit)
        //TODO deep copy of post item nedeed
        for(let prop in postToEdit){
            if(prop === 'text'){
                const contentState = convertFromRaw(JSON.parse(postToEdit[prop]))
                const editorState = this.state.form.text
                form[prop] = EditorState.push(editorState, contentState)
            } else {
                const node = document.getElementsByName(prop)[0]
                if(node){
                    if(prop === 'images'){
                        form['imagesToDelete'] = []
                    } else {
                        form[prop] = postToEdit[prop]
                    }
                }
            }
        }


        this.setState({form})
    }

    renderPosts(posts){
        if(!posts || !posts.length) {
            return <div>Постов пока нет.</div>
        }

        return posts.map(({_id, title, textMarkup, images}) => {
            return <div key={_id}>
                <div>Название: {title}</div>
                <div>Текст:  <span dangerouslySetInnerHTML={{__html: textMarkup}} /> </div>
                {images && <span>{this.renderImages(images)}</span>}
                <Button onClick={e => this.handleEdit(_id)}>Изменить</Button>
                <Button onClick={e => this.handleDelete(_id)}>Удалить</Button>
            </div>
        })
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

    render(){
        const {loading, error, posts, form: {_id, title = "", text, imagesToDelete}} = this.state,
        postToEdit = posts ? posts.find(post => post._id === _id) : null,
        imagesToRender = postToEdit ? postToEdit.images.filter((image, i) => !imagesToDelete.includes(i)) : null
        
        console.log('PostPage render, text = ', text)

        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator />
        }

        return <div>
            <Typography use="headline1">Посты</Typography>
            {this.renderPosts(posts)}
            <Typography use="headline2">Добавить пост</Typography>
            <form ref={this.form}>
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
            </form>
        </div>
    }
}