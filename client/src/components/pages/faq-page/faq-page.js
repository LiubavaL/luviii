import React, { Component } from 'react';
import Typography from '../../typography';
import ApiService from '../../../services/api-service';
import ErrorIndicator from '../../error-indicator';
import Spoiler from '../../spoiler';
import Loader from '../../loader';
import Button from '../../button';

import './faq-page.scss';

export default class FaqPage extends Component {
    service = new ApiService();

    state = {
        error: false,
        loading: true,
        faqs: []
    }

    async componentDidMount(){
        try {
            const faqs = await this.service.getFaqs()
            this.setState({
                faqs,
                loading: false,
                error: false
            })
        } catch (e){
            this.onError()
        }
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderFaqs(faqs){
        const faqsToRender = faqs.map(({_id, answerMarkup, question}) => {
            return (
                <li className="faq__spoiler" key={_id}>
                    <Spoiler heading={question} body={<span dangerouslySetInnerHTML={{__html: answerMarkup}} /> } />
                </li>
            )
        })

        return <ul>{faqsToRender}</ul>;
    }

    render(){
        const {faqs, loading, error} = this.state

        if(error){
            return <ErrorIndicator />
        }

        if(loading){
            return <Loader />;
        }

        return (
            <div className="faq">
                <div className="faq__heading">
                    <Typography use="headline1">FREQUENTLY ASKED faqs</Typography>
                </div>
                <div className="faq__brief">
                    <Typography>Here are some of the answers to the frequently asked faqs about my art. If you have any faqs about your order from my online shop, please refer to the Shop FAQ. If you have a question that's not answered here, please Contact me.</Typography>
                </div>
                {this.renderFaqs(faqs)}
                <div className="faq__title">
                    <Typography use="headline6">Didn't find question you wanted?</Typography>
                </div>
                <div className="faq__btn">
                    <Button outlined>Ask a question</Button>
                </div>
            </div>
        );
    }
}