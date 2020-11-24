import React, { Component } from 'react'

export default class AdminPage extends Component {

    state = {
        message: ''
    }

    componentDidMount(){
        // fetch('/api/admin')
        // .then(res => res.text())
        // .then(res => this.setState({message: res}))
    }

    render() {
        return (
            <div className="admin-page">
                Welcome to admin page!
                <span>{this.state.message}</span>
            </div>
        )
    }
}