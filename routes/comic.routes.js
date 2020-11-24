const {Router} = require('express')
const router = Router()
const Comic = require('../models/Comic')
const withAuth = require('../middlewares/auth.middleware')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../singletons/S3')
const config = require('config')
const FileHelper = require('../helpers/FileHelper')
const Busboy = require('busboy')
const unzipper = require('unzipper')
const {nanoid} = require('nanoid')

const bucket = config.get('s3.bucketName')
const comicBucket = `${bucket}/comics`
const coversBucket = `${comicBucket}/covers`
const pagesBucket = `${comicBucket}/pages`

// const upload = multer({
//     storage: multerS3({
//         s3,
//         acl: 'public-read',
//         bucket: comicBucket,
//         metadata: (req, file, cb) => {
//             cb(null, {fieldName: file.fieldname})
//         },
//         key: (req, file, cb) => {
//             const filename = Date.now().toString()
//             const ext = FileHelper.retrieveExtension(file.originalname)

//             cb(null, `${filename}${ext}`)
//         }
//     })
// })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

let getUploadCoverParams = (Bucket, Key, ContentType, Body) => new Object({
    Bucket,
    Key,
    ACL: 'public-read',
    ContentType,
    Body
})

let getUploadPageParams = (Bucket, Key, Body) => new Object({
    Bucket,
    Key,
    ACL: 'public-read',
    Body
})

//fetch all comics
router.get('/', withAuth, async(req, res) => {
    try {    
        const comics = await Comic.find()
 
        res.json({comics})

    } catch(e){
        res.status(500).json({message: e.message})
    }
})

/*router.post('/add', [withAuth, upload.any()], async(req, res) => {
    try {
        const { title, description, isMature, genres, status, volumes} = req.body
        const cover = req.files.filter(file => file.fieldname === 'cover')[0].location
        console.log('FILES ADDED(req.files): ', req.files)
        console.log('VOLUMES: ', volumes)

        volumes.map((volume, volIndex) => {
            const volFieldName = `volumes[${volIndex}][cover]`,
                volCover =  req.files.filter(file => file.fieldname === volFieldName)[0]

            if(volCover){
                volume.cover = volCover.location
            }

            if(Array.isArray(volume.chapters)){
                volume.chapters.map((chapter, chIndex) => {
                    const chFieldName = `volumes[${volIndex}][chapters][${chIndex}][cover]`,
                        chCover = req.files.filter(file => file.fieldname === chFieldName)[0]
                        
                        console.log('chapter cover: ', chCover)
    
                    if(chCover){
                        chapter.cover = chCover.location
                    }
                })
            }
        })

        console.log('VOLUMES after preparation: ', volumes[0].chapters[2])


        let comic = new Comic({
            author: req.userId,
            title, 
            description, 
            cover, 
            isMature, 
            genres, 
            status,
            volumes
        })

        // fieldname: 'volumes[1][chapters][3][cover]',
        // fieldname: 'volumes[2][cover]'

        await comic.save()

        res.status(201).json({comic})
    }catch(e) {
        res.status(500).json({message: e.message})
    }
})*/

 //TODO вынести в отдельную функцию
 const flatFiles = (prev, current) => {
    if(!!current){

        if(Array.isArray(current)){
            return prev.concat(current.filter(v => v !== false))
        }
        return prev.concat(current)
    }

    return prev
}

const sortBySequence = (a, b) => {
    if(a.path < b.path) {
        return -1
    }

    if(a.path > b.path) {
        return 1
    }

    return 0
}

