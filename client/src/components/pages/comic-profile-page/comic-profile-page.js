import React, { Component } from 'react';
import Typography from '../../typography';
import Button from '../../button';
import {Dialog, DialogActions, DialogTitle, DialogContent, DialogButton} from '../../dialog';
import IconButton from '../../icon-button';
import Chapter from '../../chapter';
import TextField from '../../text-field';
import Link from '../../link';
import DummyApiService from '../../../services/dummy-api-service';
import ErrorIndicator from '../../error-indicator';
import Loader from '../../loader';
import {List, ListItem} from '../../list';
import TabBar from '../../tab-bar';
import ComicSubscribePopup from '../../comic-subscribe-popup';

import './comic-profile-page.scss';

export default class ComicProfilePage extends Component {
    service = new DummyApiService();

    state = {
        subscribeModalOpen: false,
        adultWarningModalOpen: false,
        chapters: {
            reversed: false,
            list: null,
            loading: true,
            error: false
        }
    }

    componentDidMount(){
        this.service.getChapters()
        .then((chapters) => {
            this.onChaptersFetched(chapters);
        })
        .catch(this.onError);
    }

    onChaptersFetched(list){
        this.setState({
            chapters:{
                ...this.state.chapters,
                loading: false,
                list
            }
        });
    }

    onError(e){
        this.setState({
            chapters: {
                ...this.state.chapters,
                error: true,
                loading: false
            }
        })
    }

    onSubscribeClick = () => {
        this.setState({
            subscribeModalOpen: true
        });
    }

    onSubscribeClose = () => {
        this.setState({
            subscribeModalOpen: false
        });
    }

    onStartReadingClick = () => {
        this.setState({
            adultWarningModalOpen: true
        });
    }

    onStartReadingClose = () => {
        this.setState({
            adultWarningModalOpen: false
        });
    }

    renderGenres(genres){
        const genresToRender = genres.map((genre, i) => {
            const isLast = i == genres.length - 1,
                comma = isLast ? '' : ', ';

            return `${genre}${comma}`;
        });

        return <Typography use="subtitle1" weight='light'>{genresToRender}</Typography>;
    }

    reverseChapterList = () => {
        this.setState((state) => {
            console.log('reverseChapterList state.chapters', state.chapters);

            return {
                chapters: {
                    ...state.chapters,
                    reversed: !state.chapters.reversed
                }
            }
        });
    }

    renderChapterList(chapters){
        let chaptersToRender = chapters.map(({title, id, date, cover, isNew}) => {
            return <li>
                <Chapter 
                    title={title}
                    index={id}
                    date={date}
                    cover={cover}
                    isNew={isNew}
                />
            </li>;
        });

        return <ul className="comic__list">{chaptersToRender}</ul>;
    }


    render(){
        const coverUrl = 'images/cover.png',
            genres = ['Drama', 'School', 'Psychology', 'Yaoi'],
            {subscribeModalOpen, chapters: {list, reversed, erorr : chapterError, loading: chaptersLoading}, adultWarningModalOpen} = this.state;

        let chaptersToRender = null;

        if(chapterError){
            chaptersToRender = <ErrorIndicator />;
        } else if(chaptersLoading) {
            chaptersToRender = <Loader />;
        } else if(list){
            chaptersToRender= this.renderChapterList(list);
            
            if(reversed){
                chaptersToRender.reverse();
            }
        }
        
        return (
            <div className="comic">
                <div className="comic__cover" style={{background: `url(${coverUrl}) center / cover`}}></div>
                <div className="comic__body">
                    <div className="comic__description">
                        <div className="comic__about">
                            <Typography use="headline1">Меня Больше Нет</Typography>
                            <div className="comic__status">
                                <Typography icon="whatshot" use="headline4" theme="accent">Ongoing</Typography>
                            </div>
                            <div className="comic__meta">
                                <span className="comic__genres">
                                    {this.renderGenres(genres)}
                                </span>
                                <span className="comic__separator"></span>
                                <span className="comic__adult-warning">18+</span>
                            </div>
                            <div className="comic__brief">
                                <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis feugiat. Sed vulputate fringilla felis. Aliquam ut arcu et dui feugiat scelerisque eu quis diam. Mauris placerat congue dui sit amet blandit. Phasellus condimentum libero vel velit auctor, sit amet tincidunt velit varius.</Typography>
                            </div>
                        </div>
                        <div className="comic__actions">
                            <div className="comic__start-read">
                                <Button tag="a" onClick={() => this.onStartReadingClick()} raised unelevated withRipple fullWidth>Start reading</Button>
                            </div>
                            <div className="comic__subscribe">
                                <Button icon="mail_outline" onClick={() => this.onSubscribeClick()} outlined withRipple fullWidth>Subscribe</Button>
                            </div>
                        </div>
                    </div>
                    <div className="comic__chapters">
                        <div className="comic__heading">
                            <Typography use="headline3">Chapters</Typography>
                            <IconButton onClick={this.reverseChapterList} icon="swap_vert" size="l" withRipple/>
                        </div>
                        {chaptersToRender}
                    </div>
                </div>
                <ComicSubscribePopup 
                    open={subscribeModalOpen} 
                    onClosed={() => this.onSubscribeClose()}
                />
                <Dialog
                    open={adultWarningModalOpen}
                    onClosed={() => this.onStartReadingClose()}
                    noClose
                >
                    {/* <div className="mdn-dialog__headline"> */}
                    <DialogTitle>
                        <Typography use="headline3" icon="" accented centered>Warning</Typography>
                    </DialogTitle>
                    {/* </div> */}
                    <DialogContent>
                        <Typography>This comic contains content intended for individuals 18/21 years of age or older as determined by the local and national laws of the region in which you reside.  By entering this website, you agree that you are at least 18 years of age or older. You will not redistribute this material to anyone, nor will you permit any minor to view this material.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button to="/chapter/1" raised>Continue reading</Button>
                        <DialogButton action="close" outlined>Exit</DialogButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}