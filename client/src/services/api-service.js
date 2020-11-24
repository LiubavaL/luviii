import draftToHtml from 'draftjs-to-html'

class ApiService {
    _authHeader = null

    //Posts
    async getPosts(){
        try {
            const res = await fetch('/api/posts', {
                headers: {
                    ...this.getAuthHeader()
                }
            })

            if(res.status === 200) {
                const body = await res.json()
                const posts = body.posts
                const parsedPosts = posts.map(({text, ...rest}) => {
                    const textMarkup = draftToHtml(JSON.parse(text))

                    return {
                        ...rest,
                        text,
                        textMarkup
                    }
                })
                return parsedPosts
            }
        } catch (e) {}
    }

    async addPost(formData){
        let res = await fetch(
            '/api/posts/add',
            {
                headers: {
                    ...this.getAuthHeader()
                },
                method: "POST",
                body: formData
                // headers: {
                //     "Content-Type": "application/json"
                // },
                // body: JSON.stringify(form)
            }
        )

        if(res.status === 201){
            const {post} = await res.json()

            return post
        }
        //здесь нужно подумать, как обрабатывать ошибки
        return null
    }

    async editPost(formData){
        let res = await fetch(
            '/api/posts/edit',
            {
                headers: {
                    ...this.getAuthHeader()
                },
                method: "POST",
                body: formData
            }
        )

        if(res.status === 200){
            const {post} = await res.json()

            return post
        }

        return null
    }

