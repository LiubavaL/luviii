const {Schema, model, Types} = require('mongoose')
const config = require('config')
const imageDomain = config.get('s3.domain')

const PostSchema = Schema({
    title: String,
    text: String,
    imagesPaths: [],
    author: {type: Types.ObjectId, ref: 'User'},
    views: {type: Number, default: 0}
}, {timestamps: true})

PostSchema.virtual('images')
.get(function () {
    return this.imagesPaths.map(image => `${imageDomain}/${image}`);
})
.set(function (v) {
    console.log('PostSchema set images', v)
    this.imagesPaths = v.map(vImage => vImage.replace(`${imageDomain}/`,  ''))
})

PostSchema.set('toJSON', { getters: true })



module.exports = model("Post", PostSchema)