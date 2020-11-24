const {Schema, model, Types} = require('mongoose')

const CommentSchema = Schema({
    author: {type: Types.ObjectId, ref: 'User', required},
    text: {type: String, required}
}, {timestamps: true})

module.exports = model('Comment', CommentSchema)