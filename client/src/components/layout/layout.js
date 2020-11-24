import React, { Component } from 'react'

import Header from '../header'
import ContactPopup from '../contact-popup';
import AuthPopup from '../auth-popup';
import Footer from '../footer';
import apiService from '../../services/api-service'
import Loader from '../loader';

export default class PublicLayout extends Component {
    state = {
        contactModalOpen: false,
        socials: [],
        error: false,
        loading: true
    }

    async componentDidMount(){
        try {
            const socials = await apiService.getSocials()
            
            this.setState({
                socials,
                loading: false,
                error: false
            })
        } catch (e){
            this.onError()
        }
    }

    onError(){
        this.setState({
            error: true,
            loading: false
        })
    }
    
    onContactClose(){
        this.setState({
            contactModalOpen: false
        });
    }

    getAppClassNames(){
        return `app app_theme-${this.props.theme.current}`
    }

    render(){
        const {socials} = this.state
        const {children, contactModalOpen} = this.props

        return  <div className={this.getAppClassNames()}>
            <Header />
            <main>
                {children}
            </main>
            <ContactPopup open={contactModalOpen} onClose={() => this.onContactClose()}/>
            <AuthPopup open={false}/>
            <Footer socials={socials}/>
        </div>
    }
}