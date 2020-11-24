import React, { Component } from 'react'

import Typography from '../../../typography'
import TextField from '../../../text-field'
import Checkbox from '../../../checkbox'
import Select from '../../../select'
import Button from '../../../button'
import IconButton from '../../../icon-button'
import Loader from '../../../loader'
import ErrorIndicator from '../../../error-indicator'
import FormDataHelper from '../../../../helpers/FormDataHelper'
import apiService from '../../../../services/api-service'

import './comic-page.scss'

const CommonListItem = ({id, title, description, cover, onEdit, onDelete}) => {
    return (
        <div className="row">
            <Cover src={cover} />
            <div>
                <Typography use="headline4">{title}</Typography>
                <Typography>{description}</Typography>
            </div>
            <IconButton icon="edit" onClick={e => onEdit(e, id)}/>
            <IconButton icon="delete" onClick={e => onDelete(e, id)}/>
        </div>
    )
}

const ChapterListItem = ({pages = [], ...rest}) => {
    return (
        <div className="chapter-row">
            <CommonListItem {...rest}/>
            <ComicPages pages={pages} />
        </div>
    )
}

const VolumeListItem = (props) => {
    return (
        <CommonListItem {...props}/>
    )
}

const ComicList = ({comics, onEdit}) => {
    if(!comics || !comics.length){
        return <div>Комиксов пока нет.</div>
    }

    const comicsToRender = comics.map( comic => {
        return <ComicItem key={comic.id} {...comic} onEdit={onEdit}/>
    })

    return comicsToRender
}

const ComicItem = ({id, cover, title, description, onEdit}) => {
    return (
        <div className="comic">
            <img src={cover} width="100"/>
            <span>
                <Typography use="headline4">{title}</Typography>
                <Typography>{description}</Typography>
                <Button onClick={e => onEdit(id)}>Редактировать</Button>
                <Button>Добавить главу</Button>
                <Button>Статистика</Button>
            </span>
        </div>
    )
}

const Cover = (props) => {
    
    const onPreviewLoad = (e) => {
        window.URL.revokeObjectURL(e.target.src)
    }
    let image = null
    const src = props.src ? props.src : "/images/cover.png"

    if(src instanceof File){
        image = <img width="100" src={URL.createObjectURL(src)} onLoad={onPreviewLoad} />
    }

    if(typeof src === 'string'){
        image = <img width="100" src={src} />
    }

    return image
}

const ComicPages = ({pages}) => {
    let pagesToRender = null

    if(Array.isArray(pages)){
        pagesToRender = <div className="chapter-row__pages">{pages.map(({uri}) => <img src={uri} width="30" />)}</div>
    }
    if(pages instanceof File) {
        pagesToRender = <Typography>{pages.name}</Typography>
    }

    return pagesToRender
}

const CandidateChapter = ({chapter, volIndex, onSubmit, onChange,onCancel /* onCoverChange,  onSubmitPages*/}) => {
    return (
        <div className="legend">
            <TextField 
                label="Название" 
                value={chapter?.title}
                onChange={e => onChange(e, volIndex)}
                name="title"
                outlined/>
            <TextField 
                label="Описание" 
                value={chapter?.description}
                onChange={e => onChange(e, volIndex)}
                name="description"
                outlined/>
            <div>
                <Cover src={chapter?.cover} />
                <Typography>Обложка:</Typography>
                <input type="file" name="cover" onChange={e => onChange(e, volIndex)}/>
            </div>
            <div>
                {/* <Button outlined>Страницы...</ Button> */}
                <Typography>Страницы:</Typography>
                <ComicPages pages={chapter?.pages} />
                <input type="file" name="pages" onChange={e => onChange(e, volIndex)}/>
            </div>
            <Button onClick={e => onSubmit(e, chapter, volIndex)} raised>{chapter?.id ? 'Редактировать' : 'Добавить' } главу</Button>
            <Button onClick={e => onCancel(e, volIndex)}>Отмена</Button>
        </div>
    )
}