    async deletePost(id){
        let res = await fetch(
            '/api/posts/delete',
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...this.getAuthHeader()
                },
                method: "POST",
                body: JSON.stringify({id})
            })

        if(res.status === 200 ) {
            const {id} = await res.json()
            return id
        }

        return null
    }

    // Faqs
    async getFaqs(){
        const res = await fetch('/api/faqs', {
            headers: {
                ...this.getAuthHeader()
            }
        })

        if(res.status === 200) {
            const body = await res.json()
            const faqs = body.faqs
            const parsedFaqs = faqs.map(({answer, ...rest}) => {
                const answerMarkup = draftToHtml(JSON.parse(answer))
                
                return {
                    ...rest, 
                    answer,
                    answerMarkup
                }
            })

            return parsedFaqs
        }
    }

    async addFaq(form){
        const res = await fetch('/api/faqs/add', 
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                ...this.getAuthHeader()
            },
            body: JSON.stringify(form)
        })

        if(res.status === 201){
            const {faq} = await res.json()
            return faq
        } 

        return null
    }

    async editFaq(form){
        const res = await fetch('/api/faqs/edit',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...this.getAuthHeader()
                },
                body: JSON.stringify(form)
            }
        )

        if(res.status === 200){
            const {faq} = await res.json()
            return faq
        }

        return null
    }

    async deleteFaq(id){
        const res = await fetch('/api/faqs/delete',
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    ...this.getAuthHeader()
                },
                body: JSON.stringify({id})
            }
        )

        if(res.status === 200){
            const {id} = res
            return id
        } 
    }

    //Socials
    async getSocials(){
        const res = await fetch('/api/social')
        // throw new Error('Error in service fetch getSocials')

        if(res.status === 200) {
            const body = await res.json()
            const socials = body.socials
            const parsedSocials = socials.map(({color, ...rest}) => {
                return {...rest, color: JSON.parse(color)}
            })
            
            return parsedSocials
        }
        
    }

    async addSocial(formData){
        let res = await fetch('/api/social/add', 
        {
            method: "POST",
            body: formData,
            headers: {
                ...this.getAuthHeader()
            }
        })

        if(res.status === 201){
            const {social} = await res.json()
            return social
        }
    }

    async editSocial(formData){
        let res = await fetch('/api/social/edit', 
            {
                method: "POST",
                body: formData,
                headers: {
                    ...this.getAuthHeader()
                }
            })

        if(res.status === 200){
            const {social} = await res.json()

            return social
        }
    }

    async deleteSocial(id){
        let res = await fetch(
            '/api/social/delete',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    ...this.getAuthHeader()
                },
                body: JSON.stringify({id})
            })

        if(res.status === 200){
            res = await res.json()

            return res.id
        }

        return null
    }

    //Comic
    async getComics(){
        let res = await fetch('/api/comics/', {
            headers: {
                ...this.getAuthHeader()
            }
        })

        if(res.status === 200){
            const {comics} = await res.json()
            return comics
        }
        return null
    }

    async editComic(formData){
        const res = await fetch(
            '/api/comics/edit',
            {
                headers: {
                    ...this.getAuthHeader()
                },
                method: "POST",
                body: formData
            }
        )

        if(res.status === 200){
            const {comic} = await res.json()
            return comic
        }

        return null
    }

    async addComic(formData){
        const res = await fetch(
            '/api/comics/add',
            {
                headers: {
                    ...this.getAuthHeader()
                },
                method: "POST",
                body: formData
            }
        )

        if(res.status === 201){
            const {comic} = await res.json()
            return comic
        }

        return null
    }

    async deleteComic(id){
        const res = await fetch('/api/comics/delete',
            { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    ...this.getAuthHeader()
                },
                body:  JSON.stringify({id})
            }
        )

        if(res.status === 200){
            return res.id
        }

        return null
    }


    //Statuses
    async getStatuses(){
        const res = await fetch('/api/statuses/', {
            headers: {
                ...this.getAuthHeader()
            }
        })

        if(res.status === 200){
            const {statuses} = await res.json()
            return statuses
        }
        return null
    }

    async addStatus(form){
        const res = await fetch(
            '/api/statuses/add',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...this.getAuthHeader()
                },
                body: JSON.stringify(form)
            }
        )

        if(res.status === 201){
            const {status} = await res.json()

            return status
        }

        return null
    }

    async editStatus(form){
        const res = await fetch(
            '/api/statuses/edit',
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    ...this.getAuthHeader()
                },
                body: JSON.stringify(form)
            }
        )

        if(res.status === 200){
            const {status} = await res.json()

            return status
        }

        return null
    }

    async deleteStatus(id){
        const res = await fetch(
            '/api/statuses/delete',
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    ...this.getAuthHeader()
                },
                body: JSON.stringify({id})
            }
         )
 
         if(res.status === 200){
             return id
         }

         return null
    }

    // Genres
    async getGenres(){
        const res = await fetch('/api/genres/', {
            headers: {
                ...this.getAuthHeader()
            }
        })

        if(res.status === 200){
            const {genres} = await res.json()
            return genres
        }
    }

    async deleteGenre(id){
        const res = await fetch(
            '/api/genres/delete',
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    ...this.getAuthHeader()
                },
                body: JSON.stringify({id})
            }
        )

        if(res.status === 200){
            return res.id
        }

        return null
    }

    async editGenre(form){
        const res = await fetch(
            '/api/genres/edit',
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    ...this.getAuthHeader()
                },
                body: JSON.stringify(form)
            }
        )

        if(res.status === 200){
            const {genre} = await res.json()
            return genre
        }

        return null
    }

    async addGenre(form){
        const res = await fetch(
            '/api/genres/add',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...this.getAuthHeader()
                },
                body: JSON.stringify(form)
            }
        )
        if(res.status === 201){
            const {genre} = await res.json()

            return genre
        }

        return null
    }

    //Auth
    async refreshToken(){
        const res = await fetch('/api/auth/refresh-token', {
            method: "POST"
        })

        if(res.status === 200){
            const {jwtToken, jwtExpiresAt} = await res.json()
            
            this.setAuthHeader(jwtToken)
            return {jwtToken, jwtExpiresAt}
        }

        return {jwtToken: null, jwtExpiresAt: null}
    }

    async register(form){
        const res = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if(res.status === 200){
            const {jwtToken, jwtExpiresAt} = await res.json()
            return {jwtToken, jwtExpiresAt}
        }

        return {jwtToken: null, jwtExpiresAt: null}//еще пересмотреть, что тут нужно передавать
    }

    async login(form){
        const res = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        if(res.status === 200){
            const {jwtToken, jwtExpiresAt} = await res.json()
            this.setAuthHeader(jwtToken)
            
            return {jwtToken, jwtExpiresAt}
        }

        return {jwtToken: null, jwtExpiresAt: null}//еще пересмотреть, что тут нужно передавать
    }

    async logout(){
        //удаляем refresh_token cookie
        const res = await fetch('/api/auth/logout', 
            {
                method: "POST",
                headers: {
                    ...this.getAuthHeader()
                }
            }
        )

        return {jwtToken: null, jwtExpiresAt: null}//еще пересмотреть, что тут нужно передавать
    }

    setAuthHeader(token){
        this._authHeader = {Authorization: `Baerer ${token}`}
        console.log('apiService setAuthHeader', token)
    }

    getAuthHeader(){
        console.log('apiService getAuthHeader', this._authHeader)
        return this._authHeader
    }


    getChapters(){
        const chapters = [
            {
                id: 1,
                title: "September and part. My One And Only Love (The End)",
                index: "01",
                date: "7 Jul, 2019",
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
            },
            {
                id: 2,
                title: " and part. My One And Only Love (The End) and part. My One And Only Love (The End) and part. My One And Only Love (The End) and part. My One And Only Love (The End)September and part. My One And Only Love (The End)",
                index: "02",
                date: "7 Jul, 2019",
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
            },
            {
                id: 3,
                isNew: "true",
                title: "September and part. My One And Only Love (The End)",
                index: "03",
                date: "7 Jul, 2019",
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
            }
        ];

        return new Promise((res, rej) => {
            setTimeout(() => res(chapters), 2000);
        });
    }
}

export default new ApiService()