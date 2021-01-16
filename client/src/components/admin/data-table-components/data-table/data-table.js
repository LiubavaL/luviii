import React, { Component } from 'react'

import Checkbox from '../../../checkbox'
import Typography from '../../../typography'
import Select from '../../../select'
import TextField from '../../../text-field'
import Row from '../row'
import TableHeadData from '../table-head-data'
import TableHead from '../table-head'
import TableBody from '../table-body'
import {sort} from './utils'
import withSearch from '../data-table/hoc/withSearch'
import withPagination from '../data-table/hoc/withPagination'
import {MDCDataTable} from '@material/data-table'

import './data-table.scss'

class DataTable extends Component {
    mdcComponent = null

    state = {
        sort: {//поле, по которому осуз. сортировка
            field: this.props.defaultSortField ? this.props.defaultSortField : null,
            order: "ascending"
        },
    }

    headDefaults = {
        // width: '5%',
        sortable: false
    }

    constructor(props){
        super(props)
        this.dataTable = React.createRef()
    }

    /* 
    Данные, отправленные через props
    data = [
            {id: 1, name: "Some name here", description: "sdfsd sdfsdf", created_at: "09-07-19"},
            {id: 2, name: "HEre is ndfdf dfdf", description: "sdf NJkjn KJN sdfsdf", created_at: "02-05-20"},
            {id: 3, name: "dfDsdfsdf name here", description: "Dsdfsd sdsd sdfsdf", created_at: "20-07-20"}
        ]

    Список ключей для заголовка таблицы, передается через props
    config = [
        {
            field: "name",
            name: "Column Name",
            sortable: true,
            component: <Component />,
            width: "10%",
            asInner: true 
        }
    ]
    */

