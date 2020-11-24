const {Schema, model, Types} = require('mongoose')
const config = require('config')
const imageDomain = config.get('s3.domain')

const getCover = function () {
    console.log("\x1b[32m", 'getCover: this.coverPath=',this.coverPath)
    console.log("\x1b[32m", 'getCover is undefined', typeof this.coverPath === 'undefined', this.coverPath === undefined)

    if(this.coverPath === undefined) {
        console.log("\x1b[32m", 'getCover: return null')

        return null
    }

    return `${imageDomain}/${this.coverPath}`
}

const setCover = function (v) {
    console.log("\x1b[32m", 'setCover: virtual & this.coverPath=', v, typeof v === "string", v === null)
    console.log("\x1b[32m", 'setCover is undefined', typeof this.coverPath === 'undefined', this.coverPath === undefined)
    if(v === null){
        console.log("\x1b[32m", '--setCover set null')

        this.coverPath = null
    } else {
        console.log("\x1b[32m", '--setCover set name')

        this.coverPath = v.replace(`${imageDomain}/`,  '')
    }
}

function withVirtualCover(schema) {
    schema.virtual('cover')
    .get(getCover)
    .set(setCover)

    schema.set('toJSON', { getters: true })
    
    return schema
}

const PageSchema = Schema({
    uriShort: String,
    comments: [{type: Types.ObjectId, ref: 'Comment'}],
    sequence: {type: Number, default: 0}
})

PageSchema.virtual('uri')
.get(function(){
    return `${imageDomain}/${this.uriShort}`
})
.set(function(v){
    this.uriShort = v.replace(`${imageDomain}/`, '')
})

PageSchema.set('toJSON', { getters: true })

const ChapterSchema = Schema({
    sequence: {type: Number, default: 0},
    title: String,
    description: String,
    coverPath: String,
    pages: {type: [PageSchema], required: true}
}, {timestamps: true})


const VolumeSchema = Schema({
    sequence: {type: Number, default: 0},
    title: String,
    description: String,
    coverPath: String,
    chapters: [withVirtualCover(ChapterSchema)]
}, {timestamps: true})


const ComicSchema = Schema({
    author: {type: Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    description: {type: String, required: true},
    coverPath: {type: String, default: undefined},
    isMature: {type: Boolean, default: false},
    genres: [{type: Types.ObjectId, ref: 'Genre'}],
    status: {type: Types.ObjectId, ref: 'Status'},
    // volumes: {type: Boolean, default: false}
    volumes: [withVirtualCover(VolumeSchema)]
}, {timestamps: true})


module.exports = model('Comic', withVirtualCover(ComicSchema))