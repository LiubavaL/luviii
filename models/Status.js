const {Schema, model} = require('mongoose')

const StatusSchema = Schema({
    name: {type: String, required: true}
})

module.exports = model('Status', StatusSchema)