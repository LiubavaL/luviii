import React, { Component } from 'react'

import throttle from 'lodash.throttle'

import config from './config'
import Handle from './handle'

import './color-picker.scss'

const {barSize, squareSize, hueSize, H_MAX} = config

export default class Hue extends Component {
    constructor(props){
        super(props)
        this.hue = React.createRef()
        this.canvas = React.createRef()
    }

    componentDidMount(){
        const canvasEl = this.canvas.current
        const hueEl = this.hue.current
        
        this.paintHue(canvasEl)
        this.initHueEvents(hueEl)
    }

    paintHue(canvasEl){
        const ctxHue = canvasEl.getContext('2d')

        ctxHue.rect(0, 0, squareSize, barSize)
        const gradientHue = ctxHue.createLinearGradient(0, 0, squareSize, 0)

        for(var i = 0 ; i <= 360; i+= 30){
            gradientHue.addColorStop(i/360, `hsl(${i}, 100%, 50%)`)
        }

        ctxHue.fillStyle = gradientHue
        ctxHue.fill()
    }

    initHueEvents(hueEl){
        document.body.addEventListener('mouseup', this.onHueMouseUp)
        hueEl.addEventListener('mousedown', this.onHueMouseDown)
    }

    onHueMouseMove = throttle((e) => {
        const {clientX} = e
        const canvasEl = this.canvas.current
        const {setHue} = this.props
        const targetX = canvasEl.getBoundingClientRect().left
        let hueX = clientX - targetX
        const barRadius = barSize/2
        // console.log('onHueMouseMove hueX', hueX)
        
        if(hueX < 0){
            hueX = -barRadius
        } else if(hueX > squareSize){
            hueX = squareSize - barRadius
        } else {
            hueX -= barRadius
        }

        const hue = Math.floor((360 * (hueX + barRadius)) / squareSize)
        setHue(hue)
    }, 150)

    onHueMouseUp = () => {
        document.body.removeEventListener('mousemove', this.onHueMouseMove)
    }

    onHueMouseDown = () => {
        document.body.addEventListener('mousemove', this.onHueMouseMove)
    }

    componentWillUnmount(){
        document.body.removeEventListener('mouseup', this.onHueMouseUp)
        this.hue.current.removeEventListener('mousedown', this.onHueMouseDown)
    }

    render(){
        const {hue} = this.props
        const hueX = (squareSize * hue) / H_MAX - barSize/2

        return (
            <div className="color-picker__hue" ref={this.hue}>
                <Handle left={hueX} size={barSize}/>
                <canvas 
                    width={squareSize} 
                    height={barSize} 
                    ref={this.canvas}/>
            </div>
        )
    }
}