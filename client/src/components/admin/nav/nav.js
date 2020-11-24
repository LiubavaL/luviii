import React, { Component } from 'react'

import {
    Drawer,
    DrawerContent
} from '../../drawer'
import {
    List,
    ListItem,
    ListDivider,
    ListGroupSubheader,
    ListGroup
} from '../../list'
import Link from '../../link'
import {AuthContext} from '../../../contexts/AuthContext'

export default class Nav extends Component {
    static contextType = AuthContext

    componentDidMount(){
        console.log('----AdminLayout mounted!-----')
    }

    handleLogout = () => {
        this.context.logout()
    }

    render(){
        return  <Drawer>
                    <DrawerContent>
                        <ListGroup>
                            <List>
                                <ListItem withRipple><Link to="/admin">Start</Link></ListItem>
                                <ListItem withRipple><Link to="/admin/posts">Posts</Link></ListItem>
                            </List>
                            <ListDivider inner="false"/>
                            <ListGroupSubheader>Comics</ListGroupSubheader>
                            <List className="mdc-list--type-menu" tag="nav">
                                <ListItem withRipple>
                                    <Link to="/admin/comics">List</Link>
                                </ListItem>
                                <ListItem withRipple>
                                    <Link to="/admin/comic/statuses">Statuses</Link>
                                </ListItem>
                                <ListItem withRipple>
                                    <Link to="/admin/comic/genres">Genres</Link>
                                </ListItem>
                            </List>
                            <ListDivider inner="false"/>
                            <List className="mdc-list--type-menu" tag="nav">
                                <ListItem withRipple><Link to="/admin/tags">Tags</Link></ListItem>
                                <ListItem withRipple><Link to="/admin/social">Social</Link></ListItem>
                                <ListItem withRipple><Link to="/admin/faq">FAQ</Link></ListItem>
                                <ListItem withRipple><Link to="/admin/subscriptions">Subscriptions</Link></ListItem>

                                <ListItem withRipple><Link to="/login" onClick={this.handleLogout}>Log Out</Link></ListItem>
                            </List>
                        </ListGroup>
                    </DrawerContent>
                </Drawer>
    }
}