import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Button from '../../../button'
import FormDataHelper from '../../../../helpers/FormDataHelper'
import ColorPicker from '../../color-picker'
import apiService from '../../../../services/api-service'
import ErrorIndicator from '../../../error-indicator'
import Loader from '../../../loader'
import { Dialog, DialogActions, DialogContent, DialogButton, DialogTitle } from '../../../dialog'
import DataTable from '../../data-table-components/data-table/data-table'
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImageField from '../../image-field'
import {HSLAToString} from '../../../../helpers/ColorHelper'

import './social-page.scss'

export default class SocialPage extends Component {
    defaultColor = {h: 0, s: 50, l: 50, a: 1}
    validationSchema = Yup.object({
        name: Yup.string()
            .required('Required'),
        url: Yup.string()
            .url()
            .required('Required'),
        icon: Yup.mixed()
            .required('Required')// blob or image
    })

    state = {
        socials: [],
        dialog: {
            open: false,
            type: ''// delete, edit, add
        },
        selectedItems: [],
        error: false,
        loading: true
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

    renderSocials(socials, selectedItems){
        return <DataTable 
            config = {[
                {
                    field: "_id", 
                    name: "ID",
                    sortable: true,
                    width: '15%'
                },
                {
                    field: "icon", 
                    name: "Иконка",
                    width: '15%',
                    render: (src) => {
                        return <img src={src}/>
                    }
                },
                {
                    field: "color", 
                    name: "Цвет",
                    width: '15%',
                    render: (color) => {
                        console.log('color ', color)
                        return <div style={{backgroundColor: HSLAToString(color), width: '20px', height: '20px'}}></div>
                    }
                },
                {
                    field: "url", 
                    name: "URI",
                    sortable: true,
                    width: '20%'
                },
                {
                    field: "name", 
                    name: "Название",
                    sortable: true,
                    width: '30%'
                }
            ]}
            data={socials}
            selectedItems={selectedItems}
            onSelect={this.onSelect}
            onSelectAll={this.onSelectAll}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
        />
    }

    handleSubmit = async(values) => {
        alert(JSON.stringify(values, null, 2));

        let formData = new FormData()
        //color is an Object, so serialize it
        const color = JSON.stringify(values.color)
        const {socials} = this.state
        let resultSocials = []

        formData = FormDataHelper.convertModelToFormData(formData, {...values, color})

        if(values._id){
            const social = await apiService.editSocial(formData)
            const index = socials.findIndex(({_id}) => _id === social._id)

            console.log('social', social)

            resultSocials = [
                ...socials.slice(0, index),
                {
                    ...social,
                    color: JSON.parse(social.color)
                },
                ...socials.slice(index + 1)
            ]
        } else {
            const social = await apiService.addSocial(formData)

            resultSocials = [
                ...socials,
                {
                    ...social,
                    color: JSON.parse(social.color)
                }
            ]
        }

        this.setState({
            socials: resultSocials,
            dialog: {
                open: false
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
            selectedItems: selected ? this.state.socials.map(({_id}) => _id) : []
        })
    }

    //Dialog
    renderModalByType(type){
        const {dialog: {_id}} = this.state

        switch (type) {
            case 'add':
            case 'edit':
                let initialValues = {
                    _id: null,
                    url: '',
                    name: '',
                    icon: '',
                    color: this.defaultColor
                }

                if(_id){
                    const socialToEdit = this.state.socials.find(social => social._id === _id)

                    initialValues = {
                        ...socialToEdit
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
                                //enctype="multipart/form-data"
                                <form onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                                    <DialogTitle>{formik.values.id ? 'Редактирование' : 'Добавление'} соцсети</DialogTitle>
                                    <DialogContent>
                                        <TextField 
                                            label="Название"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            invalid={formik.touched.name && !!formik.errors.name}
                                            helpText={(formik.touched.name && formik.errors.name) ? formik.errors.name : null}
                                        />
                                        <TextField
                                            label="URL"
                                            name="url"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.url}
                                            invalid={formik.touched.url && !!formik.errors.url}
                                            helpText={(formik.touched.url && formik.errors.url) ? formik.errors.url : null}
                                        />
                                        {/* <input 
                                            type="file" 
                                            name="icon" 
                                            accept="image/*"
                                            onChange={this.onFileSelect}
                                        /> */}
                                        <div className="social-page__field">
                                            <Typography use="subtitle1">Иконка</Typography>
                                            <ImageField 
                                                initialValue={formik.values.icon}
                                                onChange={file => formik.setFieldValue('icon', file)}
                                                invalid={formik.touched.icon && !!formik.errors.icon}
                                                helpText={(formik.touched.icon && formik.errors.icon) ? formik.errors.icon : null}
                                            />
                                        </div>
                                        {/* {icon && this.renderImageWithActions(icon)} */}

                                        <div className="social-page__field">
                                            <Typography use="subtitle1">Цвет фона</Typography>
                                            <ColorPicker 
                                                color={formik.values.color}
                                                setColor={color => formik.setFieldValue('color', color)}
                                            />
                                        </div>
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
                    <DialogContent>Вы действительно хотите удалить соцсеть?</DialogContent>
                    <DialogActions>
                        <DialogButton label="Удалить" onClick={() => this.handleDelete(_id)} raised/>
                        <DialogButton label="Отмена" action="close" outlined/>
                    </DialogActions>
                </>
            case 'delete_all': 
                return  <>
                    <DialogTitle>Удаление</DialogTitle>
                    <DialogContent>Вы действительно хотите удалить выделенные соцсети?</DialogContent>
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

    onPressAdd = () => {
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

    handleDelete = async (id) => {
        const [resId] = await apiService.deleteSocial(id)

       if(resId === id){
           //TODO не работает апдейт  списка после удаления
           const {socials} = this.state
           const index = socials.findIndex(s => s.id === id)

           this.setState({
               socials: [
                   ...socials.slice(0, index),
                   ...socials.slice(index + 1)
               ],
               dialog: {
                   open: false
               }
           })
       }
   }

   handleDeleteSelected = async () => {
       const {selectedItems} = this.state
       const deletedIds = await apiService.deleteSocials(selectedItems)

       if(deletedIds.length){
           const updSocials = this.state.socials.filter(({_id}) => selectedItems.indexOf(_id) === -1)
           const updSelected = selectedItems.filter(_id => deletedIds.indexOf(_id) === -1)

           this.setState({
               socials: updSocials,
               dialog: {
                   open: false
               },
               selectedItems: updSelected
           })
       }
   }

    render(){
        const {socials, dialog: {open, type},/*form: {id, name, url, color, icon},*/ selectedItems, error, loading} = this.state
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
                    <Button onClick={this.onPressAdd} raised>Добавить</Button>
                </div>
                {!!selectedItems.length && <Button onClick={this.onDeleteSelectedClick}>Удалить выделенные</Button>}
                {this.renderSocials(socials, selectedItems)}
                <Dialog open={open} onClosed={this.onModalClose}>
                    {this.renderModalByType(type)}
                </Dialog>
            </div>
        )
    }
}