import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'

//вполне возможно, этот компонент не нужен
const NoAuthRoute = ({component: Component, ...rest}) => {
    console.log('NoAuthRoute➢')
    
    return <AuthContext.Consumer>{({token, from}) => 
            {
                console.log('NoAuthRoute➢ token ', token)
                console.log('NoAuthRoute➢ from ', from)

                return <Route 
                {...rest}
                render={() => token ? <Redirect to={from ? from : "/admin"} /> : <Component />}
            />}
    }</AuthContext.Consumer>
}

export default NoAuthRoute