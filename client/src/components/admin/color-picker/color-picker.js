import React, { Component } from 'react'

import ColorResult from './color-result'
import Hue from './hue'
import Square from './square'
import Alpha from './alpha'
import Modal from './modal'
import config from './config'
import {HSLtoRGB, RGBtoHSL, HEXtoRGB, RGBtoHEX} from './helpers'

import './color-picker.scss'

const {
    squareSize,
    crossSize,
    H_MAX,
    SL_MAX,
    ALPHA_MAX,
    RGB_MAX
} = config

class Input extends Component {
    constructor(props){
        super(props)
        this.state = {
            blurValue: null,
            value: props.value
        }
    }

    componentDidUpdate(prevProps, prevState){
        const {blurValue, value} = this.state

        if(
            prevState.blurValue != blurValue
            && blurValue !== null
        ){
            console.log('Input componentDidUpdate value', blurValue, value)

            //отправляем новое значение вверх
            this.props.onChange(blurValue)
        }

        if(
            //если значение пришло сверху и оно было сгенерено не через onchange
            prevState.value === value
            && this.props.value !== value
            && blurValue === null){
                console.log('Input componentDidUpdate set prop.value', this.props.value)

            this.setState({value: this.props.value})
        }
    }

    onChange = (e) => {
        let {value} = e.target
        let blurValue = null
        const {validateInput} = this.props
        console.log('Input onChange value', value)

        if(typeof validateInput === "function"){
            
            blurValue = validateInput(value)
            console.log('Input validateInput', blurValue)
            if(blurValue !== null){
                this.setState({blurValue})
            }
        }
        console.log('Input setState', value)

        this.setState({value})
    }

    onBlur = () => {
        this.setState({blurValue: null})
    }

    render(){
        const {value} = this.state

        return (
            <input 
                {...this.props} 
                type="text"
                onChange={this.onChange} 
                onBlur={this.onBlur} 
                value={value}
            />
        )
    }
}

class InputGroup extends Component {
    types = ["hsl", "rgb", "hex"]

    state = {
        type: "rgb"
    }

    validateRGBNumber(value){
        let blurValue = value
        //если число
        if(!isNaN(value)){
            if(blurValue < 0){
                blurValue = 0
            } else if(blurValue > RGB_MAX){
                blurValue = RGB_MAX
            } 

            blurValue = Math.round(blurValue)

            return blurValue
        }

        return null
    }

    validateAlphaNumber(value){
        let blurValue = value
        //если число
        if(!isNaN(value)){
            if(blurValue < 0){
                blurValue = 0
            } else if(blurValue > ALPHA_MAX){
                blurValue = ALPHA_MAX
            } 

            return blurValue
        }

        return null
    }

    validateHEXNumber(value){
        let blurValue = value
        const pattern = /^#[a-f0-9]{6}$/

        if(pattern.test(blurValue)){
            return blurValue
        }

        return null
    }

    validateHNumber(value){
        let blurValue = value
        //если число
        if(!isNaN(blurValue)){
            if(blurValue < 0){
                blurValue = 0
            } else if(blurValue > H_MAX){
                blurValue = H_MAX
            }
            blurValue = Math.round(blurValue)

            return blurValue
        }

        return null
    }

    validateSLNumber(value){
        let blurValue = value
        //если число
        if(!isNaN(blurValue)){
            if(blurValue < 0){
                blurValue = 0
            } else if(blurValue > SL_MAX){
                blurValue = SL_MAX
            }
            blurValue = Math.round(blurValue)

            return blurValue
        }

        return null
    }

    renderInputs(type){
        const {color: {h, s, l, a}, setInputColor} = this.props
        const {r, g, b} = HSLtoRGB({h, s, l})
        const hex = RGBtoHEX({r, g, b})

        console.log(`renderInputs convert from h:${h} s:${s} l:${l} to r:${r} g:${g} b:${b}`)

        switch(type){
            case "hsl":
                return (
                    <div className="color-picker__hsl">
                        <Input validateInput={this.validateHNumber} placeholder="H" onChange={(val) => setInputColor("h", val)} value={h}/>
                        <Input validateInput={this.validateSLNumber} placeholder="S" onChange={(val) => setInputColor("s", val)} value={s}/>
                        <Input validateInput={this.validateSLNumber} placeholder="L" onChange={(val) => setInputColor("l", val)} value={l}/>
                        <Input validateInput={this.validateAlphaNumber} placeholder="A" onChange={(val) => setInputColor("a", val)} value={a}/>
                    </div>
                )
            case "rgb":
                return (
                    <div className="color-picker__rgba">
                        <Input placeholder="R" validateInput={this.validateRGBNumber} onChange={(val) => setInputColor('r', val)} value={r}/>
                        <Input placeholder="G" validateInput={this.validateRGBNumber} onChange={(val) => setInputColor('g', val)} value={g}/>
                        <Input placeholder="B" validateInput={this.validateRGBNumber} onChange={(val) => setInputColor('b', val)} value={b}/>
                        <Input placeholder="A" validateInput={this.validateAlphaNumber} onChange={(val) => setInputColor('a', val)} value={a}/>
                    </div>
                )
            case "hex":
                return (
                    <div className="color-picker__hex">
                        <Input validateInput={this.validateHEXNumber} placeholder="#000000" onChange={(val) => setInputColor("hex", val)} value={hex}/>
                    </div>
                )
            default: return null
        }
    }

