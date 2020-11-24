import React, { Component } from 'react'

import {default as AdminNav} from '../nav'
import {DrawerAppContent} from '../../drawer'

import './layout.scss'

export default class AdminLayout extends Component {
    render(){
        const {children} = this.props

        return <div className="admin">
            <AdminNav />
            <DrawerAppContent>
                {children}
            </DrawerAppContent>
        </div>
    }
}