const CandidateVolume = ({volume, onSubmit, onChange, onCancel/* , onCoverChange */}) => {
    return (
        <div  className="legend legend--volume" >
            <TextField 
                label="Название" 
                value={volume?.title} 
                onChange={e => onChange(e)}
                name="title"
                outlined
            />
            <TextField 
                label="Описание" 
                value={volume?.description} 
                onChange={e => onChange(e)}
                name="description"
                outlined
            />
            <div>
                <Cover src={volume?.cover} />
                <Typography>Обложка:</Typography>
                <input type="file" name="cover" onChange={e => onChange(e)}/>
            </div>
            <Button raised onClick={e => onSubmit(e, volume)}>{volume?.id ? 'Редактировать' : 'Добавить'} том</Button>
            <Button onClick={onCancel}>Отмена</Button>
        </div>
    )
}

export default class ComicPage extends Component {
    state={
        comics: [],
        loading: true,
        error: false,
        genres: [],
        statuses: [],
        general: {
            title: 'title',
            description: 'desc'
        },
        volumes: [// массив томов
            // {
            //     title: 'Том 1 (state)',
            //     description: 'описание Тома 1',
            //     cover: '/images/cover.png',
            //     chapters: [//массив глав
            //         {
            //             title: 'Глава 1 (state)',
            //             description: 'Опсиание главы 1',
            //             cover: '/images/cover.png',
            //             pages: []//archive страниц
            //         },
            //         {
            //             title: 'Глава 2 (state)',
            //             description: 'Опсиание главы 2',
            //             cover: '/images/cover.png',
            //             pages: []//archive страниц
            //         },
            //     ]
            // },
            // {
            //     title: 'Том 2',
            //     description: 'описание Тома 3',
            //     cover: '/images/cover.png',
            //     chapters: [//массив глав
            //         {
            //             title: 'Глава 3',
            //             description: 'Опсиание главы 3',
            //             cover: '/images/cover.png',
            //             pages: []//archive страниц
            //         },
            //         {
            //             title: 'Глава 4',
            //             description: 'Опсиание главы 4',
            //             cover: '/images/cover.png',
            //             pages: []//archive страниц
            //         },
            //         {
            //             title: 'Глава 5',
            //             description: 'Опсиание главы 5',
            //             cover: '/images/cover.png',
            //             pages: []//archive страниц
            //         },
            //     ]
            // }
        ],
        candidates: {
            volume: {
                title: 'Том 3 (state)',
                description: 'описание Тома 3'
            },
            chapters: {
            //     0: {//порялкоывй номер тома
            //         title: 'Глава 33 (state)',
            //         description: 'описание Гоава 33',
            //         cover: '/images/cover.png'
            //     },
            //     2: {
            //         title: 'Глава 44 (state)',
            //         description: 'описание Глава 44',
            //         cover: '/images/cover.png'
            //     }
            }
        }
    }

    async componentDidMount(){
        const comics = await apiService.getComics()
        if(comics){
            this.setState({
                comics,
                loading: false,
                error: false
            })
        }

        const statuses = await apiService.getStatuses()
        if(statuses){
            this.setState({statuses})
        }

        const genres = await apiService.getGenres()
        if(genres){
            this.setState({genres})
        }
    }

    handleError(){
        this.setState({
            error: true,
            loading: false
        })
    }

    /* 
        Candidates 
    */ 

    //Volume
    onSubmitCandidateVolume = (e, volume) => {
        e.preventDefault()

        const {volumes, candidates} = this.state
        let index = null

        if(volume.id){
            index = volumes.findIndex(v => v.id === volume.id)
            this.setState({
                volumes: [
                    ...volumes.slice(0, index),
                    {
                        ...volumes[index], ...volume
                    },
                    ...volumes.slice(index + 1)
                ],
                candidates: {
                    ...candidates,
                    volume: {}
                }
            })
        } else {
            index = volumes.length - 1
            this.setState({
                volumes: [
                    ...volumes,
                    {...volume, chapters: []}//добавляем новый том
                ],
                candidates: {
                    volume: {},
                    chapters: {// добавляем новое поле для доавбления главы
                        ...candidates.chapters,
                        [index] : {}
                    }
                }
            })
        }
    }

