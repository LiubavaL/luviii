const express = require('express')
const mongoose = require('mongoose')
const withAuth = require('./middlewares/auth.middleware')
const cookieParser = require('cookie-parser')
const config = require('config')

const app = express()
const port = config.get('port') || 5000
const dbUri = config.get('dbConfig.uri')

app.use(express.json())
app.use(cookieParser())

app.use('/api/posts', require('./routes/post.routes'))
app.use('/api/comics', require('./routes/comic.routes'))
app.use('/api/genres', require('./routes/genre.routes'))
app.use('/api/statuses', require('./routes/status.routes'))
app.use('/api/faqs', require('./routes/faq.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/social', require('./routes/social.routes'))

app.get('/api/admin', withAuth, (req, res) => { 
    res.send('...here is the secret content..')
})


const start = async function () {
    try {
        console.log('Trying connect to Mongo...')
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        app.listen(port, () => {
            console.log(`App listening at localhost: ${port}`)
        })
    } catch (e) {
        console.log('Error occured while connecting to DB')
        process.exit(1)
    } 
}
start()


