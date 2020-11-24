const {Schema, model} = require('mongoose')

const FaqSchema = Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true}
})

const Faq = model("Faq", FaqSchema)

module.exports = Faq