    editVolume = (e, id) => {
        e.preventDefault()
        console.log(`edit volume with id=${id}`)
        const {chapters, ...volumeToEdit} = this.state.volumes.find(v => v.id === id)
        console.log(`editvolumeToEdit=`, volumeToEdit)
        this.setState({
            candidates: {
                ...this.state.candidates,
                volume: volumeToEdit
            }
        })
    }
    
    deleteVolume = (e, id) => {
        e.preventDefault()

        const {volumes} = this.state
        const index = volumes.findIndex(v => v.id === id)

        this.setState({
            volumes: [
                ...volumes.splice(0, index),
                ...volumes.splice(index + 1)
            ]
        })
    }

    onCandidateVolumeInputChange = (e) => {
        const {name, files, value} = e.target
        const {candidates} = this.state
        const {volume} = candidates
        let preparedValue = null

        if(files !== null){
            if(files.length === 1){
                preparedValue = files[0]
            }
        } else {
            preparedValue = value
        }

        this.setState({
            candidates: {
                ...candidates,
                volume: {
                    ...volume,
                    [name]: preparedValue
                }
            }
        })
    }

    onCandidateVolumeCancel = (e) => {
        e.preventDefault()

        const {candidates} = this.state

        this.setState({
            candidates: {
                ...candidates,
                volume: {}
            }
        })
    }

    onCandidateChapterCancel = (e, volIndex) => {
        e.preventDefault()

        const {candidates} = this.state
        const {chapters} = candidates

        //есть вероятность, что здесь проп удаляется напрямую из this.state, а это нехорошо
        delete chapters[volIndex]

        this.setState({
            candidates: {
                ...candidates,
                chapters: {
                    ...chapters
                }
            }
        })
    }

    //Chapter
    onSubmitCandidateChapter = (e, chapter, volIndex) => {
        e.preventDefault()

        const {candidates, volumes} = this.state
        const {chapters} = candidates // TODO узнать, как копируются здесь данные:
        const parentVol = volumes[volIndex]
        const chIndex = parentVol.chapters.findIndex(ch => ch.id === chapter.id)

        delete chapters[volIndex]

        console.log('onSubmitCandidateChapter: cchIndex = ', chIndex)
        console.log('onSubmitCandidateChapter: volIndex = ', volIndex)

        if(chapter.id){
            this.setState({
                volumes: [
                    ...volumes.slice(0, volIndex),
                    {
                        ...parentVol,
                        chapters: [//при редактировании добавляется как новая глава, в самое начало
                            ...parentVol.chapters.slice(0, chIndex),
                            {
                                ...parentVol.chapters[chIndex],
                                ...chapter
                            },
                            ...parentVol.chapters.slice(chIndex + 1)
                        ]
                    },
                    ...volumes.slice(volIndex + 1)
                ],
                candidates: {
                    ...candidates,
                    chapters: {
                        ...chapters
                    }
                }
            })
        } else {
            this.setState({
                volumes: [
                    ...volumes.slice(0, volIndex),
                    {
                        ...volumes[volIndex],
                        // title: volumes[volIndex].title,
                        // description: volumes[volIndex].description,
                        // cover: volumes[volIndex].cover,
                        chapters: [
                            ...volumes[volIndex].chapters,
                            chapter
                        ]
                    },
                    ...volumes.slice(volIndex + 1)
                ],
                candidates: {
                    ...candidates,
                    chapters: {
                        ...chapters
                    }
                }
            })
        }
    }
    
    editChapter = (e, id) => {
        e.preventDefault()
        console.log(`edit chapter with id=${id}`)
        let volIndex = null 
        let chapterToEdit = null
        const {candidates} = this.state
        this.state.volumes.find(({chapters}, i) => {
            volIndex = i
            chapterToEdit = chapters.find(ch => ch.id === id)

            return !!chapterToEdit
        })
        console.log(`edit chapter with volIndex=${volIndex}`)
        console.log(`edit chapter with chapterToEdit=${chapterToEdit}`)


        this.setState({
            candidates: {
                ...candidates,
                chapters: {
                    ...candidates.chapters,
                    [volIndex]: chapterToEdit
                }
            }
        })
    }

