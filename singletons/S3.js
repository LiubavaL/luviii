const AWS = require('aws-sdk')
const config = require('config')


AWS.config = new AWS.Config({ 
    credentials: new AWS.Credentials({
        accessKeyId: config.get('s3.accessKeyId'), 
        secretAccessKey: config.get('s3.secretAccessKey')
    }),
    apiVersion: config.get('s3.apiVersion'),
    region: config.get('s3.region')
})

module.exports = new AWS.S3()