const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10


const UserSchema = new mongoose.Schema({
    name: {type: String, requred: true, default: () => {
        return `user${new Date().getTime()}`
    }},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: '/public/avatar-default.png'},
    status: {type: String, default: 'user'},
    refresh_token: {type: String}
})

UserSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next()
    }

    //пароль либо новый, либо изменен страый
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
        if(err){
            return next(err)
        }
        this.password = hashedPassword
        return next()
    })
})

UserSchema.methods.isCorrectPassword = async function(password) {
    console.log('isCorrectPassword password=', password, this.password)
    const match = await bcrypt.compare(password, this.password)


    return match
}

module.exports = mongoose.model('User', UserSchema)