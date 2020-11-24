import React, { Component } from 'react';

import Select from '../../select';
import Typography from '../../typography';

import './comic-single-page.scss';
import Comment from '../../comment';
import CommentInput from '../../comment-input';

export default class ComicPage extends Component {
    comments=[
        {
            avatar: 'https://c.disquscdn.com/uploads/users/7711/5545/avatar92.jpg?1506742038',
            name: 'Dokidokibaka',
            text: 'Wowow... 💛🖤💛🖤💛🖤 I wonder how Alexei is going to handle this when he catches up with Ethan.',
            timestamp: 'a day ago',
            likes: 2,
            replies: [{
                // avatar: 'https://c.disquscdn.com/uploads/users/7711/5545/avatar92.jpg?1403065375',
                name: 'drwer',
                text: 'this when he catches up with Ethan',
                timestamp: 'a day ago',
                likes: 0,
                replies: [{
                    avatar: 'https://c.disquscdn.com/uploads/users/11110/9131/avatar92.jpg?1403065375',
                    name: 'lillopop',
                    text: 'Oh YES!',
                    timestamp: '2 days ago',
                    likes: 2,
                }]
            }]
        },
        {
            avatar: 'https://c.disquscdn.com/uploads/users/11110/9131/avatar92.jpg?1403065375',
            name: 'nonu',
            text: 'Oh, another thing. I\'m also worried about what will/can happen to Phobos and Deimos when they leave here. Deimos may not be aware of how much danger he is in right now, just for walking along with Phobos. For the new info that he also knows now.',
            timestamp: '3 days ago',
            likes: 1,
            isMine: true,
            isLiked: true
        },
        {
            avatar: 'https://c.disquscdn.com/uploads/users/7711/5545/avatar92.jpg?1506742038',
            name: 'nonu',
            text: 'I just know that in the end things will end good for Abel and Cain because dayum Abel is the protagonist... he\'ll get out of this fine. Though I guess Cain will have to suffer a little now.',
            timestamp: 'a week ago',
            likes: 30,
            isMine: true,
        },
        {
            avatar: 'https://c.disquscdn.com/uploads/users/7711/5545/avatar92.jpg?1506742038',
            name: 'nonu',
            text: 'I jusn becausegh I guess ',
            timestamp: 'a week ago',
            likes: 2,
            highlighted: true,
        },
    ];


    renderComments(comments){
        const commentsToRender = comments.map(({replies, ...commentData}) => {

            if(replies){
                const repliesToRender = this.renderComments(replies);

                return <li>
                        <Comment {...commentData}/>
                        <div className="comic-page__comment-thread">
                            {repliesToRender}
                        </div>
                    </li>;
            }

            return <li><Comment {...commentData}/></li>;
        });

        return commentsToRender;
    }

    render(){
        // const chapters = [
        //     {
        //         label: 'Часть 01. Сентябрь',
        //         value: '1'
        //     },
        //     {
        //         label: 'Часть 02. Сентябрь. Продолжение истории 2',
        //         value: '2'
        //     },
        //     {
        //         label: 'Часть 03. Откябрь',
        //         value: '3'
        //     },
        //     {
        //         label: 'Часть 04. Откябрь 2',
        //         value: '4'
        //     },
        //     {
        //         label: 'Экстра',
        //         value: '5'
        //     }
        // ],
        const chapters = [
            {
                label: 'Часть 1',
                options: [
                    {
                        label: 'Часть 01. Сентябрь',
                        value: '1'
                    },
                    {
                        label: 'Часть 02. Сентябрь. Продолжение истории 2',
                        value: '2'
                    }
                ]
            }, 
            {
                label: 'Часть 2',
                options: [
                    {
                        label: 'Часть 03. Откябрь',
                        value: '3'
                    },
                    {
                        label: 'Часть 04. Откябрь 2',
                        value: '4'
                    },
                    {
                        label: 'Экстра',
                        value: '5'
                    }
                ]
            }
        ],
        pages=[1, 2, 3, 4, 5, 6, 7];

        return (
            <div className="comic-page">
                <div className="comic-page__filter">
                    <div className="comic-page__col">
                        <div className="comic-page__chapter">
                            <Select
                                label="Глава"
                                defaultValue={2}
                                options={chapters}
                            />
                        </div>
                    </div>
                    <div className="comic-page__col">
                        <div className="comic-page__title">
                            <Typography use="headline1">Меня больше нет</Typography>
                        </div>
                    </div>
                    <div className="comic-page__col">
                        <div className="comic-page__page">
                            <Select
                                label="Стр."
                                defaultValue={2}
                                options={pages}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="comic-page__image">
                    <img src="/images/comic_page.png" />
                </div>
                <div className="comic-page__comments">
                    <div className="comic-page__comments-title">
                        <Typography use="headline3">Reactions</Typography>
                    </div>
                    <div className="comic-page__comments-tree">
                        <ul className="comic-page__comments-list">
                            {this.renderComments(this.comments)}
                        </ul>
                        <div className="comic-page__comment-input">
                            <CommentInput />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
