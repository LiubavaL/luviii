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
        const {id} = req.body
        await Status.findByIdAndDelete(id) 
        res.json({id})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

module.exports = router