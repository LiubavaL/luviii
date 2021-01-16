import React, { Component } from 'react'

import {search} from '../utils'

const withSearch = (Wrapped) => {
    return class extends Component {
        static displayName = `withSearch(${Wrapped.displayName || Wrapped.name || 'Component'})`

        state = {
            searchText: null
        }

        onSearch = (searchText) => {
            this.setState({
                searchText
            })
        }

        render(){
            const {searchText} = this.state

            return <Wrapped 
                searchText={searchText}
                search={search}
                onSearch={this.onSearch}
                {...this.props}
            />
        }
    }
}

export default withSearch