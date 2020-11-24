import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Button from '../../../button'
import IconButton from '../../../icon-button'
import Loader from '../../../loader'
import ErrorIndicator from '../../../error-indicator'

import './comic-genres-page.scss'
import apiService from '../../../../services/api-service'

export default class ComicGenresPage extends Component {
    state = { 
        genres: [ ],
        loading: true,
        error: false, 
        form: {}
    }

    async componentDidMount(){
        const genres = await apiService.getGenres()

        if(genres){
            this.setState({
                genres,
                loading: false,
                error: false
            })
        } 
    }

    handleError(){
        this.setState({
            error: true,
            loading: false
        })
    }

    handleEdit(id){
        const genreToEdit = this.state.genres.find(genre => genre._id === id)

        console.log('genreToEdit', genreToEdit)

        this.setState({
            form: {
                ...genreToEdit
            }
        })
    }

    async handleDelete(id){
        console.log('handle delete id=', id)
        const resId = await apiService.deleteGenre(id)

        if(resId){
            this.setState({
                genres: this.state.genres.filter(genre => genre._id !== id)
            })
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault()

        const {form} = this.state
        
        if(form._id){//edit
            const genre = await apiService.editGenre(form)
            const {genres} = this.state
            const index = genres.findIndex(genre => genre._id === form._id)

            this.setState({
                genres: [
                    ...genres.slice(0, index),
                    genre,
                    ...genres.slice(index + 1)
                ]
            })
        } else {//add
            const genre = await apiService.addGenre(form)

            this.setState({
                genres: [
                    ...this.state.genres,
                    genre
                ]
            })
        }
        this.resetForm()
    }

    resetForm(){
        this.setState({
            form: {}
        })
    }

    renderGenres(genres){
        if(!genres || !genres.length){
            return <div>Жанры пока не доабвлены</div>
        }

        const genresToRender = genres.map(({_id, name}) => {
            return <li>
                <span>{name}</span>
                <IconButton icon="edit" onClick={e => this.handleEdit(_id)}/>
                <IconButton icon="delete" onClick={e => this.handleDelete(_id)}/>
            </li>
        })

        return <ul>{genresToRender}</ul>
    }

    render(){
        const {error, loading, genres, form} = this.state

        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator />
        }

        return <div className="comic-genres">
                <Typography use="headline1">Жанры</Typography>
                <Typography use="headline5">Список</Typography>
                {this.renderGenres(genres)}
                <Typography use="headline5">Добавить жанр</Typography>
                <form>
                    <TextField 
                        label="Название"
                        name="name"
                        value={form.name}
                        onChange={e => {
                            this.setState({
                                form: {
                                    ...form,
                                    [e.target.name]: e.target.value
                                }
                            })
                        }}
                    />
                    <Button raised onClick={this.handleSubmit}>{form._id ? 'Редактировать' :'Добавить' }</Button>
                </form>
            </div>
    }
}