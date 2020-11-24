const {Router} = require('express')
const router = Router()
const Genre = require('../models/Genre')
const withAuth = require('../middlewares/auth.middleware')

router.get('/', withAuth, async(req, res) => {
    try {
        const genres = await Genre.find()
        res.json({genres})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/add', withAuth, async(req, res) => {
    try {
        const {name} = req.body
        const genre = new Genre({name})
        await genre.save()
        res.status(201).json({genre})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/edit', withAuth, async(req, res) => {
    try {
        const {_id, name} = req.body
        const genre = await Genre.findByIdAndUpdate(_id, {name}, {new: true})
        res.json({genre})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/delete', withAuth, async(req, res) => {
    try {
        const {id} = req.body
        await Genre.findByIdAndDelete(id)
        res.json({id})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

module.exports = router