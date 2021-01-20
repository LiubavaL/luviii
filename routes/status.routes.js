const {Router} = require('express')
const router = new Router()
const Status = require('../models/Status')
const withAuth = require('../middlewares/auth.middleware')

router.get('/', withAuth, async(req, res) => {
    try {
        const statuses = await Status.find()

        res.json({statuses})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/add', withAuth, async(req, res) => {
    try {
        const {name} = req.body
        const status = new Status({name})

        await status.save()
        res.status(201).json({status})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/edit', withAuth, async(req, res) => {
    try {
        const {_id, name} = req.body
        const status = await Status.findByIdAndUpdate(_id, {name}, {new: true})

        res.json({status})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/delete', withAuth, async(req, res) => {
    try {
        const {ids} = req.body
        const result = await Status.deleteMany(Status.find({_id: ids})) 

        if(result.deletedCount === ids.length){
            res.json({ids})
        }

        throw new Error("Failed to delete selected statuses")
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

module.exports = router