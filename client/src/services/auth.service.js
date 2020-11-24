import { Route } from "react-router-dom"

class AuthService {
    jwt_token = null
    jwt_token_expiry = null

    constructor(){
        console.log(' AuthService constructor')
    }

    async login({email, password}){
        console.log('authService login start')
        const res = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if(res.status === 200){

            const {jwt_token, jwt_expires_at} = await res.json()
            this.setData(jwt_token, jwt_expires_at)

            console.log('authService login result ', this.jwt_token, this.jwt_token_expiry)
        }

        return this.jwt_token //еще пересмотреть, что тут нужно передавать
    }

    // async refreshToken(){
    //     const res = await fetch('/api/auth/refresh-token')

    //     if(res.status === 200){
    //         const {jwt_token, jwt_expires_at} = await res.json()
    //         this.setData(jwt_token, jwt_expires_at)
    //     }
    // }

    async auth(){
        try {
            // this.logout()
                            
            const res = await fetch('/api/auth/refresh-token', {
                method: "POST"
            })

            if(res.status === 200){
                const {jwt_token, jwt_expires_at} = await res.json()
                this.setData(jwt_token, jwt_expires_at)
                return {jwt_token, jwt_expires_at}
            }

            return null
        } catch(e){
                
        }
    }


    setData(jwt_token, jwt_expires_at){
        this.jwt_token = jwt_token
        this.jwt_token_expiry = jwt_expires_at
    }

    async logout(){
        //удаляем refresh_token cookie
        const res = await fetch('/api/auth/logout', 
            {
                method: "POST",
                headers: this.getHeader()
            }
        )

        if(res.status === 200){
            this.setData(null, null)
            window.localStorage.setItem('logout', Date.now())
        }
         // to support logging out from all windows
        // this.jwt_token = null
        // this.jwt_token_expiry = null

        // Route.push('/admin/login')
    }

    getToken(){
        return this.jwt_token
    }


    getExpiry(){
        return this.jwt_token_expiry
    }

    getHeader(){
        return {"Authorization": `Bearer ${this.getToken()}`}
    }

    async register(name, email, password){
        const res = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })

        if(res.status === 200){
            const body = await res.json()
            this.jwt_token = body.jwt_token
            this.jwt_token_expiry = body.jwt_expires_at
        }

        return this.jwt_token//еще пересмотреть, что тут нужно передавать
    }
}

export default new AuthService()