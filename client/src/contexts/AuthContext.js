import {createContext} from 'react'

const AuthContext = createContext({
    token: null,
    login: function(){},
    auth: function(){},
    register: function(){},
    logout:function(){}
})

AuthContext.displayName = 'AuthContext'

export {AuthContext}
