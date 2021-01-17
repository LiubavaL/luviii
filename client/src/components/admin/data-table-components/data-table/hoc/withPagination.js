import React, { Component } from 'react'

import {paginate} from '../utils'

const withPagination = (Wrapped) => {
    return class extends Component {
        ranges = [3, 5, 10, 50]
        // defaultRange = 0

        state = {
            pagination: {
                rangeIndex: 0,
                activeChunk: 0// activeChunk chunk
            }
        }

        onChangeRange = ({rangeIndex, activeChunk}) => {
            this.setState({
                pagination: {
                    ...this.state.pagination,
                    rangeIndex,
                    activeChunk
                }
            })
        }

        onChangeActiveRange = (activeChunk) => {
            this.setState({
                pagination: {
                    ...this.state.pagination,
                    activeChunk
                }
            })
        }

        onClickNext = () => {
            const {pagination} = this.state

            this.setState({
                pagination: {
                    ...pagination,
                    activeChunk: pagination.activeChunk + 1
                }
            })
        }

        onClickPrev = () => {
            const {pagination} = this.state

            this.setState({
                pagination: {
                    ...pagination,
                    activeChunk: pagination.activeChunk - 1
                } 
            })
        }

        render() {
            const {pagination} = this.state

            return <Wrapped 
                ranges={this.ranges}
                // defaultRange={this.defaultRange}
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