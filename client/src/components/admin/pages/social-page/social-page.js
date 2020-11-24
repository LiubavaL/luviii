import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Button from '../../../button'
import FormDataHelper from '../../../../helpers/FormDataHelper'
import IconButton from '../../../icon-button'
import ColorPicker from '../../color-picker'
import apiService from '../../../../services/api-service'
import SocialLink from '../../../social-link'
import ErrorIndicator from '../../../error-indicator'
import Loader from '../../../loader'

import './social-page.scss'

export default class SocialPage extends Component {
    defaultColor = {h: 0, s: 50, l: 50, a: 1}

    state = {
        form: {
            color: this.defaultColor
        },
        error: false,
        loading: true,
        socials: []
    }

    constructor(props){
        super(props)

        this.form = React.createRef()
    }

    async componentDidMount(){
        try {
            const socials = await apiService.getSocials()

            this.setState({
                socials: socials,
                loading: false,
                error: false
            })
        } catch(e){
            this.setState({
                loading: false,
                error: true
            })
        }
    }

    parseColor({color, ...rest}){
        return {
            ...rest,
            color: JSON.parse(color)
        }
    }

    onEdit = async (id) => {
        const socialToEdit = this.state.socials.find(social => social._id === id)

        console.log('socialToEdit', socialToEdit)

        this.setState({
            form: socialToEdit
        })
    }

     onDelete = async (id) => {
         const resId = await apiService.deleteSocial(id)

        if(resId === id){
            //TODO не работает апдейт  списка после удаления
            const {socials} = this.state
            const index = socials.findIndex(s => s.id === id)
            this.setState({
                socials: [
                    ...socials.slice(0, index),
                    ...socials.slice(index + 1)
                ]
            })
        }
    }

    renderSocials(socials){
        let socialsToRender = null
        
        if(socials && socials.length) {
            socialsToRender = socials.map(({_id, name, url, color, icon}) => {
                return <li key={_id}>
                    <SocialLink 
                        to={url} 
                        bg={color}
                        title={name}
                        icon={icon}
                    />
                    <Button onClick={() => this.onEdit(_id)}>Изменить</Button>
                    <Button onClick={() => this.onDelete(_id)}>Удалить</Button>
                </li>
            })
        }

        return <ul>{socialsToRender}</ul>
    }

    onSubmit = async(e) => {
        e.preventDefault()
        const {form} = this.state
        let formData = new FormData()
        //т.к. цвет это обхект, то сериализуем его предварительно
        const color = JSON.stringify(form.color)
        let newSocials = []

        formData = FormDataHelper.convertModelToFormData(formData, {...form, color})

        if(form._id){
            const social = await apiService.getSocials(formData)
            const {socials} = this.state
            const index = socials.findIndex(({_id}) => _id === social._id)

            newSocials = [
                ...socials.slice(0, index),
                social,
                ...socials.slice(index + 1)
            ]
        } else {
            const social = await apiService.addSocial(formData)
            newSocials = [
                ...this.state.socials,
                this.parseColor(social)
            ]
        }

        if(newSocials){
            this.setState({
                socials: newSocials
            })
            this.onReset()
        }
    }

    onChange = (e) => {
        const {name, value} = e.target

        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    renderImageWithActions(icon){
        return (
            <div>
                <img src={icon} width="100" />
                <IconButton icon="delete" onClick={this.handleImageDelete}/>
            </div>
        )
    }

    handleImageDelete = (e) => {
        if(this.state.form.icon){
            this.setState({
                form: {
                    ...this.state.form,
                    icon: null
                }
            })

            this.form.current.reset()
        }
    }

    setColor = (color) => {
        console.log('setColor ', color)
        this.setState({
            form: {
                ...this.state.form,
                color: {
                    ...this.state.form.color,
                    ...color
                }
            }
        })
    }

    onFileSelect = (e) => {
        console.log('file select e=', e.target.files[0])

        const {name, files} = e.target

        this.setState({
            form: {
                ...this.state.form,
                [name]: files[0]
            }
        })
    }

    onReset = () => {
        this.form.current.reset()
        this.setState({
            form: {
                color: this.defaultColor
            }
        })
    }

    render(){
        const {socials, form: {id, name, url, color, icon}, error, loading} = this.state
        // throw new Error('Social page test error')

        if(error){
            return <ErrorIndicator />
        }

        if(loading){
            return <Loader />
        }

        return (
            <div className="social-page">
                <Typography use="headline1">Социальные сети</Typography>
                <div>
                    {this.renderSocials(socials)}
                </div>
                <form enctype="multipart/form-data" ref={this.form}>
                    <TextField 
                        label="Название"
                        name="name"
                        value={name}
                        onChange={this.onChange}
                    />
                    <TextField
                        label="URL"
                        name="url"
                        value={url}
                        onChange={this.onChange}
                    />
                    <div>
                        <input 
                            type="file" 
                            name="icon" 
                            accept="image/*"
                            onChange={this.onFileSelect}
                        />
                    </div>
                    <ColorPicker 
                        color={color}
                        setColor={this.setColor}
                    />
                    {icon && this.renderImageWithActions(icon)}
                    <Button onClick={this.onSubmit}> {id ? 'Изменить' : 'Добавить'}</Button>
                    {id && <Button onClick={this.onReset}>Отмена</Button>}
                </form>
            </div>
        )
    }
}