export default class FormDataHelper {
    /**
     * 
     * @param FormData formData 
     * @param {*} data  = {
     * field1: [1, 2, 3]
     * field2: {a: item, b: [1, 2, 3]}
     * field3: 'string'
     * field4: FileList
     * 
     * }
     */
    // static convertModelToFormData(formData, data, key){
    //     for(const name in data){
    //         console.log('name', name)
    //         const value = data[name]

    //         if( value instanceof FileList){
    //             console.log('formdata load files', name, value)
    //             for(let i = 0; i < value.length; i++) {
    //                 formData.append(`${name}[]`, value[i])
    //             }
    //         } else if(Array.isArray(value)){
    //             value.forEach(item => {
    //                 formData.append(`${name}[]`, item)
    //             })
    //         } else if (typeof value === 'object' && value !== null){
    //             for(let prop in value){
    //                 formData.append(`${name}[${prop}]`, value)
    //             }
    //         } else {
    //             formData.append(name, value)
    //         }
    //     }

    //     return formData

    // }

    static convertModelToFormData(formData, data, name = ""){
        console.log('convertModelToFormData', name, data)
            if(data instanceof FileList){
                for(let i = 0; i < data.length; i++) {
                    formData.append(`${name}[]`, data[i])
                }
            } else if(data instanceof File) {
                formData.append(name, data)
            } else if (/* Array.isArray(data) ||  */typeof data === 'object' && data !== null && Object.keys(data).length > 0){
                console.log('convertModelToFormData 3', name, data)

                for(let key in data){
                    console.log('convertModelToFormData 3 loop', data[key], name)

                    this.convertModelToFormData(formData, data[key], name ? `${name}[${key}]` : `${key}`)
                }
            } else if(!Array.isArray(data)){
                formData.append(name, data)
            }

        return formData
    }
}