    deleteChapter = (e, id) => {
        e.preventDefault()
        console.log('deleteChapter id=', id)

        const {volumes} = this.state
        let chIndex = null
        
        const volIndex = volumes.findIndex(v => {
            chIndex = v.chapters.findIndex(ch => ch.id === id)
            console.log('deleteChapter chIndex', v.chapters, chIndex)

            return chIndex !== -1
        })
        const containingVolume = volumes[volIndex]

        console.log('deleteChapter ', volIndex, chIndex, containingVolume)


        this.setState({
            volumes: [
                ...volumes.splice(0, volIndex),
                {
                    ...containingVolume,
                    chapters: [
                        ...containingVolume.chapters.splice(0, chIndex),
                        ...containingVolume.chapters.splice(chIndex + 1)
                    ]
                },
                ...volumes.splice(volIndex + 1)
            ]
        })
    }

    onCandidateChapterInputChange = (e, volIndex) => {
        const {name, files, value} = e.target
        const {candidates} = this.state
        const {chapters} = candidates
        let preparedValue = null

        if(files !== null){
            if(files.length === 1){
                preparedValue = files[0]
            }
        } else {
            preparedValue = value
        }

        this.setState({
            candidates: {
                ...candidates,
                chapters: {
                    ...chapters,
                    [volIndex]: {
                        ...chapters[volIndex],
                        [name]: preparedValue
                    }
                }
            }
        })
    }

    /* 
        End Candidates 
    */ 

    renderVolumes(volumes){
        const {candidates} = this.state,
            {volume : candidateVolume, chapters: candidateChapters} = candidates

        const renderedVolumes = Array.isArray(volumes) ? volumes.map(({chapters, ...volume}, volIndex) => {            
            const chaptersList = Array.isArray(chapters) ? chapters.map(chapter => {
                const chapterToRender =  
                    <li data-key={chapter.id}>
                        <ChapterListItem
                            {...chapter}
                            onEdit={this.editChapter}
                            onDelete={this.deleteChapter}
                        />
                    </li>

                return chapterToRender
            }) : null

            const candidateChapter = candidateChapters?.[volIndex]

            const volumeToRender = 
                <li data-key={volume.id}>
                    <VolumeListItem 
                        {...volume}
                        onEdit={this.editVolume} 
                        onDelete={this.deleteVolume}
                    />
                    <ol>
                        {chaptersList}
                        <CandidateChapter 
                            chapter={candidateChapter}
                            volIndex={volIndex}
                            onSubmit={this.onSubmitCandidateChapter}
                            onChange={this.onCandidateChapterInputChange}
                            onCancel={this.onCandidateChapterCancel}
                            // onSubmitPages={this.onSubmitPages}
                        />
                    </ol>
                </li>

            return volumeToRender
        }) : null

        return <div>
                    <ol>
                        {renderedVolumes}
                        <CandidateVolume 
                            volume={candidateVolume}
                            onSubmit={this.onSubmitCandidateVolume}
                            onChange={this.onCandidateVolumeInputChange} 
                            onCancel={this.onCandidateVolumeCancel}
                            // onCoverChange={this.onCoverCandidateVolumeChange}
                        />
                </ol>
            </div>
    }

    onContentSubmit = async (e) => {
        e.preventDefault()

        const {general, volumes} = this.state
        let formData = new FormData()

        formData = FormDataHelper.convertModelToFormData(formData, {...general, volumes}) 

        console.log('formData', formData)

        if(general._id){
            const comic = await apiService.editComic(formData)
            const comicIndex =  this.state.comics.findIndex(({_id}) => _id == comic._id)

            this.setState({
                comics: [
                    ...this.state.comics.slice(0, comicIndex),
                    comic,
                    ...this.state.comics.slice(comicIndex + 1)
                ],
                general: {},
                volumes: []
            })
        } else {
            const comic = await apiService.addComic(formData)
    
            this.setState({
                comics: [
                    ...this.state.comics,
                    comic
                ],
                general: {},
                volumes: []
            })
        }
    }

    onEdit = (comicId) => {
        const {volumes, ...rest} = this.state.comics.find(({id}) => id === comicId)

        console.log('onEdit')
        console.log('volumes', volumes)
        console.log('rest', rest)

        //TODO применить здесь грубокое копирование
        this.setState({
            general: rest,
            volumes
        })
    }

