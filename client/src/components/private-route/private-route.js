import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log('PrivateRoute➢')
    return <AuthContext.Consumer>{({token}) => 
        <Route 
            {...rest} 
            render={({location}) => token ? <Component /> :<Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }}/>
            }
        />
    }
    </AuthContext.Consumer>
}

export default PrivateRoute