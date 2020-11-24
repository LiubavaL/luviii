const {Router} = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const { v4 : uuidv4 } = require('uuid')

const User = require('../models/User')
const router = Router()
const withAuth = require('../middlewares/auth.middleware')

const secret = config.get('secret')
const JWT_EXPIRES_IN = config.get('JWT_EXPIRES_IN') //minutes
const JWT_REFRESH_EXPIRES_IN = config.get('JWT_REFRESH_EXPIRES_IN') //minutes
const refreshCookieName = "refresh_token"

const generateCredentialsForUser = (user, secret, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN) =>{
    const now = (new Date()).getTime()
    const jwtToken = jwt.sign({ email: user.email }, secret, { expiresIn: `${JWT_EXPIRES_IN}m` })//5секунд
    const jwtExpiry = JWT_EXPIRES_IN * 60 * 1000 //milliseconds
    const refreshTokenExpiresAt = JWT_REFRESH_EXPIRES_IN * 60 * 1000 //milliseconds
    const jwtExpiresAt = (new Date()).setTime(now + jwtExpiry) //active for 60 minutes
    const refreshToken = uuidv4()

    return {refreshToken, refreshTokenExpiresAt, jwtToken, jwtExpiresAt}
}

router.post('/register', async (req, res) => {
    try {
        const {email, password, name} = req.body
        const {refreshToken, refreshTokenExpiresAt, jwtToken, jwtExpiresAt} = generateCredentialsForUser({email}, secret, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN)
        const user = new User({email, password, name, refresh_token: refreshToken})
        
        await user.save()

        res
            .status(204)
            .cookie(refreshCookieName, newRefreshToken, {httpOnly: true, maxAge: refreshTokenExpiresAt})
            .json({jwtToken, jwtExpiresAt})
    } catch (e){
        res.status(500).json({message: e.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!!user){
            const match = await user.isCorrectPassword(password)
    
            if(match) {
                const {refreshToken:newRefreshToken, refreshTokenExpiresAt, jwtToken, jwtExpiresAt} = generateCredentialsForUser(user, secret, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN)
                
                user.refresh_token = newRefreshToken
                await user.save()
    
                return res
                    .cookie(refreshCookieName, newRefreshToken, {httpOnly: true, maxAge: refreshTokenExpiresAt})
                    .json({jwtToken, jwtExpiresAt})
            }
        }

        res.status(401).json({message: 'Email or password is incorrect'})
    } catch (e){
        res.status(500).json({message: e.message})
    }
})

router.post('/refresh-token',  async (req, res) => {
    try {
        // const {email} = req.body
        const {refresh_token} = req.cookies

        if(refresh_token){
            const user = await User.findOne({refresh_token})
            //если пользователь с таким токеном существует, то создаем jwt token
            if(user){
                const {refreshToken:newRefreshToken, refreshTokenExpiresAt, jwtToken, jwtExpiresAt} = generateCredentialsForUser(user, secret, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN)

                user.refresh_token = newRefreshToken
                await user.save()
                
                return res
                    .cookie(refreshCookieName, newRefreshToken, {httpOnly: true, maxAge: refreshTokenExpiresAt})
                    .json({jwtToken, jwtExpiresAt})
            }
            return res.status(401).json({message: 'refresh-token: user with sent token doesn\'t exist'})
        }
        res.status(401).json({message: 'refresh-token:  token doesn\'t exist'})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

router.post('/logout', withAuth, (req, res) => {
    res
        .clearCookie(refreshCookieName)
        .sendStatus(200)
})

module.exports = router