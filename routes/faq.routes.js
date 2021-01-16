const {Router} = require('express')
const router = Router()
const Faq = require('../models/Faq')
const withAuth = require('../middlewares/auth.middleware')

router.get('/', withAuth, async(req, res) => {
    try {
        const faqs = await Faq.find()
        console.log('faqs ', faqs)
        res.json({faqs})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/add', withAuth, async(req, res) => {
    try {
        const {answer, question} = req.body
        console.log('add faq', {answer, question})
        const faq = new Faq({answer, question})
        await faq.save()
        res.status(201).json({faq})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/edit', withAuth, async(req, res) => {
    try {
        const {_id, answer, question} = req.body
        const faq = await Faq.findByIdAndUpdate(_id, {answer, question}, {new: true})
        res.json({faq})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

router.post('/delete', withAuth, async(req, res) => {
    try {
        const {ids} = req.body
        const r = await Faq.deleteMany(Faq.find({_id: ids}))
        console.log('delete faqs by ids result: ', r)
        // await Faq.findByIdAndDelete(id)
        res.json({ids})
    } catch(e){
        res.status(500).json({message: e.message})
    }
})

module.exports = router