    componentDidMount(){        
        this.mdcComponent = new MDCDataTable(this.dataTable.current)
        this.mdcComponent.listen('MDCDataTable:sorted', (e) => {
            this.onSort(e.detail)
        })
        this.mdcComponent.listen('MDCDataTable:rowSelectionChanged', (e) => {
            if(typeof this.props.onSelect === 'function'){
                this.props.onSelect(e.detail)
            }
        })
        this.mdcComponent.listen('MDCDataTable:selectedAll', (e) => {
            console.log('selectedAll')
            this.onSelectAll(true)
        })
        this.mdcComponent.listen('MDCDataTable:unselectedAll', (e) => {
            console.log('unselectedAll')
            this.onSelectAll(false)
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data){
            this.mdcComponent.layout()
        }
    }

    getWidth(key){
        const {config} = this.props
        const itemConfig = config.find(({field}) => field === key)
        
        return !!itemConfig ? itemConfig.width : null
    }

    prepareDataForRow(dataItem){
        const {config} = this.props

        return config.map(({field, asInner}) => {
            return {
                data: dataItem[field],
                width: this.getWidth(field),
                asInner: !!asInner
            }
        })
    }

    isAllSelected(propData, selectedData){
        if(!propData || !propData.length){
            return false
        }
        
        let allSelected = true
        
        for(let {_id} of propData) {
            if(selectedData.indexOf(_id) === -1) {
                allSelected = false
                break
            }
        }

        return allSelected
    }

    isSelected(id){
        const {selectedItems} = this.props

        return selectedItems.indexOf(id) !== -1
    }

    renderNoData() {
        return <tbody class="mdc-data-table__content"><Typography centered>Нет данных.</Typography></tbody>
    }

    renderBody(data){
        const {
            onEdit,
            onDelete,
            pagination: {
                range,
                active
            },
            searchText,
            search,
            paginate
        } = this.props

        if(!Array.isArray(data)) {
            return this.renderNoData()
        }

        const {
            sort: {
                field,
                order
            }
        } = this.state

        //сдедать deep copy ?
        let preparedData = data

        if(!!field){
            preparedData = sort(preparedData, field, order)
        }

        if(searchText){
            preparedData = search(preparedData, searchText)
        }

        if(!preparedData.length) {
            return this.renderNoData()
        }

        preparedData = paginate(preparedData, range)

        const bodyToRender = preparedData[active].map((item, i) => {
            const preparedRowData = this.prepareDataForRow(item)
            // const highlighted = Boolean(i%2)
            /**
             * preparedRowData = [
             *  {rowData, width},
             *  {rowData, width},
             *  {rowData, width},
             * ]
             */
            return <Row 
                id={item._id} 
                data={preparedRowData} 
                onEdit={() => onEdit(item._id)}
                onDelete={() => onDelete(item._id)}
                selected={this.isSelected(item._id)}
            />
        })

        return <tbody class="mdc-data-table__content">{bodyToRender}</tbody>
    }

    renderHead(config){
        // const {field : sortedField, order} = this.state.sort
        const {sort: {field : sortedField, order}} = this.state
        const {selectedItems, data} = this.props
        const tableHeadToRender = config.map(({
            field,
            name, 
            sortable = this.headDefaults.sortable, 
            width
        }) => <TableHeadData 
                label={name}
                sortable={sortable}
                width={width}
                columnId={field}
                sort={(sortable && field === sortedField) ? order : null}
            />
        )
        const allSelected = this.isAllSelected(data, selectedItems)

        return (
            <thead>
                  <tr class="mdc-data-table__header-row">
                    <TableHeadData withCheckbox>
                        {/* <Checkbox 
                            onChange={e => this.onSelectAll(e.target.checked)}
                            checked={allSelected}
                            aria-label="Toggle all rows"
                            headerRow
                        /> */}
                        <div class="mdc-checkbox mdc-data-table__header-row-checkbox">
                            <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Toggle all rows"/>
                            <div class="mdc-checkbox__background">
                                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                                </svg>
                                <div class="mdc-checkbox__mixedmark"></div>
                            </div>
                            <div class="mdc-checkbox__ripple"></div>
                        </div>
                    </TableHeadData>
                    {tableHeadToRender}
                    <TableHeadData>Действия</TableHeadData>
                  </tr>
            </thead>
        )
    }

    onSort = ({columnId: field, sortValue: order}) => {
        // const {field, order} = this.state.sort
        // const newOrder = (newField === field) ? (order === 'desc' ? 'asc' : 'desc') : 'asc'

        this.setState({
            sort: {
                field,
                order
            }
        })
    }

    // onSelect = (details) => {
    //     if(typeof this.props.onSelect === 'function'){
    //         this.props.onSelect(details)
    //     }
    // }

    onSelectAll = (enabled) => {
        if(typeof this.props.onSelect === 'function'){
            const selected = enabled ? this.props.data.map(({_id}) => _id) : []
            this.props.onSelect(selected)
        }
    }

    onSearch = (e) => {
        this.props.onSearch(e.target.value)
    }

    onChangeRange = (e) => {
        this.props.onChangeRange({
            range: +e.detail.value,
            active: 0
        })
    }

    onChangeActiveRange(active){
        this.props.onChangeActiveRange(active)
    }

    renderPaginationNav = (data, range, active) => {
        if(!Array.isArray(data)){
            return null
        }

        const {paginate} = this.props
        const paginatedData = paginate(data, range)
        const total = data.length
        const from = active*range + 1, to = (total > range * (active + 1)) ? range * (active + 1) : total
        const prevDisabled = active === 0
        const nextDisabled = active === paginatedData.length - 1
        // const navButtons = paginatedData.map((v, i) => {
        //     const label = i + 1

        //     if(i === active){
        //         return <span>{label}</span>
        //     }

        //     return <button onClick={() => this.onChangeActiveRange(i)}>{label}</button>
        // })

        return  (
        <div class="mdc-data-table__pagination">
            <div class="mdc-data-table__pagination-trailing">
                <div class="mdc-data-table__pagination-rows-per-page">
                    <div class="mdc-data-table__pagination-rows-per-page-label">
                    Rows per page
                    </div>

                    <div class="mdc-select mdc-select--outlined mdc-select--no-label mdc-data-table__pagination-rows-per-page-select">
                    <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
                            aria-labelledby="demo-pagination-select" tabindex="0">
                        <span class="mdc-select__selected-text-container">
                        <span id="demo-pagination-select" class="mdc-select__selected-text">10</span>
                        </span>
                        <span class="mdc-select__dropdown-icon">
                        <svg
                            class="mdc-select__dropdown-icon-graphic"
                            viewBox="7 10 10 5">
                            <polygon
                                class="mdc-select__dropdown-icon-inactive"
                                stroke="none"
                                fill-rule="evenodd"
                                points="7 10 12 15 17 10">
                            </polygon>
                            <polygon
                                class="mdc-select__dropdown-icon-active"
                                stroke="none"
                                fill-rule="evenodd"
                                points="7 15 12 10 17 15">
                            </polygon>
                        </svg>
                        </span>
                        <span class="mdc-notched-outline mdc-notched-outline--notched">
                        <span class="mdc-notched-outline__leading"></span>
                        <span class="mdc-notched-outline__trailing"></span>
                        </span>
                    </div>

                    <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth" role="listbox">
                        <ul class="mdc-list">
                        <li class="mdc-list-item mdc-list-item--selected" aria-selected="true" role="option" data-value="10">
                            <span class="mdc-list-item__text">10</span>
                        </li>
                        <li class="mdc-list-item" role="option" data-value="25">
                            <span class="mdc-list-item__text">25</span>
                        </li>
                        <li class="mdc-list-item" role="option" data-value="100">
                            <span class="mdc-list-item__text">100</span>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>

                <div class="mdc-data-table__pagination-navigation">
                    <div class="mdc-data-table__pagination-total">
                    {from} - {to} из {total}
                    </div>
                    <button 
                        class="mdc-icon-button material-icons mdc-data-table__pagination-button" 
                        data-first-page="true"
                        disabled={prevDisabled}
                        onClick={() => this.onChangeActiveRange(0)}
                    >
                    <div class="mdc-button__icon">first_page</div>
                    </button>
                    <button 
                        class="mdc-icon-button material-icons mdc-data-table__pagination-button" 
                        data-prev-page="true" 
                        disabled={prevDisabled}
                        onClick={this.props.onClickPrev}>
                        <div class="mdc-button__icon">chevron_left</div>
                    </button>
                    <button 
                        class="mdc-icon-button material-icons mdc-data-table__pagination-button" 
                        data-next-page="true"
                        disabled={nextDisabled}
                        onClick={this.props.onClickNext}>
                        <div class="mdc-button__icon">chevron_right</div>
                    </button>
                    <button 
                        class="mdc-icon-button material-icons mdc-data-table__pagination-button" 
                        data-last-page="true"
                        disabled={nextDisabled}
                        onClick={() => this.onChangeActiveRange(paginatedData.length - 1)}
                    >
                    <div class="mdc-button__icon">last_page</div>
                    </button>
                </div>
            </div>
        </div>
        )
        
        // <div className="data-table__actions">
        //     <Typography>Отображено {from} - {to} из {total} записей</Typography>
        //     <div className="data-table__pag-nav">
        //         <button 
        //             disabled={prevDisabled}
        //             onClick={this.props.onClickPrev}>
        //                 Prev
        //         </button>
        //             {navButtons}
        //         <button
        //             disabled={nextDisabled}
        //             onClick={this.props.onClickNext}>
        //                 Next
        //         </button>
        //     </div>
        // </div>
    }

    renderProgressIndicator = () => {
        return (
            <div class="mdc-data-table__progress-indicator">
                <div class="mdc-data-table__scrim"></div>
                <div class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-data-table__linear-progress" role="progressbar" aria-label="Data is being loaded...">
                    <div class="mdc-linear-progress__buffer">
                        <div class="mdc-linear-progress__buffer-bar"></div>
                        <div class="mdc-linear-progress__buffer-dots"></div>
                    </div>
                    <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                        <span class="mdc-linear-progress__bar-inner"></span>
                    </div>
                    <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                        <span class="mdc-linear-progress__bar-inner"></span>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        const {
            data,
            config,
            searchText,
            pagination: {
                range,
                active
            },
            ranges,
            defaultRange
        } = this.props

        return ( 
          <div className="mdc-data-table" ref={this.dataTable}>
            <div className="mdc-data-table__table-container">
                <div className="data-table__search">
                    <Typography>Поиск</Typography>
                    <TextField
                        placeholder="some details"
                        onChange={this.onSearch}
                        value={searchText}
                        outlined
                    />
                </div>
                <table className="mdc-data-table__table" aria-label="Dessert calories">
                    {this.renderHead(config)}
                    {this.renderBody(data)}
                </table>
            </div>
            {this.renderPaginationNav(data, range, active)}
            {this.renderProgressIndicator()}
        </div>
        )
    }
}

export default withSearch(withPagination(DataTable))

