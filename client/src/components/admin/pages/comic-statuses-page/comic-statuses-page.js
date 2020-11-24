import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Button from '../../../button'
import IconButton from '../../../icon-button'
import Loader from '../../../loader'
import ErrorIndicator from '../../../error-indicator'
import apiService from '../../../../services/api-service'

import './comic-statuses-page.scss'

export default class ComicStatusesPage extends Component {
    state = {
        statuses: [],
        error: false, 
        loading: true,
        form: {}
    }

    async componentDidMount(){
        let statuses = await apiService.getStatuses()
            
        this.setState({ 
            statuses,
            loading: false,
            error: false
        })
    }

    handleError(e){
        this.setState({
            error: true,
            loading: false
        })
    }

    handleEdit(id){
        const statusToEdit = this.state.statuses.find(status => status._id === id)

        this.setState({
            form: statusToEdit
        })
    }

    async handleDelete(id){
       const resId = await apiService.deleteStatus(id)

       if(resId){
            this.setState({
                statuses: this.state.statuses.filter(status => status._id !== id)
            })
       }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        
        const {form, statuses} = this.state

        if(form._id){//edit
            const status = await apiService.editStatus(form)
            const index = statuses.findIndex(status => status._id === form._id)

            if(status){
                this.setState({
                    statuses: [
                        ... statuses.slice(0, index),
                        status,
                        ... statuses.slice(index + 1)
                    ]
                })
            }
        } else {//add
            const status = await apiService.addStatus(form)
            if(status){
                this.setState({
                    statuses: [
                        ...statuses,
                        status
                    ]
                })
            }
        }

        this.resetForm()
    }

    resetForm(){
        this.setState({
            form: {}
        })
    }

    renderStatuses(statuses){
        if(!statuses || !statuses.length){
            return <div>Статусы пока не добавлены</div>
        }
        const statusesToRender = statuses.map(({name, _id}) => {
            return <li>
                 <span>{name}</span>
                <IconButton icon="edit" onClick={e => this.handleEdit(_id)}/>
                <IconButton icon="delete" onClick={e => this.handleDelete(_id)}/>
            </li>
        })
        return <ul>{statusesToRender}</ul>
    }

    render(){
        const {loading, error, statuses, form} = this.state

        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator />
        }

        return <div className="comic-statuses">
            <Typography use="headline1">Статусы комикса</Typography>
            <Typography use="headline5">Список</Typography>
            {this.renderStatuses(statuses)}
            <Typography use="headline5">Добавить статус</Typography>
            <form>
                <TextField 
                    label = "Название"
                    name="name"
                    value={form.name}
                    onChange={e => this.setState({
                        form: {
                            ...form, 
                            [e.target.name]: e.target.value
                        }
                    })}
                />
                <Button onClick={this.handleSubmit} raised>{form._id ? 'Редактировать' : 'Доабвить'}</Button>
            </form>
        </div>
    }
}