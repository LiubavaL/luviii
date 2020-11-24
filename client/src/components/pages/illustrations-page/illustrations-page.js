import React, {Component} from 'react';

import Card from '../../card';
import apiService from '../../../services/api-service';
import ErrorIndicator from '../../error-indicator';
import Loader from '../../loader';
import {Dialog, DialogContent} from '../../dialog';
import Carousel from 'react-bootstrap/Carousel'; 
import SharePopup from '../../share-popup';
import {Grid, GridItem} from '../../grid';

import './illustrations-page.scss';

export default class Illustrations extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        postModalOpen: false,
        shareModalOpen: false,
        loading: true,
        error: false
    }

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCardClick = (id, e) => {
         const target = e.target,
            tergetIsCarouselArrow = target.classList.contains('carousel-control-next') || target.classList.contains('carousel-control-next-icon');

         if(id > 0 && !tergetIsCarouselArrow){
             this.setState({
                postModalOpen: true,
                selectedPostId: id
             });
         }
    }

    setModalOpen = (modalPrefix, isOpen) => {
        console.log('setModalOpen ', modalPrefix, isOpen);
        this.setState({
            [`${modalPrefix}ModalOpen`]: isOpen
        });
    }

    async componentDidMount() {
        try {
            const posts = await apiService.getPosts()
    
            this.setState({
                posts,
                loading: false,
                error: false
            });
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

    handleSelect = (selectedIndex) => {
        this.setState({
            selectedPostId: this.state.posts[selectedIndex].id
        });
    }

    renderPost({id, title, textMarkup, images, views, date}){
        return <Card 
            key={id}
            title={title} 
            text={<span dangerouslySetInnerHTML={{__html: textMarkup}} />} 
            imgs={images} 
            views={views} 
            date={date}
            onClick={e => this.onCardClick(id, e)}
            // onImgLoaded={() => this.onImgLoaded(id)} 
            onImgError={() => this.onImgError(id)}
            onShareClick={() => this.setModalOpen('share', true)}
        />;
    }

    renderItem(item){
        return (
            <GridItem>
                {this.renderPost(item)}
            </GridItem>
        );
    }

    renderItems(posts) {
        if(!posts) return null

        const renderedPosts = posts.map((post) => {
            return this.renderItem(post);
        });

        return <Grid>{renderedPosts}</Grid>;
    }

    renderModalContent = () => {
        const {selectedPostId, posts } = this.state,
            activeIndex = this.getPostIndexById(selectedPostId);

        if(selectedPostId != null){
            const carouselItems = posts.map(post => {
                return (
                    <Carousel.Item>
                        {this.renderPost(post)}
                    </Carousel.Item>
                );
            });

            return (
                <React.Fragment>
                    <DialogContent>
                        <Carousel 
                            className="carousel_dialog"
                            onSelect={this.handleSelect}
                            activeIndex={activeIndex}
                            prevLabel="" 
                            nextLabel="" 
                            interval={null}
                            slide={false}
                            indicators={false}
                            controls={false}>
                                {carouselItems}
                        </Carousel>
                    </DialogContent>
                </React.Fragment>
            )
        }

        return null;
    }


    onImgError(postId) {
        const postIndex = this.getPostIndexById(postId);
        const post = document.getElementsByClassName('grid__item')[postIndex];
        const img = post.querySelector('img');
        if(img){
            console.error('Error occured while loading image with postId='+postId)
            img.replaceWith('Error occured while loading image:(');
        }
    }

    

    getPostIndexById(postId){
        const postIndex = this.state.posts.findIndex(({id}) => id == postId);

        console.log('getPostIndexById', postId, postIndex);

        return postIndex;
    }


    handlePrevClick = () => {
        let prevIndex = this.getPostIndexById(this.state.selectedPostId);
        if(prevIndex){
            prevIndex--;

            this.setState((prevState) => ({
                selectedPostId: prevState.posts[prevIndex].id
            }));
        }
    }

    handleNextClick = () => {
        let nextIndex = this.getPostIndexById(this.state.selectedPostId),
            postsLength = this.state.posts.length;

        if(nextIndex < postsLength - 1){
            nextIndex++;

            this.setState((prevState) => ({
                selectedPostId: prevState.posts[nextIndex].id
            }));
        }
    }

    renderModalCarouselControls(){
        return (
            <div className="mdc-dialog__controls">
                <button className="mdc-dialog__control mdc-dialog__control_left" onClick={this.handlePrevClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12">
                        <path d="M6.28 1.28c.293-.293.293-.767 0-1.06-.293-.293-.767-.293-1.06 0l-5 5c-.293.293-.293.767 0 1.06l5 5c.293.293.767.293 1.06 0 .293-.293.293-.767 0-1.06L1.81 5.75l4.47-4.47z"/>
                    </svg>
                </button>
                <button className="mdc-dialog__control mdc-dialog__control_right" onClick={this.handleNextClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12">
                        <path d="M.72 10.22c-.293.293-.293.767 0 1.06.293.293.767.293 1.06 0l5-5c.293-.293.293-.767 0-1.06l-5-5c-.293-.293-.767-.293-1.06 0-.293.293-.293.767 0 1.06l4.47 4.47-4.47 4.47z"/>
                    </svg>
                </button>
            </div>
        );
    }

    render () {
        const {
            error, 
            loading, 
            posts, 
            postModalOpen, 
            shareModalOpen
        } = this.state;

        if(error) {
            return <ErrorIndicator />;
        }

        if(loading) {
            return <Loader />;
        }

        return (
            <div className="posts">
                {this.renderItems(posts)}
                
                <Dialog 
                    className="mdc-dialog--type_post"
                    open={postModalOpen} 
                    // onClosed={e => this.onClosed()} 
                    onClosed={e => this.setModalOpen('post', false)} 
                    rootChildren={this.renderModalCarouselControls()}
                    fullWidth
                >
                    {this.renderModalContent()}
                </Dialog>

                <SharePopup open={shareModalOpen} onClosed={() => this.setModalOpen('share', false)} />
            </div>
        );
    }
}