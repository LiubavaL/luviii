const {Schema, model} = require('mongoose')
const config = require('config')
const imageDomain = config.get('s3.domain')

const SocialSchema = Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
    iconPath: {type: String, required: true},
    color: {type: String}
})

SocialSchema.virtual('icon')
.get(function(){
    return `${imageDomain}/${this.iconPath}`
})
.set(function(v){
    this.iconPath = v.replace(`${imageDomain}/`, '')
})

SocialSchema.set('toJSON', { getters: true })

module.exports = model('Social', SocialSchema)