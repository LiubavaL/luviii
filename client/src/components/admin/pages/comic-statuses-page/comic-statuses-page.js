import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Button from '../../../button'
import IconButton from '../../../icon-button'
import Loader from '../../../loader'
import ErrorIndicator from '../../../error-indicator'
import apiService from '../../../../services/api-service'
import { Dialog, DialogActions, DialogContent, DialogButton, DialogTitle } from '../../../dialog'
import DataTable from '../../data-table-components/data-table/data-table'
import { Formik } from 'formik';
import * as Yup from 'yup';

import './comic-statuses-page.scss'

export default class ComicStatusesPage extends Component {
    validationSchema = Yup.object({
        name: Yup.string()
            .required('Required')
    })

    state = {
        statuses: [],
        dialog: {
            open: false,
            type: ''
        },
        selectedItems: [],
        error: false, 
        loading: true
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

    handleSubmit = async (values) => {
        const {/*form,*/ statuses} = this.state

        if(values._id){//edit
            const status = await apiService.editStatus(values)
            const index = statuses.findIndex(status => status._id === values._id)

            if(status){
                this.setState({
                    statuses: [
                        ... statuses.slice(0, index),
                        status,
                        ... statuses.slice(index + 1)
                    ],
                    dialog: {
                        open: false
                    }
                })
            }
        } else {//add
            const status = await apiService.addStatus(values)

            if(status){
                this.setState({
                    statuses: [
                        ...statuses,
                        status
                    ],
                    dialog: {
                        open: false
                    }
                })
            }
        }
    }

    renderStatuses(statuses, selectedItems){
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
            data={statuses}
            selectedItems={selectedItems}
            onSelect={this.onSelect}
            onSelectAll={this.onSelectAll}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
        />
    }

    //Modal
    renderModalByType(type){
        const {dialog: {_id}} = this.state;

        switch (type) {
            case 'add':
            case 'edit':
                let initialValues = {
                    _id: null,
                    name: ''
                };

                if(_id){
                    const statusToEdit = this.state.statuses.find(status => status._id === _id)

                    initialValues = {
                        _id,
                        name: statusToEdit.name
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
                                            // value={formik.values.question}
                                            // onChange={formik.handleChange}
                                            // onBlur={formik.handleBlur}
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
                    <DialogContent>Вы действительно хотите удалить статус?</DialogContent>
                    <DialogActions>
                        <DialogButton label="Удалить" onClick={() => this.handleDelete(_id)} raised/>
                        <DialogButton label="Отмена" action="close" outlined/>
                    </DialogActions>
                </>
            case 'delete_all': 
                return  <>
                    <DialogTitle>Удаление</DialogTitle>
                    <DialogContent>Вы действительно хотите удалить выделенные статусы?</DialogContent>
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
        // const statusToEdit = this.state.statuses.find(status => status._id === id)

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
            selectedItems: selected ? this.state.statuses.map(({_id}) => _id) : []
        })
    }

    async handleDelete(id) {
       const [resId] = await apiService.deleteStatus(id);

       console.log('handleDelete 2', resId, id)

       if(resId === id){
           this.setState(({statuses}) => {
                const idx = statuses.findIndex(({_id}) => _id === id)

                return {
                    statuses: [
                        ...statuses.slice(0, idx),
                        ...statuses.slice(idx + 1)
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
        const deletedIds = await apiService.deleteStatuses(selectedItems)

        if(deletedIds.length){
            const updStatuses = this.state.statuses.filter(({_id}) => selectedItems.indexOf(_id) === -1)
            const updSelected = selectedItems.filter(_id => deletedIds.indexOf(_id) === -1)

            this.setState({
                statuses: updStatuses,
                selectedItems: updSelected,
                dialog: {
                    open: false
                }
            })
        }
    }

    render(){
        const {loading, error, statuses, dialog: {open ,type}, selectedItems} = this.state

        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator />
        }

        return <div className="comic-statuses">
            <Typography use="headline1">Статусы комикса</Typography>
            <div>
                <Button onClick={this.onAdd} raised>Добавить</Button>
            </div>
            {!!selectedItems.length && <Button onClick={this.onDeleteSelected}>Удалить выделенные</Button>}
            {this.renderStatuses(statuses, selectedItems)}
            <Dialog open={open} onClosed={this.onModalClose}>
                {this.renderModalByType(type)}
            </Dialog>
        </div>
    }
}