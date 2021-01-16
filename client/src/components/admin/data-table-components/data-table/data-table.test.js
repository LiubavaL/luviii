import {sort, search, paginate} from './utils'

it("Sort datatable", () => {
    const data = [
        {id: 1, desc: "cdf", createdAt: "09-07-20"},
        {id: 2, desc: "234", createdAt: "10-07-20"},
        {id: 3, desc: "bbsd", createdAt: "89-06-20"},
    ]
    const result = [
        {id: 2, desc: "234", createdAt: "10-07-20"},
        {id: 3, desc: "bbsd", createdAt: "89-06-20"},
        {id: 1, desc: "cdf", createdAt: "09-07-20"},
    ]
    expect(sort(data, "desc", "asc")).toMatchObject(result)
})

it("Filter datatable", () => {
    const data = [
        {id: 1, desc: "cdf", createdAt: "09-07-20"},
        {id: 2, desc: "234", createdAt: "10-07-20"},
        {id: 3, desc: "bbsd", createdAt: "89-06-20"},
    ]
    const result = [
        {id: 2, desc: "234", createdAt: "10-07-20"},
        {id: 3, desc: "bbsd", createdAt: "89-06-20"},
    ]
    expect(search(data, "3")).toMatchObject(result)
})

it("Paginate datatable", () => {
    const data = [
        {id: 1, desc: "hey", createdAt: "09-07-20"},
        {id: 2, desc: "hi", createdAt: "10-07-20"},
        {id: 3, desc: "hello", createdAt: "89-06-20"},
        {id: 4, desc: "how is it going", createdAt: "09-07-20"},
        {id: 5, desc: "wassup", createdAt: "10-07-20"},
        {id: 6, desc: "how are you", createdAt: "89-06-20"},
        {id: 7, desc: "long time no see", createdAt: "89-06-20"}
    ]
    const range = 3
    const result = [
        [
            {id: 1, desc: "hey", createdAt: "09-07-20"},
            {id: 2, desc: "hi", createdAt: "10-07-20"},
            {id: 3, desc: "hello", createdAt: "89-06-20"}
        ],
        [
            {id: 4, desc: "how is it going", createdAt: "09-07-20"},
            {id: 5, desc: "wassup", createdAt: "10-07-20"},
            {id: 6, desc: "how are you", createdAt: "89-06-20"}
        ],
        [
            {id: 7, desc: "long time no see", createdAt: "89-06-20"}
        ]
    ]
    expect(paginate(data, range)).toMatchObject(result)
})