const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get('secret')

const withAuth = function(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1]//Baerer token

        if(!token){
            return res.status(401).json({message: 'auth middleware: Unauthorized: No token provided'})
        }

        const {email} = jwt.verify(token, secret)
        req.email = email
        next()
    } catch (e) {
        // res.redirect('/api/auth/logout')
        // res
        // .clearCookie(tokenCookieName)
        // .clearCookie('userId')
        res.status(401).json({message: 'auth middleware: Invalid token'})
    }
}

module.exports = withAuth