const {Router} = require('express')
const router = new Router()
const Social = require('../models/Social')
const withAuth = require('../middlewares/auth.middleware')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../singletons/S3')
const FileHelper = require('../helpers/FileHelper')
const config = require('config')
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
            const filename = Date.now().toString()
            const ext = FileHelper.retrieveExtension(file.originalname)

            cb(null, `${filename}${ext}`)
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
    })
})

router.get('/', withAuth, async(req, res) => {
    try {
        const socials = await Social.find()

        return res.json({socials})
    } catch(e){
        res.status(500).json({e: e.message})
    }
})

router.post('/add', [withAuth, upload.single('icon')], async(req, res) => {
    try {
        const {name, url, color} = req.body
        const icon = req.file.location
        const social = new Social({name, url, icon, color})
        
        await social.save()

        res.status(201).json({social})
    } catch(e){
        res.status(500).json({e: e.message})
    }
})

router.post('/edit', [withAuth, upload.single('icon')], async(req, res) => {
    try {
        const {_id, name, url, color} = req.body
        const file = req.file
        const icon = file ? file.location : null
        const social = await Social.findById(_id)

        social.name = name
        social.url = url
        social.color = color

        console.log('social edit try delete icon', social.iconPath)
        
        if(icon){
            const param = {
                Bucket: bucket,
                Key: social.iconPath
            }
            const data = await s3.deleteObject(param).promise()
            console.log('social edit delete icon data = ', data)
            social.icon = icon
        }

        await social.save()

        return res.status(200).json({social})
    } catch(e){
        res.status(500).json({e: e.message})
    }
})

router.post('/delete', withAuth, async(req, res) => {
    try {
        const {ids} = req.body
        const query = Social.find({_id: ids})
        const socials = await query

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

        for (const social of socials){
            params.Delete.Objects.push({
                Key: social.iconPath
            })
        }

        const s3Result = await s3.deleteObjects(params).promise()
        /*
            data = {
            Deleted: [
            {
            Key: "HappyFace.jpg", 
            VersionId: "yoz3HB.ZhCS_tKVEmIOr7qYyyAaZSKVd"
            }, 
            {
            Key: "HappyFace.jpg", 
            VersionId: "2LWg7lQLnY41.maGB5Z6SWW.dcq0vx7b"
            }
            ]
        }
        */
       if(s3Result.Deleted.length === params.Delete.Objects.length){
           await Social.deleteMany(query)

           return res.json({ids})
       }
       throw new Error("Failed to delete images")
    } catch(e){
        res.status(500).json({e: e.message})
    }
})

module.exports = router