import React, { Component } from 'react'

import throttle from 'lodash.throttle'

import config from './config.js'
import {RGBtoHSL} from './helpers'

import './color-picker.scss'

const {squareSize, crossSize} = config

const Cross = ({top, left, size}) => {
    return <div 
            className="color-picker__cross" 
            style={{
                left, 
                top, 
                width: `${size}px`, 
                height: `${size}px`
            }}>
                <span className="color-picker__dot"></span>
            </div>
}

export default class Square extends Component {
    constructor(props){
        super(props)
        this.canvas = React.createRef()
        this.sqare = React.createRef()
    }

    componentDidMount(){
        const canvasEl = this.canvas.current
        const sqareEl = this.sqare.current
        const {hue} = this.props

        this.paintSquare(canvasEl, hue)
        this.initSquareEvents(sqareEl)
    }

    componentDidUpdate(prevProps){
        const {hue} = this.props

        if(prevProps.hue !== hue){
            //init new square canvas
            const square = this.canvas.current

            this.paintSquare(square, hue)
        }
    }

    componentWillUnmount(){
        const canvasEl = this.canvas.current

        canvasEl.addEventListener('mousedown', this.onMouseDown)
        document.body.removeEventListener('mousemove', this.changeColor)
        document.body.removeEventListener('mouseup', this.onMouseUp)
    }

    paintSquare(canvasEl, hue){
        const ctxSquare = canvasEl.getContext('2d')
        ctxSquare.fillStyle = `hsl(${hue}, 100%, 50%)`
        ctxSquare.fillRect(0, 0, squareSize, squareSize)

        const gradientSquareWhite = ctxSquare.createLinearGradient(0, 0, squareSize, 0)
        gradientSquareWhite.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradientSquareWhite.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctxSquare.fillStyle = gradientSquareWhite
        ctxSquare.fillRect(0, 0, squareSize, squareSize)

        const gradientSquareBlack = ctxSquare.createLinearGradient(0, 0, 0, squareSize)
        gradientSquareBlack.addColorStop(0, 'rgba(0, 0, 0, 0)')
        gradientSquareBlack.addColorStop(1, 'rgba(0, 0, 0, 1)')
        ctxSquare.fillStyle = gradientSquareBlack
        ctxSquare.fillRect(0, 0, squareSize, squareSize)
    }

    initSquareEvents(sqareEl){
        sqareEl.addEventListener('mousedown', this.onMouseDown)
    }

    changeColor = throttle ((e) => {
        const {setSquareXY, setSL} = this.props
        const canvasEl = this.canvas.current
        const crossRadius = crossSize/2

        const getMousePosition = (e) => {
            const {clientX, clientY} = e
            const squareRect = canvasEl.getBoundingClientRect()
            const {left : squareX, top : squareY} = squareRect
            let mouseX = clientX - squareX
            let mouseY = clientY - squareY
            /*
            mouseX [0;150]
            mouseY [0;150]
            */
            console.log('mouseX=' ,mouseX)
            console.log('mouseY=' ,mouseY)

            if(mouseX < 0){
                mouseX = -crossRadius
            } else if (mouseX > squareSize) {
                mouseX = squareSize - crossRadius
            } else {
                mouseX = mouseX - crossRadius
            }
    
            if(mouseY < 0){
                mouseY = -crossRadius
            } else if (mouseY > squareSize - crossRadius) {
                mouseY = squareSize - crossRadius
            } else {
                mouseY = mouseY - crossRadius
            }
            console.log('mouseY=' ,mouseY)
            console.log('mouseX=' ,mouseX)
            return [mouseX, mouseY]
        }

        const getImageRGB = ([x, y]) => {
            const x1 = Math.min(x + crossRadius, squareSize - 1)
            const y1 = Math.min(y + crossRadius, squareSize - 1)
            console.log('changeColor x1', x1)
            console.log('changeColor y1', y1)

            const ctxSquare = canvasEl.getContext('2d')
            const imageData = ctxSquare.getImageData(x1, y1, 1, 1)
            console.log('changeColor imageData', imageData.data)

            return imageData.data
        }

        let [mouseX, mouseY] = getMousePosition(e)
        const [r, g, b] = getImageRGB([mouseX, mouseY])
        const {s, l} = RGBtoHSL({r, g, b})

        setSL({s, l})
        // setSquareXY([mouseX, mouseY])
    }, 300)

    onMouseDown = (e) => {
        this.changeColor(e)
        document.body.addEventListener('mousemove', this.changeColor)
        document.body.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseUp = () => {
        document.body.removeEventListener('mousemove', this.changeColor)
        document.body.removeEventListener('mouseup', this.onMouseUp)
    }

    render(){
        const [squareX, squareY] = this.props.squareXY

        return (
            <div className="color-picker__color" ref={this.sqare}>
                <Cross left={squareX} top={squareY} size={crossSize}/>
                <canvas width={squareSize} height={squareSize} ref={this.canvas}/>
            </div>
        )
    }
}