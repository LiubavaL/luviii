import React, { Component } from 'react'

import {paginate} from '../utils'

const withPagination = (Wrapped) => {
    return class extends Component {
        ranges = [3, 5, 10, 50]
        defaultRange = 0

        state = {
            pagination: {
                range: 3,
                active: 0
            }
        }

        onChangeRange = ({range, active}) => {
            this.setState({
                pagination: {
                    ...this.state.pagination,
                    range,
                    active
                }
            })
        }

        onChangeActiveRange = (active) => {
            this.setState({
                pagination: {
                    ...this.state.pagination,
                    active
                }
            })
        }

        onClickNext = () => {
            const {pagination} = this.state

            this.setState({
                pagination: {
                    ...pagination,
                    active: pagination.active + 1
                }
            })
        }

        onClickPrev = () => {
            const {pagination} = this.state

            this.setState({
                pagination: {
                    ...pagination,
                    active: pagination.active - 1
                } 
            })
        }

        render() {
            const {pagination} = this.state

            return <Wrapped 
                ranges={this.ranges}
                defaultRange={this.defaultRange}
                paginate={paginate}
                pagination={pagination}
                onChangeRange={this.onChangeRange}
                onChangeActiveRange={this.onChangeActiveRange}
                onClickNext={this.onClickNext}
                onClickPrev={this.onClickPrev}
                {...this.props}
            />
        }
    }
}

export default withPagination