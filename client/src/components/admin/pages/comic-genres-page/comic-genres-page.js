import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Button from '../../../button'
import Loader from '../../../loader'
import ErrorIndicator from '../../../error-indicator'
import apiService from '../../../../services/api-service'
import { Dialog, DialogActions, DialogContent, DialogButton, DialogTitle } from '../../../dialog'
import DataTable from '../../data-table-components/data-table/data-table'
import { Formik } from 'formik';
import * as Yup from 'yup';

import './comic-genres-page.scss'

export default class ComicGenresPage extends Component {
    validationSchema = Yup.object({
        name: Yup.string()
            .required('Required')
    })

    state = { 
        genres: [],
        dialog: {
            open: false,
            type: ''// delete, edit, add
        },
        selectedItems: [],
        loading: true,
        error: false
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

    async handleDelete(id){
        const [resId] = await apiService.deleteGenre(id)

        if(resId === id){
            this.setState(({genres}) => {
                const idx = this.state.genres.findIndex(({_id}) => _id === id)

                return {
                    genres: [
                        ...genres.slice(0, idx),
                        ...genres.slice(idx + 1)
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
        const deletedIds = await apiService.deleteGenres(selectedItems)

        if(deletedIds.length){
            const updGenres = this.state.genres.filter(({_id}) => selectedItems.indexOf(_id) === -1)
            const updSelected = selectedItems.filter(_id => deletedIds.indexOf(_id) === -1)

            this.setState({
                genres: updGenres,
                dialog: {
                    open: false
                },
                selectedItems: updSelected
            })
        }
    }

    handleSubmit = async(values) => {
        if(values._id){//edit
            const genre = await apiService.editGenre(values)

            this.setState(({genres}) => {
                const index = genres.findIndex(genre => genre._id === values._id)

                return {
                    genres: [
                        ...genres.slice(0, index),
                        genre,
                        ...genres.slice(index + 1)
                    ],
                    dialog: {
                        open: false
                    }
                }
            })
        } else {//add
            const genre = await apiService.addGenre(values)

            this.setState({
                genres: [
                    ...this.state.genres,
                    genre
                ],
                dialog: {
                    open: false
                }
            })
        }
    }

    renderGenres(genres, selectedItems){
        return <DataTable 
            config = {[
                {
                    field: "_id", 
                    name: "ID",
                    sortable: true,
                    width: '15%'
                },
                {
                    field: "name", 
                    name: "Название",
                    sortable: true,
                    width: '20%'
                }
            ]}
            data={genres}
            selectedItems={selectedItems}
            onSelect={this.onSelect}
            onSelectAll={this.onSelectAll}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
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
                    name: ''
                }

                if(_id){
                    const genreToEdit = this.state.genres.find(genre => genre._id === _id)

                    initialValues = {
                        _id,
                        name: genreToEdit.name
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
                                    <DialogTitle>{formik.values._id ? 'Редактирование' : 'Добавление'} вопроса</DialogTitle>
                                    <DialogContent>
                                        <TextField 
                                            label="Название"
                                            name="name"

                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
                                            // value={formik.values.question}
                                            {...formik.getFieldProps('name')}
                                            invalid={formik.touched.name && !!formik.errors.name}
                                            helpText={(formik.touched.name && formik.errors.name) ? formik.errors.name : null}
                                        />
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

    //Select
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
            selectedItems: selected ? this.state.genres.map(({_id}) => _id) : []
        })
    }

    render(){
        const {error, loading, genres, selectedItems, dialog: {open, type}} = this.state

        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator />
        }

        return <div className="comic-genres">
                <Typography use="headline1">Жанры</Typography>
                <div>
                    <Button onClick={this.onAdd} raised>Добавить</Button>
                </div>
                {!!selectedItems.length && <Button onClick={this.onDeleteSelected}>Удалить выделенные</Button>}
                {this.renderGenres(genres, selectedItems)}
                <Dialog open={open} onClosed={this.onModalClose}>
                    {this.renderModalByType(type)}
                </Dialog>
            </div>
    }
}