import React, {Component} from 'react'
import {Editor, EditorState, RichUtils, CompositeDecorator, DefaultDraftBlockRenderMap, Modifier, convertToRaw, ContentState} from 'draft-js'
import {Map} from 'immutable'
import config from './config'
import 'draft-js/dist/Draft.css'
import HelperText from '../../helper-text/helper-text'

import './editor.scss'

const HashtagSpan = (props) => {
    return <span className="hashtag"  data-offset-key={props.offsetKey}>{props.children}</span>
}

const Link = (props) => {
    const {contentState, entityKey} = props

    const entity = contentState.getEntity(entityKey)
    const {url} = entity.getData()

    return <a href={`http://${url}`} className="linkStyle">{props.children}</a>
}

class CustomSpan extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
        const {block, contentState} = this.props
        console.log('custom span prop', this.props)
        // console.log('custom span block.getEntityAt(0)', block.getEntityAt(0))
        // const data = contentState.getEntity(block.getEntityAt(0)).getData();

        // console.log('custom span data', data)
      return (
        <div className='CustomSpan'>
          {/* here, this.props.children contains a <section> container, as that was the matching element */}
          {this.props.children}
        </div>
      );
    }
  }

export default class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.compositeDecorator = new CompositeDecorator([
            {
                strategy: this.hashtagStrategy,
                component: HashtagSpan
            },
            {
                strategy: this.linkStrategy,
                component: Link
            }
        ])
        const editorState = this.createEditorState(this.compositeDecorator)
        this.state = {
            editorState,
            emojiModalOpen: false
        }
        this.editorFlag = false
        document.addEventListener('click', (e) => {
            console.log('document click: editorFlag=', this.editorFlag)

            if(!this.editorFlag){
                this.setState({
                        emojiModalOpen: false
                    })
            }else {
                this.editorFlag = false
            }
        })
    }

    componentDidUpdate(prevProp){
        const {editorState} = this.props
        const newState = {}
        console.log('Editor componentDidUpdate', editorState)
        if(prevProp.editorState !== editorState){
            console.log('Editor componentDidUpdate: editorState changed')
            if(editorState){
                newState.editorState = EditorState.set(editorState, {
                    decorator: this.compositeDecorator
                })
            } else {
                newState.editorState = EditorState.createEmpty(this.compositeDecorator)
            }
        }
        if(Object.keys(newState).length){
            this.setState(newState)
        }
    }

    onChange = editorState => {
        const {onEditorStateChange} = this.props
        onEditorStateChange(editorState)
    }

    createEditorState = (compositeDecorator) => {
        let editorState

        if(this.props.editorState){
            editorState = EditorState.set(this.props.editorState, {
                decorator: compositeDecorator,
            })
        }

        if(!editorState){
            editorState = EditorState.createEmpty(compositeDecorator)
        }

        return editorState
    }

    hashtagStrategy = (contentBlock, callback, contentState) => {
        this.findWithRegex(/\#[\w\u0590-\u05ff]+/g, contentBlock, callback)
    }

    linkStrategy = (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges(
            (characterMetadata) => {
                const entityKey = characterMetadata.getEntity()

                return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
            },
            callback
        )
    }

    findWithRegex(regex, contentState, callback ){
        const text = contentState.getText()
        let matchArr, start
        while((matchArr = regex.exec(text)) !== null){
            start = matchArr.index
            callback(start, start + matchArr[0].length)
        }
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        if(newState){
            this.onChange(newState)
            return 'handled'
        }

        return 'no-handled'
    }

    myBlockStyleFn = (contentBlock) => {
        const type = contentBlock.getType()

        console.log('myBlockStyleFn type = ', type)

        if (type === 'blockquote') {
            return 'superFancyBlockquote';
        }

        if(type === 'header-one'){
            return 'unstyledCustomClass'
        }
    }

    _onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }

    _onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    _onUnderlinelick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
    }

    _onStrikeClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'))
    }

    _onUndoClick = () => {
        this.onChange(EditorState.undo(this.state.editorState))
    }

    _onRedoClick = () => {
        this.onChange(EditorState.redo(this.state.editorState))
    }

    _onLinkClick = () => {
        const urlValue = prompt('Url: ', '')
        const contentState = this.state.editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity('LINK', 'SEGMENTED', {url: urlValue})
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const contentStateWithLink = Modifier.applyEntity(
            contentStateWithEntity,
            this.state.editorState.getSelection(),
            entityKey,
          )
        // const newEditorState = EditorState.set(this.state.editorState, {
        //     currentContent: contentStateWithLink,
        // })
        const newEditorState = EditorState.push(this.state.editorState, contentStateWithLink)
        this.onChange(newEditorState)
    }

    _onUnlinkClick = () => {
        const {editorState} = this.state

        const newEditorState = RichUtils.toggleLink(
            editorState,
            editorState.getSelection(),
            null
        )

        this.onChange(newEditorState)
    }

    _onTypeChange = (e) => {
        const value = e.target.value
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, value))
    }

    _onUlClick = () => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'))
    }

    _onOlClick = () => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'))
    }

    _onFontSizeChange = (e) => {
        const value = e.target.value

        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, `fontsize-${value}`))
    }

    _onResetStyleClick = () => {
        const {editorState} = this.state
        let contentState = editorState.getCurrentContent()
        const styles = [
            'BOLD',
            'UNDERLINE',
            'ITALIC',
            'STRIKETHROUGH'
        ]

        styles.forEach(style => {
            contentState = Modifier.removeInlineStyle(contentState, editorState.getSelection(), style)
        })
        this.onChange(EditorState.push(editorState, contentState))
    }

    _onEmojiClick = (e) => {
        console.log('emoji btn click', this.editorFlag)
        this.setState({
            emojiModalOpen: true
        })
    }

    _onEmojiIconClick = (e) => {
        const emoji = e.target.innerHTML
        const editorState = this.state.editorState
        let contentState = editorState.getCurrentContent()

        contentState = Modifier.replaceText(
            contentState,
            editorState.getSelection(),
            emoji
        )

        this.onChange(EditorState.push(editorState, contentState))
        this.setState({emojiModalOpen: false})
    }


    logBlock = () => {
        const newContent = RichUtils.tryToRemoveBlockStyle(this.state.editorState)
        console.log('newContent', newContent)
        console.log('logBlock', this.onChange(EditorState.push(this.state.editorState, newContent)))
    }



    myBlockRenderer = (contentBlock) => {
        const type = contentBlock.getType()

        console.log('myBlockRenderer contentBlock = ', contentBlock)
        console.log('myBlockRenderer type = ', type)

        if(type === 'section'){
            return {
                component: CustomSpan,
                props: {
                    foo: 'bar',
                  },
            }
        }
    }

    renderEmojiModal(){
        const {emojis} = config

        const renderedEmojis = emojis.map(emoji => <span className="emoji-modal__icon" alt="" onClick={this._onEmojiIconClick}>{emoji}</span> )

        return <div class="emoji-modal" onClick={(e) => {console.log('modal click');}}>
            {renderedEmojis}
        </div>
    }

    getClassNames(){
        const {invalid} = this.props

        return `editor
            ${invalid ? ' editor--invalid' : ''}
        `
    }

    render() {
        const {helpText} = this.props
        const {props, emojiModalOpen} = this.state
        const blockRenderMap = Map({
            'CustomSpan': {
                element: 'h2',
                wrapper: <CustomSpan />
            }
        })
        const customStyleMap = {
            'STRIKETHROUGH': {
                textDecoration: 'line-through'
            }
        }
        const fontSizes = [8, 12, 14, 16, 20, 22, 24]

        fontSizes.forEach((val) => {
            customStyleMap[`fontsize-${val}`] = {fontSize: `${val}px`}
        })
        const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)
        // console.log('DefaultDraftBlockRenderMap ', DefaultDraftBlockRenderMap.toJS())
        // console.log('extendedBlockRenderMap ', extendedBlockRenderMap.toJS())

        return <>
            <button onClick={this._onItalicClick} type="button">Italic</button>
            <button onClick={this._onUnderlinelick} type="button">Underline</button>
            <button onClick={this._onStrikeClick} type="button">Strickethrough</button>
            <button onClick={this._onUndoClick} type="button">Undo</button>
            <button onClick={this._onRedoClick} type="button">Redo</button>
            <button onClick={this._onUlClick} type="button">UL</button>
            <button onClick={this._onBoldClick} type="button">Bold</button>
            <button onClick={this._onOlClick} type="button">OL</button>
            <select onChange={this._onTypeChange}>
                <option value="unstyled" selected>Normal</option>
                <option value="header-one">Header 1</option>
                <option value="header-two">Header 2</option>
                <option value="header-three">Header 3</option>
                <option value="header-four">Header 4</option>
                <option value="header-five">Header 5</option>
                <option value="header-six">Header 6</option>
                <option value="blockquote">Blockquote</option>
                <option value="code-block">Code</option>
            </select>
            <select onChange={this._onFontSizeChange}>
                {
                    fontSizes.map((val) => <option value={val} selected={val === 16}>{val}px</option>)
                }
            </select>
            <button onClick={this._onLinkClick} type="button">Link</button>
            <button onClick={this._onUnlinkClick} type="button">Unlink</button>
            <div className="emoji-control" onClick={e => {console.log('emoji wrapper click:', this.editorFlag);this.editorFlag = true}}>
                <button onClick={this._onEmojiClick} type="button">Emoji</button>
                {emojiModalOpen && this.renderEmojiModal()}
            </div>
            <button onClick={this._onResetStyleClick} type="button">Remove</button>

            <div className={this.getClassNames()}>
                <Editor 
                    editorState={this.state.editorState} 
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange} 
                    //by blockStyleFn it is possible to specify classes that should be applied to blocks at render time.
                    blockStyleFn={this.myBlockStyleFn}
                    //Draft's default block render map can be overwritten by passing an Immutable Map to the editor blockRender props.
                    blockRenderMap={extendedBlockRenderMap}
                    //This prop function allows a higher-level component to define custom React rendering for ContentBlock objects, based on block type, text, or other criteria.
                    blockRendererFn={this.myBlockRenderer}
                    customStyleMap={customStyleMap}
                    {...props}
                />
            </div>
            {helpText && <div className="editor__helper-text">{helpText}</div>}
            {/* <button onClick={this.logBlock} type="button">Log Block</button> */}
        </>
    }
}