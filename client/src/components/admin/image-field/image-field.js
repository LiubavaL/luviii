import React, { Component } from 'react'

import Typography from '../../typography'
import Icon from '../../icon'
import IconButton from '../../icon-button'
import HelperText from '../../helper-text'

import './image-field.scss'

export default class ImageField extends Component {
    constructor(props){
        super(props)
        this.dropArea = React.createRef()
        this.hasInitialValue = props.initialValue
        this.state = {
            value: props.initialValue,
            loading: !!props.initialLoading,
            modified: !!props.initialModified
        }
    }

    componentDidUpdate(prevProps, prevState){
        const {value} = this.state
        const {onChange} = this.props
        console.log('componentDidUpdate=',prevState.value, value)

        if(prevState.value !== value){
            if(typeof onChange === 'function'){
                console.log('image field onChange file=', value)

                onChange(value)
            }
        }
    }

    revert = () => {
        this.setState({
            value: this.props.initialValue,
            modified: false
        })
    }

    reset = () => {
        this.setState({
            value: null
        })
    }

    onChange = (e) => {
        const file = e.target.files[0]

        this.setState({
            value: file,
            modified: !!this.hasInitialValue
        })
    }

    renderImage(){
        const {value, modified} = this.state
        let img = null

        if(typeof value === "string"){
            img = <img className="image-field__img" src={value}/>
        } else if (value instanceof File ) {
            // this.setState({
            //     loading: true
            // })

            const onPreviewLoad = (e) => {

                console.log('onPreviewLoad')
                // this.setState({
                //     loading: false
                // })
                window.URL.revokeObjectURL(e.target.src)
            }

            img = <img 
                    className="image-field__img"
                    src={URL.createObjectURL(value)} 
                    onLoad={onPreviewLoad}
                 />
        }

        if(img !== null) {
            return (
                <div className="image-field image-field--filled">
                    <div className="image-field__backdrop">

                        {
                            modified &&  
                            <IconButton 
                                icon="refresh"
                                onClick={this.revert}
                            />
                        }

                        <IconButton 
                            icon="cloud_upload" 
                            tag="label"
                        >
                            {this.getFileInput()}
                        </IconButton>

                        <IconButton 
                            icon="delete_outline"
                            onClick={this.reset}
                        />
                    </div>
                    {img}
                </div>
            )
        }

        return null
    }

    getFileInput(){
        return (
            <input 
                type="file" 
                className="image-field__input"
                accept="image/*"
                onChange={this.onChange}
            />
        )
    }

    onDragDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const highlightClass = 'image-field--highlight'

        switch(e.type){
            case 'dragover':
            case 'dragenter': 
                this.dropArea.current.classList.add(highlightClass); break;
            case 'dragleave':
            case 'drop':
                this.dropArea.current.classList.remove(highlightClass); 
                if(e.type === 'drop'){
                    this.setState({
                        value: e.dataTransfer.files[0],
                        modified: true,
                    })
                }
                break;
        }
    }

    getClassNames(){
        const {invalid} = this.props

        return `image-field image-field--empty
            ${invalid ? ' image-field--invalid' : ''}
        `
    }

    renderEmpty(){
        const {invalid, helpText} = this.props

        return (
            <>
                <div 
                    className={this.getClassNames()}
                    onDragEnter={this.onDragDrop}
                    onDragLeave={this.onDragDrop}
                    onDragOver={this.onDragDrop}
                    onDrop={this.onDragDrop}
                    ref={this.dropArea}
                >
                    <Icon 
                        src="cloud_upload" 
                        size="l"
                        className="image-field__icon"
                    />
                    <Typography 
                        use="subtitle2" 
                        className="image-field__title">
                            Перетащите файл
                    </Typography>
                    <p className="image-field__or">или</p>
                    <label className="image-field__label">
                        Выберите
                        {this.getFileInput()}
                    </label>
                </div>
                <div className="mdc-text-field-helper-line">
                    <HelperText invalid={invalid}>
                            {helpText}
                    </HelperText>
                </div>
            </>
        )
    }

    renderLoading(){
        return (
            <div className="image-field image-field--loading">
                <Typography>Загрузка...</Typography>
                <div className="image-field__progress-bar">
                    <span className="image-field__progress" style={{width: '30%'}}></span>
                </div>
            </div>
        )
    }

    // const Cover = (props) => {
    
    //     const onPreviewLoad = (e) => {
    //         window.URL.revokeObjectURL(e.target.src)
    //     }
    //     let image = null
    //     const src = props.src ? props.src : "/images/cover.png"
    
    //     if(src instanceof File){
    //         image = <img width="100" src={URL.createObjectURL(src)} onLoad={onPreviewLoad} />
    //     }
    
    //     if(typeof src === 'string'){
    //         image = <img width="100" src={src} />
    //     }
    
    //     return image
    // }

    render() {
        const {loading, value} = this.state

        if(loading){
            return this.renderLoading()
        }

        if(value){
            return this.renderImage()
        }
        
        return this.renderEmpty()
    }
}