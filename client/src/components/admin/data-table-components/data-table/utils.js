export const sort = (arr, field, order = 'ascending') => {
    //массив должен быть одного типа

    // console.log(' --- sort --- ')
    // console.log(' field', field)
    // console.log(' order', order)
    return arr.sort((a, b) => {
        const a1 = a[field]
        const b1 = b[field]
        const orderMultiplier = order === 'ascending' ? 1 : -1

        switch (typeof a1){
            case "number": return (a1-b1) * orderMultiplier
            default: return a1.toString().localeCompare(b1.toString(), navigator.languages[0] || navigator.language, {numeric: true, ignorePunctuation: true}) * orderMultiplier // number
        }
    })
}

export const search = (haystack, needle) => {
    return haystack.filter(val => {
        // let containNeedle = false
        for (const key in val) {
            const column = val[key];
            if(column.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1) {
                return true
            }
        }

        return false
    })
}

export const paginate = (arr, range) => {
    let paginated = []

    if(range < 2){
        paginated.push(arr)
    } else {
        const chunkCount = Math.ceil(arr.length / range)
    
        for (let chIndex = 0; chIndex < chunkCount; chIndex++) {
            paginated.push([])
    
            for(let arrIndex = chIndex*range; arrIndex < range*(chIndex + 1) && arrIndex < arr.length; arrIndex++){
                paginated[chIndex].push(arr[arrIndex])
            }
        }
    }

    return paginated
}