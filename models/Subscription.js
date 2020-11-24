const {Schema, model} = require('mongoose')

const SubscriptionSchema = Schema({
    email: {type: String, required},
    name: {type: String, required},
})

module.exports = model('Subscription', SubscriptionSchema)