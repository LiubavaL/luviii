import React, { Component } from 'react';

import './grid.scss';

export class Grid extends Component {
    itemsCount = 0;
    loadedItems = 0;

    componentDidMount(){
        this.itemsCount = this.getItemsLength();
        console.log('componentDidMount itemsCount = ', this.itemsCount);

        window.addEventListener('resize', this.resizeItems);
    }

    componentDidUpdate(prevProps){
        //по занрузке и отрисовке постов
        if(prevProps.items !== this.props.items){
            console.log('componentDidUpdate resize items');
            // this.resizeItems();
            this.itemsCount = this.getItemsLength();
        }
        console.log('componentDidUpdate itemsCount = ', this.itemsCount);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.resizeItems);
    }

    renderItems(items) {
        const renderedItems = items.map((item, i) => {
            //TODO сделать так, чтобы количесвто ресайзов сократилось до одного после полной загрузки всех детей
            return <GridItem key={i}>{item}</GridItem>;
        });

        return renderedItems;
    }

    addLoadHandler(items){
        const itemsWithLoadHandler = items.map(item => {
            return React.cloneElement(item, {
                onGridItemLoad: () => {this.checkForResize();}
            });
        });

        return itemsWithLoadHandler;
    }

    checkForResize(){
        //картинка уже загрузилась, поэтому сразу ставим +1
        ++this.loadedItems;
        
        if(this.loadedItems == this.itemsCount && this.itemsCount) {
            this.resizeItems();
        } 
    }

    getItemsLength(){
        const {children, items} = this.props;

        if(children){
            return children.length;
        } else if(items){
            return items.length
        } else return 0;
    }

    resizeItem(item){
        console.log('----resizeGrid-----');
        const grid = document.getElementsByClassName('grid')[0];
        console.log('grid: ', grid);

        const gridStyles = window.getComputedStyle(grid);

        const rowSize = parseInt(gridStyles.getPropertyValue('grid-auto-rows'));

        const rowGap = parseInt(gridStyles.getPropertyValue('grid-gap'));
        console.log('rowGap: ', rowGap);

        // const itemHeight = item.querySelector('.mdc-card').getBoundingClientRect().height;
        const itemHeight = item.children[0].getBoundingClientRect().height;
        console.log('itemHeight: ', itemHeight);

        const rowSpan = Math.ceil((itemHeight + rowGap) / (rowSize + rowGap));
        console.log('rowSpan: ', itemHeight / rowSize, rowSpan);

        item.setAttribute('style', `grid-row-end: span ${rowSpan}`);
    }

    resizeItems = () => {
        console.log('---resizeGrid---');

        const grid = document.getElementsByClassName('grid__item');

        for(let item of grid){
            console.log('item', item);
            this.resizeItem(item);
        }
    }

    render(){
        const {children, items, colMin = "300px"} = this.props;
        const itemsToRender = children || this.renderItems(items);
        const gridStyle = {gridTemplateColumns: `repeat(auto-fill, minmax(${colMin}, 1fr))`};

        return (
            <div className="grid" style={gridStyle}>
                {this.addLoadHandler(itemsToRender)}
            </div>
        );
    }
}

export const GridItem = ({children, ...rest}) => {
    return (
        <div className="grid__item">
            {React.Children.map(children, 
                (child) => React.cloneElement(child, {...rest})
            )}
        </div>
    );
}