router.post('/add', [withAuth, upload.any()], async (req, res) => {
    try {
        const { title, description, isMature, genres, status, volumes} = req.body
        console.log('FILES req.files: ', req.files)
        console.log('------------VOLUMES: ', JSON.parse(JSON.stringify(volumes)))
        let promises = []

        promises = req.files.map(async({originalname, mimetype, buffer, fieldname}) => {
            // если картинка
            if(mimetype.includes('image')){
                const filename = `${nanoid()}${FileHelper.retrieveExtension(originalname)}`
                const fileData = await s3.upload(
                    getUploadCoverParams (
                        coversBucket, 
                        filename,
                        mimetype, 
                        buffer
                    )
                ).promise()

                console.log(`Cover with name "${originalname}" was sent to storage!`)
    
                return {fieldname, location : fileData.Location}
            } else if (mimetype === 'application/zip'){ // если архив
                const directory = await unzipper.Open.buffer(buffer);
                console.log(' ---------- directory originalname: ', originalname)
                //TODO сделать массивом, проверку на наличие этих имен вынести в отдельную функцию
                const ignoreNames = '__MACOSX'

                const filteredDir = directory.files.filter(file => !file.path.includes(ignoreNames))
                const sortedDir = filteredDir.sort(sortBySequence)

                return Promise.all(
                    sortedDir.map( async (archiveFile, index) => {
                        // console.log('directory archiveFile = ', archiveFile.path)

                        if(archiveFile.type === "File" && !archiveFile.path.includes(ignoreNames)){
                            console.log('archiveFile.path to upload = ', archiveFile.path, index)
                            const filename = `${nanoid()}${FileHelper.retrieveExtension(archiveFile.path)}`

                            const pageData = await s3.upload (
                                getUploadPageParams(
                                    pagesBucket, 
                                    filename,
                                    archiveFile.stream()
                                )).promise()

                            console.log("\x1b[33m", "Upload Success data: ", pageData, archiveFile.path, index);
                            return {fieldname, location : pageData.Location, sequence: index}
                        }

                        return false
                    })
                )
            }

            return false
        })
        console.log("\x1b[36m", '=====  promises', promises)
        
        const files = await Promise.all(promises)
        console.log("\x1b[32m", '---  ALL PROMISES DONE ---', files)

        const preparedFiles = files.reduce(flatFiles, [])
        console.log("\x1b[32m", 'preparedFiles:', preparedFiles)

        const cover = preparedFiles.find(file => file.fieldname === 'cover').location

        const preparedVolumes = volumes.map( (volume, volIndex) => {
            const volFieldName = `volumes[${volIndex}][cover]`,
                volCover = preparedFiles.find(file => file.fieldname === volFieldName)

            let vCover,
                chapters

            if(volCover){
                vCover = volCover.location
            }
                
            if(Array.isArray(volume.chapters)){
                chapters = volume.chapters.map( (chapter, chIndex) => {
                        const chFieldName = `volumes[${volIndex}][chapters][${chIndex}][cover]`,
                            pagesFieldName = `volumes[${volIndex}][chapters][${chIndex}][pages]`,
                            chCover = preparedFiles.find(file => file.fieldname === chFieldName)
                            chPages = preparedFiles.filter(file => file.fieldname === pagesFieldName)

                        if(chCover){
                            chapter.cover = chCover.location
                        }

                        if(Array.isArray(chPages)){
                            chapter.pages = chPages.map(({location, sequence}) => new Object({uri: location, sequence, comments: []}))
                        }

                        return {...chapter}
                    })
            }

            return {...volume, cover : vCover, chapters}
        })

        console.log('------------VOLUMES after preparation: ', preparedVolumes)

        let comic = new Comic({
                author: req.userId,
                title, 
                description, 
                cover, 
                isMature, 
                genres, 
                status,
                volumes: preparedVolumes
        })

        await comic.save()

        res.status(201).json({comic})
    }catch(e) {
        res.status(500).json({message: e.message})
    }
})

/*router.post('/add', withAuth, (req, res) => {
    try {
        const busboy = new Busboy({headers: req.headers})
        let files = [], fields = []
        console.log('add comic...')

        busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
            let bytes = []
            
            console.log(`File [${fieldname}]: filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`)
            
            file.on('data', function(data) {
                bytes.push(data)
                console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });

            file.on('end', function() {
                files.push({fieldname, filename, encoding, mimetype, buffer: Buffer.concat(bytes)})
                console.log('File [' + fieldname + '] Finished')
            });
        })
        
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log(`Field [${fieldname}]: fieldnameTruncated: ${fieldnameTruncated}: valTruncated: ${valTruncated} : value: ${val}`)
            fields.push({fieldname, value: val})
        })

        busboy.on('finish', async() => {
            console.log('Done parsing form!', fields, req.body)

            files.map(async ({fieldname, filename, mimetype, buffer}) => {
                console.log('file fieldname: ', fieldname)
                console.log('file mimetype: ', mimetype)
                if(mimetype.includes('image')){
                    uploadParams.Key = `${Date.now().toString()}${FileHelper.retrieveExtension(filename)}`
                    uploadParams.ACL = 'public-read'
                    uploadParams.Body = buffer
                    uploadParams.ContentType = mimetype
        
                    s3.upload (uploadParams, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } 
                         if (data) {
                        console.log("Upload Success", data);
                         return {fieldname, location: data.location}
                        }
                    })
                } else if (mimetype === 'application/zip'){
                    const directory = await unzipper.Open.buffer(buffer);
                    //TODO сделать массивом, проверку на наличие этих имен вынести в отдельную функцию
                    const ignoreNames = '__MACOSX'
                    const pages = []
                    let index = 0

                    console.log('directory', directory);
                    directory.files.find((file) => {
                        if(file.type === "File" && !file.path.includes(ignoreNames)){
                            console.log('file.path = ', file.path)

                            s3.upload (
                                {
                                    Bucket: pagesBucket,
                                    Key: `${Date.now().toString()}${FileHelper.retrieveExtension(file.path)}`,
                                    ACL: 'public-read',
                                    //ContentType: mimetype,
                                    Body: file.stream()
                                }, 
                                function (err, data) {
                                    let sequence = index

                                    if (err) {
                                        console.log("Error", err);
                                    } if (data) {
                                        console.log("Upload Success index: ", index);
                                        console.log("Upload Success data: ", data);
                                        pages.push({sequence, key: data.key})
                                            console.log("pages: ", pages);
                                    }
                                })

                                index++
                        }
                    })
                }
            })

            res.status(201).json({status: 'ok'})
        })
        req.pipe(busboy)
    }catch(e) {
        res.status(500).json({message: e.message})
    }
})*/