    renderInputOptions(options, type, alpha){
        const optionsToRender = options.map(option => {
            const disabled = (option === 'hex') && (alpha < ALPHA_MAX)

            return (
                <option 
                    selected={type === option} 
                    disabled={disabled}
                    value={option}>
                        {option}
                </option>)
        })

        return optionsToRender
    }

    onTypeChange = ({target: {value : type}}) => {
        this.setState({
            type
        })
    }

    render(){
        const {type} = this.state
        const {color: {a}} = this.props

        return <div className="color-picker__input">
            {this.renderInputs(type)}
            
            <select onChange={this.onTypeChange}>
                {this.renderInputOptions(this.types, type, a)}
            </select>
        </div>
    }
}

export default class ColorPicker extends Component {
    state = {
        // hsla: this.props.color,
        squareXY: [squareSize - crossSize/2, crossSize/-2],
        // inputType: 'rgb',
        show: false
    }

    componentDidMount(){
        const {color} = this.props

        this.setState({
            squareXY: this.computeSquareXY(color.s, color.l)
        })
    }

    componentDidUpdate(prevProps){
        const {color} = this.props

        if(prevProps.color !== color) {
            this.setState({
                squareXY: this.computeSquareXY(color.s, color.l)
            })
        }
    }

    setInputColor = (name, value) => {
        const {color, setColor} = this.props
        let rgb = null
        
        console.log('setInputColor color = ', color)
        switch(name){
            case "r":
            case "g":
            case "b":
                rgb = HSLtoRGB(color)
                const hsl = RGBtoHSL({...rgb, [name]: value})

                console.log('setInputColor hsl = ', {...hsl})
                console.log('setInputColor rgb = ', {...rgb, [name]: value})

                setColor({
                    ...color,
                    ...hsl
                })
            ;break;
            case "hex":
                rgb = HEXtoRGB(value)

                if(rgb !== null){
                    const hsl = RGBtoHSL(rgb)
                    setColor({
                        ...color,
                        ...hsl
                    })
                }
            ;break;
            case "h": 
            case "s":
            case "l":
            case "a":
                setColor({
                    ...color,
                    [name]: value
                })
            ;
        }
    }

    computeSquareXY(s, l) {
        const t = (s * (l < 50 ? l : 100 - l)) / 100
        const s1 = Math.round((200 * t) / (l + t)) | 0
        const b1 = Math.round(t + l)
        const x = (squareSize / 100) * s1 - crossSize / 2
        const y = squareSize - (squareSize / 100) * b1 - crossSize / 2

        return [x, y]
    }  

    onColorClick = () => {
        this.setState({
            show: !this.state.show
        })
    }

    onModalClose = () => {
        this.setState({
            show: false
        })
    }

    onSLChange = ({s, l}) => {
        const {setColor, color} = this.props
        setColor({...color, s, l})
    }

    render (){
        const {squareXY, show} = this.state
        const {color, setColor} = this.props
        const {h, a} = color

        return (
                <div className="color-picker">
                    <Modal onClick={this.onModalClose} show={show}>
                        <Square 
                            hue={h} 
                            squareXY={squareXY} 
                            setSL={this.onSLChange}
                        />
                        <div className="color-picker__panel">
                            <Hue
                                hue={h}
                                setHue={(h) => setColor({...color, h})}
                            />

                            <Alpha 
                                color={HSLtoRGB(color)}
                                alpha={a}
                                setAlpha={(a) => setColor({...color, a})}
                            />
                            <InputGroup setInputColor={this.setInputColor} color={color}/>
                        </div>
                    </Modal>

                    <div className="color-picker__color-result">
                        <ColorResult color={color} onClick={this.onColorClick}/>
                    </div>
                </div>
        )
    }
}