import React, { Component } from 'react'

import theme from '../../themes'
import routes from '../../routes'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {ThemeContextProvider} from '../../contexts/ThemeContext'
import withAuthSync from '../hoc/withAuthSync'
import ErrorBoundry from '../error-boundary/error-boundary'

import './app.scss'

class App extends Component {
    constructor(props){
        super(props);

        const onToggle = () => {
            this.setState((prevState) => ({
                theme: {
                    ...prevState.theme,
                    current: prevState.theme.current == theme.dark ? theme.light : theme.dark,
                }
            }));
        };

        this.state = {
            theme: {
                current: theme.light,
                onToggle: onToggle
            }
            // user: {
            //     id: null
            // }
        };
    }

    componentDidMount(){
        console.log('App componentDidMount👍')
    }

    componentDidUpdate(){
        console.log('App componentDidMount👍')
    }


    renderRoutes(routes){
        const {theme} = this.state
        const isAuthenticated = !!this.props.token
        console.log('renderRoutes...')

        
        const routesToRender = routes.map(route => {
            const paths = []
            
            let subRoutesToRender = route.subRoutes.map(subRoute => {
                paths.push(subRoute.path)

                if(route.routeElement){
                    return <route.routeElement {...subRoute} isAuthenticated={isAuthenticated}/>
                }
                
                return <Route {...subRoute}/>
            })


            // if(route.routeElement){
            //     subRoutesToRender = <route.routeElement>{subRoutesToRender}</route.routeElement>
            // }
            
            if(route.layout){
                return  <Route exact={route.subRoutes.map(subRoute => subRoute.exact)} path={paths}>
                            <route.layout theme={theme}>
                                <ErrorBoundry>{subRoutesToRender}</ErrorBoundry>
                            </route.layout>
                        </Route>
            }

            return subRoutesToRender
        })

        return <Switch>
            {routesToRender}
            <Redirect to="/404" />
        </Switch>
    }


    render() {
        const {theme} = this.state;
        
        return (
            <Router>
                <ThemeContextProvider value={theme}>
                    {this.renderRoutes(routes)}
                </ThemeContextProvider>
            </Router>
        );
    }
}
export default withAuthSync(App)