router.post('/edit', [withAuth, upload.any()], async(req, res) => {
    try {
        console.log("\x1b[47m", '----START EDIT-----', "\x1b[0m")
        const {_id, title, description, isMature, genres, status, coverPath} = req.body
        // const files = req.files
        let {volumes} = req.body
        // let imagesToDelete = []
        let imagesToDelete = new Proxy([], {
            set(target, prop, val){
                if(typeof val === "object" && val.hasOwnProperty('Key') && typeof val.Key !== 'undefined'){
                    target[prop] = val
                    return true;
                }

                return true;
            }
        })
        const comic = await Comic.findById(_id)
        let {cover} = comic
        console.log("\x1b[4m", 'comic = ', comic, "\x1b[0m")
        console.log("\x1b[4m", 'files = ', req.files, "\x1b[0m")

        let promises = []

        promises = req.files.map(async({originalname, mimetype, buffer, fieldname}) => {
            // если картинка
            if(mimetype.includes('image')){
                const filename = `${nanoid()}${FileHelper.retrieveExtension(originalname)}`
                const fileData = await s3.upload(
                    getUploadCoverParams(
                        coversBucket,
                        filename,
                        mimetype,
                        buffer
                )).promise()

                console.log(`Image with name "${originalname}" was sent to storage!`)
                return {fieldname, location : fileData.Location}
            } else if (mimetype === 'application/zip'){ // если архив
                const directory = await unzipper.Open.buffer(buffer);
                console.log(' ---------- directory originalname: ', originalname)
                //TODO сделать ignoreNames массивом, проверку на наличие этих имен вынести в отдельную функцию
                const ignoreNames = '__MACOSX'

                const filteredDir = directory.files.filter(file => !file.path.includes(ignoreNames))
                const sortedDir = filteredDir.sort(sortBySequence)

                return Promise.all(
                    sortedDir.map( async (archiveFile, index) => {
                        // console.log('directory archiveFile = ', archiveFile.path)

                        if(archiveFile.type === "File" && !archiveFile.path.includes(ignoreNames)){
                            console.log('archiveFile.path to upload = ', archiveFile.path, index)
                            const filename = `${nanoid()}${FileHelper.retrieveExtension(archiveFile.path)}`
                            const pageData = await s3.upload (
                                getUploadPageParams(
                                    pagesBucket,
                                    filename,
                                    archiveFile.stream()
                                )).promise()

                            console.log("\x1b[33m", "Upload Success data: ", pageData, archiveFile.path, index);
                            return {fieldname, location : pageData.Location, sequence: index}
                        }

                        return false
                    })
                )
            }

            return false
        })
        console.log("\x1b[36m", '=====  promises', promises)
        
        const files = await Promise.all(promises)
        console.log("\x1b[32m", '---  ALL PROMISES DONE ---', files)

        if(files.length > 0){
            const preparedFiles = files.reduce(flatFiles, [])
            console.log("\x1b[32m", 'preparedFiles:')//[{fieldname, location, sequence}]
            console.table(preparedFiles)//[{fieldname, location, sequence}]
            
            const newCoverFile = preparedFiles.find(({fieldname}) => fieldname === 'cover')
            const newCover = !!newCoverFile ? newCoverFile.location : null

            if(
                // (!cover && !!newCover) 
                // || (!!cover && cover !== newCover)
                !!newCover
                && cover !== newCover  
            ){
                comic.cover = newCover
                imagesToDelete.push({Key: coverPath})
            }

            //заполняем поле cover где необходимо
            volumes = volumes.map(({chapters, ...vol}, volIndex) => {
                if(Array.isArray(chapters)){
                    chapters = chapters.map((ch, chIndex) => {
                        const chCover = preparedFiles.find(({fieldname}) => fieldname == `volumes[${volIndex}][chapters][${chIndex}][cover]`)
                        const chPages = preparedFiles.filter(({fieldname}) => fieldname === `volumes[${volIndex}][chapters][${chIndex}][pages]`)

                        console.log("\x1b[36m", `Fetched pages for volume[${volIndex}] chapter[${chIndex}]=`)
                        console.table(chPages)
                        if(chCover !== undefined){
                            ch.cover = chCover.location
                            imagesToDelete.push({Key: ch.coverPath})
                        }

                        if(chPages.length > 0){
                            console.log("chPages is array", chPages)

                            ch.pages = chPages.map(({location, sequence}) => new Object({uri: location, sequence, comments: []}))
                        }

                        console.log("\x1b[32m", 'Return updated chapter:')
                        console.log(ch) 
                         
                        return { ...ch}
                    })
                }
    
                const volCover = preparedFiles.find(({fieldname}) => fieldname == `volumes[${volIndex}][cover]`)

                if(volCover){
                    vol.cover = volCover.location
                    imagesToDelete.push({Key: vol.coverPath})
                }
    
                return {...vol, chapters}
            })
            console.log('---> Modified volumes = ')
            console.table(volumes)
        }

        // volumes = volumes.map(v => {
        //     if(v.chapters === ''){
        //         return {
        //             ...v,
        //             chapters: []
        //         }
        //     }

        //     return v
        // })
        // console.log('modified volumes = ', volumes)


        //проверяем, какие тома и главы были удалены и заносим соответствующие облодки и старницы на удаление
        //сравниваем данные по томам и главам первоначальный объект comic с объектом volumes из дерева с формой
        comic.volumes.map(({id, coverPath,  chapters}) => {
            const newVolume = volumes.find(v => v.id === id)

            // если не находим том в новом массиве содержания, то добавляем на удаление обложку, обложку и страницы всех глав
            if(newVolume === undefined){
                imagesToDelete.push({Key: coverPath})
                chapters.map(({coverPath, pages}) => {
                    imagesToDelete.push({Key: coverPath})

                    pages.map(({uriShort}) => {
                        imagesToDelete.push({Key: uriShort})
                    })
                })
            } else {// если  находим том в новом массиве содержания, то проверяем на существование  главы этого тома
                chapters.map(({id, coverPath, pages}) => {
                    const newChapter = Array.isArray(newVolume.chapters) ? newVolume.chapters.find(ch => ch.id === id) : undefined
    
                    if(newChapter === undefined){
                        imagesToDelete.push({Key: coverPath})

                        pages.map(({uriShort}) => {
                            imagesToDelete.push({Key: uriShort})
                        })
                    }
                })
            }
        })

        comic.title = title
        comic.description = description
        comic.isMature = isMature
        comic.genres = genres
        comic.status = status
        comic.volumes = volumes
        
        await comic.save()   

        // const updatedComic = await Comic.findByIdAndUpdate(_id, {title, description, isMature, genres, status, volumes}, {useFindAndModify: false, new: true})
        
        console.log("\x1b[31m", 'imagesToDelete', imagesToDelete)
        if(imagesToDelete.length){
            const params = {
                Bucket: bucket,
                Delete: {
                    Objects: imagesToDelete, 
                    Quiet: false
                }
            }
    
            await s3.deleteObjects(params).promise()
        }

        res.json({comic})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/delete', withAuth, async(req, res) => {
    try {
        const {id} = req.body
        const comic = await Comic.findById(id)
        let imagesToDelete = []

        //пока удаляем основную обложку и обложки глав и томов

        imagesToDelete.push({Key: comic.coverPath})

        if(Array.isArray(comic.volumes)){
            comic.volumes.map(({chapters, coverPath}) => {
                if(typeof coverPath === "string"){
                    imagesToDelete.push({Key: coverPath})
                    console.log(`Delete volume cover ${coverPath}`)
                }
    
                chapters.map(({coverPath, pages}) => {
                    if(typeof coverPath === "string"){
                        imagesToDelete.push({Key: coverPath})
                    }
                    console.log(`Delete chapter cover ${coverPath}`)

                    if(Array.isArray(pages)){
                        pages.map(({uriShort}) => {
                            console.log(`Delete page  ${uriShort}`)
                            imagesToDelete.push({Key: uriShort})
                        })
                    }
                })
            })
        }

        const params = {
            Bucket: bucket,
            Delete: {
                Objects: imagesToDelete, 
                Quiet: false
            }
        }

        console.log('----comic images to delete: ', imagesToDelete)

        await s3.deleteObjects(params).promise()
        await Comic.findByIdAndDelete(id)

        res.status(200).json({id})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

module.exports = router