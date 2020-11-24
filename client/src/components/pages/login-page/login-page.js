import React, { Component } from 'react'
import Button from '../../button'
import TextField from '../../text-field'
import {AuthContext} from '../../../contexts/AuthContext'
import { withRouter } from "react-router";

class LoginPage extends Component {
    static contextType = AuthContext

    constructor(props){
        super(props)
        this.state = {
            form: {}
            // isAuthorized: false
        }
    }

    componentDidMount(){
        console.log('LoginPage componentDidMount👍', this.props.location.state)
        // this.setState({
        //     isAuthorized: !!this.context.token
        // })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        console.log('LoginPage handleSubmit')

        const {email, password} = this.state.form
        //todo в login убрать запрос, вынести его сюда
        const data = await this.context.login(email, password, this.getFromLocation())
        console.log('handleSubmit data', data)
        
        // await fetch('/api/auth/login', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state.form)
        // })

        // if(data){
        //     this.setState({isAuthorized: true})
        // }
    }

    handleChange = ({target: {name, value}}) => {
        this.setState({
            form: {
                ...this.state.form, 
                [name]: value
            }
        })
    }

    getFromLocation(){
        const {from} = this.props.location?.state || {from: {pathname: '/admin'}}

        return from.pathname
    }
    
    render(){
        const {form: {email, password}} = this.state

        // if(isAuthorized){
        //     console.log('logged in succesfyl, trying to redirect...', this.props)
        //     const {from} = this.props.location?.state || {from: {pathname: '/admin'}}
        //     console.log('from ', from)

        //     return <Redirect to={from} />
        // }

        // console.log('LoginPage render ')

        return (
            <div className="login-page">
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        label="Email"
                        type="text"
                        name="email"
                        onChange={this.handleChange}
                        value={email}
                    />
                    <TextField 
                        label="Пароль"
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                    />
                    <Button type="submit">Войти</Button>
                </form>
            </div>
        )
    }
}

//withRouter для this.props.location.state
export default withRouter(LoginPage) 