import React, { Component } from 'react';

import TextField from '../../text-field';
import Loader from '../../loader';
import ErrorIndicator from '../../error-indicator';
import Card from '../../card';
import {Grid, GridItem} from '../../grid';

import DummyApiService from '../../../services/dummy-api-service';

import './search-page.scss';

export default class SearchPage extends Component {
    service = new DummyApiService();

    state = {
        loading: false,
        error: false,
        posts: null
    }

    renderPosts(items){
        return items.map(({id, title, text, imgs, views, date}) => {
            return <Card 
                key={id}
                title={title} 
                text={text} 
                imgs={imgs} 
                views={views} 
                date={date}
                // onClick={e => this.onCardClick(id, e)}
                // onImgLoaded={() => this.onImgLoaded(id)} 
                // onImgError={() => this.onImgError(id)} 
            />;
        });
    }


    renderPostsGrid(posts){
        const postsToRender = posts.map((post) => {
            return <GridItem>{post}</GridItem>;
        });

    return <Grid colMin="200px" >{postsToRender}</Grid>;
    }

    handleSearch = () => {
        this.setState({
            loading: true
        });

        this.service.getPosts()
            .then(posts => {
                this.setState({
                    posts,
                    loading: false,
                    error: false
                });
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    error: true
                });
            });
    }

    render(){
        const {loading, error, posts} = this.state;
        let resultToRender = null;

        if(loading){
            resultToRender =  <Loader />;
        }

        if(error) {
            resultToRender =  <ErrorIndicator />;
        }

        if(posts){
            resultToRender = this.renderPostsGrid(this.renderPosts(posts));
        }

        return (
            <div className="search-result">
                <div className="search-result__textfield">
                    <TextField 
                        onChange={this.handleSearch}
                        placeholder="Search post..."
                        icon="search"
                        outlined
                    />
                </div>
                <div className="search-result__body">
                    {resultToRender}
                </div>
            </div>
        );
    }
}