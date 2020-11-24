class FileHelper {
    static retrieveExtension(filename){
        const startIndex = filename.lastIndexOf('.')

        console.log('FileHelper retrieveExtension returns: ', filename.substring(startIndex))

        return filename.substring(startIndex)
    }
}

module.exports = FileHelper