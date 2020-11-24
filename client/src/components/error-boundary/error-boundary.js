import React, { Component } from 'react'
import ErrorIndicator from '../error-indicator'

// этот компонент используется для отлавливания ошибок на этапе рендера. 
//Работает для отлавливания ошибок  метода render и методов жизненного цикла низлежащих компонентов
// Обработчики событий должны само обрабатывать свои ошибки через try/catch
export default class ErrorBoundry extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError: false,
            message: null
        }
    }

    static getDerivedStateFromError(error){
        return {hasError: true, message: error}
    }

    componentDidCatch(error, errorInfo){
        // log error here
    }

    render(){
        const {hasError, message} = this.state

        if(hasError){
            return <ErrorIndicator msg={message}/>
        }

        return this.props.children
    }
}