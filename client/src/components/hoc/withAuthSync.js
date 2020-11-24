import React, { Component } from 'react'

import Loader from '../loader'
import {AuthContext} from '../../contexts/AuthContext'
import apiService from '../../services/api-service'

/*
задача withAuthSync - при первой загрузке страницы определять, 
была ли у юзера уже создана сессия раньше. 
Для этого проверяем наличие cookie "refresh_token" и пользователя, у когорого этот токен прописан в базе.
Если пользователь сущесвтует, генерируем для него jwtToken и jwtToken_expiry
*/

const withAuthSync = (Wrapped) => {
    return class extends Component {
        static displayName = `withAuthSync(${Wrapped.displayName || Wrapped.name || 'Component'})`
        interval = null
        intervalTime = 10000 // milliseconds

        state = {
            jwtToken: undefined,
            jwtExpiresAt: undefined,
            from: null
        }

        // constructor(){
        //     console.log(' withAuthSync constructor')
        // }

        async componentDidMount(){
            console.log('withAuthSync componentDidMount👍')
           
            if(!!this.state.jwtToken){// jwtToken задан, запускаем через setInterval функцию, проверяющуб, нужно ли обновить jwtToken каждые 10 минут
                console.log('withAuthSync componentDidMount👍 token exist, call setRefreshInterval (эта щняша не должна по идее вызываться)')

                this.setRefreshInterval()
            } else {// jwtToken не задан, пробуем узнать, был ли юзер залогинен и есть ли у него refresh-token
                console.log('withAuthSync token not exist, try auth....')
                const res = await this.auth()
            }
           
            window.addEventListener('storage', this.syncLogout)
        }

        async componentDidUpdate(){
            console.log('withAuthSync componentDidUpdate')

            if(this.state.jwtToken && this.interval === null){// jwtToken задан, запускаем через setInterval функцию, проверяющуб, нужно ли обновить jwtToken каждые 10 минут
                this.setRefreshInterval()
                // каждын 10 минут
            } 
        }

        setRefreshInterval(){
            this.interval = setInterval(async () => {
                const now = (new Date()).getTime()
                if(this.state.jwtExpiresAt <= (now + this.intervalTime)){//если следующий тик будет по дате дальше. чем jwtExpiresAt
                    await this.auth()
                }
            }, this.intervalTime)
            // каждын 10 минут
        }
        
        componentWillUnmount(){
            clearInterval(this.interval)
            window.removeEventListener('storage', this.syncLogout)
        }

        syncLogout(event){
            if(event.key === 'logout'){
                console.log('withAuthSync logged out from storage! Redirect to login page...', event)
            }
        }
    
        // public methods
        login = async(email, password, from = null) => {
            const {jwtToken, jwtExpiresAt} = await apiService.login({email, password})
            this.setState({
                jwtToken, 
                jwtExpiresAt,
                from
            })
        }
            
        logout = async() => {
            const {jwtToken, jwtExpiresAt} = await apiService.logout()
            this.setState({jwtToken, jwtExpiresAt})
            // to support logging out from all windows
            window.localStorage.setItem('logout', Date.now())
            clearInterval(this.interval)
            this.interval = null
        }
    
        auth = async () => {
            const {jwtToken, jwtExpiresAt} = await apiService.refreshToken()

            console.log('auth',  {jwtToken, jwtExpiresAt})
           
            this.setState({jwtToken, jwtExpiresAt})
        }

        register = async (name, email, password) => {
            const {jwtToken, jwtExpiresAt} = await apiService.register({name, email, password})

            this.setState({jwtToken, jwtExpiresAt})
        }

        // getToken(){
        //     return this.jwtToken
        // }
    
        // getExpiry(){
        //     return this.jwtToken_expiry
        // }
    
        getHeader(){
            return {"Authorization": `Bearer ${this.state.jwtToken}`}
        }

        render(){
            const {jwtToken, from} = this.state

            if(jwtToken === undefined){
                console.log('withAuthSync return Loader')
                return <Loader />
            }
            console.log('withAuthSync return Wrapper, token = ', jwtToken)

            return <AuthContext.Provider 
                    value={{
                        token: jwtToken,
                        from,
                        login: this.login,
                        auth: this.auth,
                        register: this.register,
                        logout: this.logout
                    }}>
                    <Wrapped token={jwtToken}/>
                </AuthContext.Provider>
        }
    }
}

export default withAuthSync