const {Router} = require('express')
const router = Router()
const Post = require('../models/Post')
const withAuth = require('../middlewares/auth.middleware')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../singletons/S3')
const config = require('config')
const FileHelper = require('../helpers/FileHelper')
const {nanoid} = require('nanoid')

const bucket = config.get('s3.bucketName')
const postBucket = `${bucket}/images`


const upload = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: postBucket,
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname})
        },
        key: (req, file, cb) => {
            const filename = nanoid()
            const ext = FileHelper.retrieveExtension(file.originalname)

            cb(null, `${filename}${ext}`)
        }
    })
})


//fetch all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        // console.log('get all posts', posts)
        res.json({posts})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

//add new post
router.post('/add', [withAuth, upload.array('images[]')], async (req, res) => {
    try {
        const {title, text} = req.body
        const images = req.files.map(file => file.location)

        console.log('req.files', req.files)

        const post = new Post({
            title,
            text,
            images,
            author: req.userId
        })
        await post.save()
        console.log('Post : ', post)
        console.log('Post IMages : ', post.images)


        res.status(201).json({post})
    } catch (e){
        res.status(500).json({message: e.message})
    }
})

//get post by id
// router.get('/:id', (req, res) => {

// })

// // edit post
router.post('/edit', [withAuth, upload.array('images')], async (req, res) => {
    try {
        const {_id, title, text, imagesToDelete = []} = req.body
        //newly added images
        const images = req.files ? req.files.map(file => file.location) : []
        const post = await Post.findById( _id )
        // images to delete
        const imagesPathToDelete = post.imagesPaths.filter((image, i) => imagesToDelete.includes(i.toString()))
        
        const imagesToInclude = post.images.filter((image, i) => !imagesToDelete.includes(i.toString()))
        console.log('Edit: post ', post)
        console.log('Edit: imagesToDelete ', imagesToDelete)
        console.log('Edit: imagesPathToDelete ', imagesPathToDelete)
        console.log('Edit: imagesToInclude ', imagesToInclude)
        
        post.title = title
        post.text = text
        post.images = [...imagesToInclude, ...images]
        await post.save()
        
        if(imagesPathToDelete.length){
            const objsToDelete = imagesPathToDelete.map(image => new Object({Key: image}))
            const params = {
                Bucket: bucket, 
                Delete: {
                    Objects: objsToDelete, 
                    Quiet: false
                }
            }
            console.log('Edit: objsToDelete ', objsToDelete)
            
            const data = await s3.deleteObjects(params).promise()
            console.log('Edit: delete result ', data)
        }
        
        res.json({post})
    } catch (e){
        res.status(500).json({message: e.message})
    }
})

//delete post
router.post('/delete', withAuth, async (req, res) => {
    try {
        const {ids} = req.body
        const query = Post.find({_id: ids})
        let params = {
            Bucket: bucket, 
            Delete: {
                Objects: [
            //     {
            //    Key: "HappyFace.jpg", 
            //   }, 
            //     {
            //    Key: "HappyFace.jpg", 
            //   }
                ], 
                Quiet: false
            }
        };
        let s3Result = null
        let imagesForDeleteCount = 0

        for (const postToDelete of await query){
            if(postToDelete.imagesPaths.length){
                const objsToDelete = postToDelete.imagesPaths.map(image => new Object({Key: image}))

                params.Delete.Objects.push(...objsToDelete)
            }
        }
        imagesForDeleteCount = params.Delete.Objects.length

        if(imagesForDeleteCount){
            s3Result = await s3.deleteObjects(params).promise()
        }

        if(!imagesForDeleteCount || s3Result.Deleted.length === imagesForDeleteCount){
            const result = await Post.deleteMany(query)

            if(result.deletedCount === ids.length){
                res.status(200).json({ids})
            }

            throw new Error("Failed to delete selected posts")
        }

        throw new Error("Failed to delete selected posts images")
    } catch (e){
        res.status(500).json({message: e.message})
    }
})

// read
// router.get('/post/:id')
// //add
// router.post('/post')
// //update
// router.put('/post')
// //delete
// router.delete('/post')

module.exports = router