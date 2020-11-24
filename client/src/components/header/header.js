import React, { Component } from 'react';

import Logo from '../logo';

import {Drawer, DrawerContent} from '../drawer';
import Button from '../button';
import Search from '../search';
import Mode from '../mode';
import {ThemeContextConsumer} from '../../contexts/ThemeContext';
import {ListDivider, List, ListItem} from '../list';
import Link from '../link';
import IconButton from '../icon-button';
import Select from '../select';

import './header.scss';

export default class Header extends Component {
    links = [
        {title: 'Illustrations', href: '/illustrations'},
        {title: 'Comic', href: '/comic'},
        // {title: 'Comissions', href: '/comissions'},
        // {title: 'About', href: '/about'},
        {title: 'FAQ', href: '/faq'},
        {title: 'Login', href: '/login'},
        {title: 'Admin', href: '/admin'},
        // {title: 'Shop', href: '/shop'}
    ]

    state = {
        sticky: false,
        hidden:false,
        drawerOpen: false,
        searchOpen: false,
        mode: 'day', // ['day', 'night'],
        menuOpen: false
    }

    constructor(props){
        super(props);

        this.header = React.createRef();
    }

    componentDidMount(){
        const refreshDelta = 150;

        window.onscroll = () => {
            //если скролл больше размера header
            if(window.pageYOffset >= this.header.current.offsetHeight){
                if(!this.state.sticky){
                    this.setState({
                        sticky: true
                    });
                    this.scrollStart = window.pageYOffset;
                }
                this.scrollEnd = window.pageYOffset;
                this.scrollDelta = this.scrollEnd - this.scrollStart;

                // console.log('hidden = ', this.state.hidden);
                // console.log('delta = ', this.scrollDelta);
                // console.log('scrollStart = ', this.scrollStart);

                //проверка при скролле вниз
                if(!this.state.hidden && this.scrollDelta > refreshDelta){
                    this.setState({
                        hidden: true
                    });
                }

                //проверка при скролле вверх
                if(this.state.hidden && this.scrollDelta < -refreshDelta){
                    this.setState({
                        hidden: false
                    });
                }

                //обновляем максимумы/минимумы, от которых идет отсчет
                if(this.state.hidden && this.scrollStart < window.pageYOffset
                    || !this.state.hidden && this.scrollStart > window.pageYOffset) {
                    this.scrollStart = window.pageYOffset;
                }
            } else {//если скролл меньше размера header
                const translate = Math.ceil(window.pageYOffset/1.5);

                this.header.current.style.transform = `translateY(${translate}px)`;

                if(this.state.sticky){
                    this.setState({
                        sticky: false
                    });
                }
            }
        }
    }

    componentWillUnmount(){
        window.onscroll = null
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevState.searchOpen && this.state.searchOpen){
            this.searchInput.focus();
        }
    }

    onMenuClick = () => {
        this.setState({
            drawerOpen: true
        });
    }

    closeDrawer = () => {
        this.setState({
            drawerOpen: false
        });
    }

    onSearchClick = (e) => {
        e.preventDefault();
        this.setState({
            searchOpen: true
        });
    }

    onSearchBlur = () => {
        this.setState({
            searchOpen: false,
            menuOpen: false
        });
    }
    
    onSearchInput = () => {
        this.setState({
            menuOpen: true
        });
    }

    renderLinks(links){
        return links.map(({title, href}) => {
            return (<li className="header__link"><Link 
                to={href}
                aria-current="page" 
                // tabIndex={!index ? 0 : undefined}
                type="header-nav"
            >
                {title}
            </Link></li>);
        });
    }

    //TODO отрефакторить получение ссылок, сейчас тут дублирование кода
    renderDrawerLinks(links){
        const linksToRender = links.map(({title, href}, index) => {
            const activated = index == 0;
            const accentuated = index == links.length - 1;
            let separator = null;

            if(index == links.length - 1){
                separator = <ListDivider inline />;
            }

            return <React.Fragment>
                <ListItem 
                    activated={activated}
                    withRipple
                >
                    <Link 
                        to={href}
                        aria-current="page" 
                        // tabIndex={!index ? 0 : undefined}
                        type="header-nav"
                        accentuated={accentuated}
                        onClick={() => this.setState({drawerOpen: false})} 
                    >
                        {title}
                    </Link>
                </ListItem>
                {separator}
            </React.Fragment>;
        });

        return linksToRender;
    }

    getClassNames(){
        const {sticky, hidden} = this.state;

        return `header
            ${sticky ? ' header--sticky' : ''}
            ${hidden ? ' header--hidden' : ''}
        `;
    }

    render(){
        const {drawerOpen, searchOpen, menuOpen, sticky} = this.state,
            size = sticky ? 's': 'm';

        return (
            <React.Fragment>
                <header className={this.getClassNames()} ref={this.header}>
                    <div className="header__inner">
                        <div className='header__logo-wrapper'>
                            <Link to='/' className='header__logo'>
                                <Logo size={size}/>
                            </Link>
                        </div>
                        <ul className="header__nav">
                            {this.renderLinks(this.links)}
                        </ul>
                        <div className="header__search">
                                <Search 
                                open={searchOpen}
                                onClick={this.onSearchClick} 
                                onBlur={this.onSearchBlur} 
                                onKeyDown = {this.onSearchInput}
                                menuOpen={menuOpen}
                                refInput={input => this.searchInput = input}/>
                        </div>
                        <div className="header__right-panel">
                            <div className="header__lang">
                                <Select 
                                    options={['En', 'Рус']}
                                    defaultValue={0}
                                    // icon="language"
                                    simple
                                />
                            </div>
                            <div href="#" className='header__mode'>
                                <Mode 
                                    size={size}
                                    centered
                                />
                            </div>
                        </div>
                        <div href="#" className='header__drawer-btn'>
                            <Button onClick={() => this.onMenuClick()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="7" viewBox="0 0 16 7">
                                    <path d="M15.222 5.385c.43 0 .778.361.778.807 0 .446-.348.808-.778.808H4.852c-.43 0-.778-.362-.778-.808 0-.446.348-.807.778-.807h10.37zM14.957 0C15.533 0 16 .362 16 .808c0 .446-.467.807-1.043.807H1.043C.467 1.615 0 1.254 0 .808 0 .362.467 0 1.043 0h13.914z"/>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </header>
                <Drawer 
                    open={drawerOpen} 
                    onClosed={() => this.closeDrawer()}
                    isModal
                >
                    <DrawerContent>
                        <div className="mdc-drawer__close">
                            <IconButton icon="close" onClick={() => this.closeDrawer()}/>
                        </div>
                        <div className="mdc-drawer__search">
                            <Search open={true} withIcon/>
                        </div>
                        {/* //TODO класс с модификатором задавать явно в className или передавать через проп? */}
                        <List className="mdc-list--type-menu" tag="nav">
                        {/* <ul className="header__nav"> */}
                            {this.renderDrawerLinks(this.links)}
                            <ListItem withRipple>
                                {/* <div className='mdc-drawer__mode'> */}
                                    <Mode />
                                {/* </div> */}
                            </ListItem>
                        {/* </ul> */}
                        </List>
                    </DrawerContent>
                </Drawer>
            </React.Fragment>
        );
    }
}