    renderGenres(genres){
        const reducer = (accumulator, {_id, name}) => { return {...accumulator, [_id]: name}}
        const result = genres.reduce(reducer, {})

        return result
    }

    renderStatuses(statuses){
        const reducer = (accumulator, {_id, name}) => {return {...accumulator, [_id]: name}}

        return statuses.reduce(reducer, {})
    }

    onCoverChange(e){
        this.setState({
            general: {
                ...this.state.general,
                [e.target.name]: e.target.files[0]
            }
        })
    }

    async handleDelete (e, id) {
        e.preventDefault()
        
        const resId = await apiService.deleteComic(id)

        if(resId){
            const comicIndex = this.state.comics.findIndex(({_id}) => _id == id)

            this.setState({
                comics: [
                    ...this.state.comics.slice(0, comicIndex),
                    ...this.state.comics.slice(comicIndex + 1)
                ],
                general: {},
                volumes: []
            })
        }
    }

    render(){
        const {loading, error, comics, statuses, genres, general} = this.state

        if(loading){
            return <Loader />
        }

        if(error){
            return <ErrorIndicator />
        }

        return <div>
                <Typography use="headline1">Комиксы</Typography>
                <Typography use="headline5">Список</Typography>
                {/* {this.renderComicsList(comics)} */}
                <ComicList comics={comics} onEdit={this.onEdit}/>
                <br />
                <br />
                <Typography use="headline5">Общее</Typography>
                <form>
                    <TextField 
                        name="title" 
                        label="Название"
                        value={general.title}
                        onChange={e => {
                            this.setState({
                                general: {
                                    ...general,
                                    [e.target.name]: e.target.value
                                }
                            })
                        }}
                        outlined/>
                    <TextField 
                        value={general.description}
                        onChange={e => {
                            this.setState({
                                general: {
                                    ...general,
                                    [e.target.name]: e.target.value
                                }
                            })
                        }}
                        name="description" 
                        label="Описание" 
                        textarea 
                        outlined/>
                    <Typography use="headline6">Обложка</Typography>
                    <Cover src={general.cover} />
                    <input 
                        type="file" 
                        name="cover" 
                        onChange={e => this.onCoverChange(e)}/>
                    {/* <Select 
                        name="genres" 
                        label="Жанры"
                        options={this.renderGenres(genres)}
                        onChange={({selectedIndex}) => {
                            this.setState({
                                general: {
                                    ...general,
                                    genres: selectedIndex
                                }
                            })
                        }}
                    ></Select> */}
                    <select 
                        name="genres" 
                        onChange={e => {
                            const values = [...e.target.options].filter(o => o.selected).map(selected => selected.value)
                            this.setState({
                                general: {
                                    ...general,
                                    genres: values
                                }
                            })
                        }}
                        multiple
                    >
                        {genres.map(genre => <option value={genre._id} selected={general.genres?.includes(genre._id)}>{genre.name}</option>)}
                    </select>
                    <Select 
                        defaultValue={general?.status ?? 0}
                        // defaultValue={0}
                        name="status" 
                        label="Статус"
                        options={this.renderStatuses(statuses)}
                        onChange={({value}) => {
                            console.log('setStatus', general, this.state.general)
                            this.setState({
                                general: {
                                    ...this.state.general,
                                    status: value
                                }
                            })
                        }}
                    ></Select>
                    <Checkbox 
                        label="Контент для взрослых" 
                        name="isMature"
                        checked={general.isMature}
                        onChange={e => {
                            console.log('checkbox onChange target = ', e.target)
                            this.setState({
                                general: {
                                    ...general,
                                    [e.target.name]: e.target.checked
                                }
                            })
                        }}
                    />
                </form>
                <Typography use="headline5">Содержание</Typography>
                <form>
                    {this.renderVolumes(this.state.volumes)}
                    <br />
                    <Button onClick={this.onContentSubmit}>Сохранить</Button>
                    {general._id && <Button onClick={e => this.handleDelete(e, general._id)}>Удалить комикс</Button>}
                </form>
        </div>
    }
}