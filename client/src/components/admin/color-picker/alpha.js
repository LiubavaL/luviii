import React, { Component } from 'react'

import throttle from 'lodash.throttle'

import Handle from './handle'
import config from './config'
import { HSLtoRGB } from './helpers'

const {barSize, squareSize } = config


export default class Alpha extends Component {
    constructor(props){
        super(props)
        this.alpha = React.createRef()
        this.canvas = React.createRef()
    }

    componentDidMount(){
        const alphaEl = this.alpha.current
        const canvasEl = this.canvas.current

        this.paintAlpha(canvasEl)
        this.initAlphaEvents(alphaEl)
    }

    componentDidUpdate(prevProps){
        if(prevProps.color !== this.props.color){
            const canvasEl = this.canvas.current
            
            this.paintAlpha(canvasEl)
        }
    }

    createPattern(canvasEl){
        const ctx = canvasEl.getContext('2d')
        ctx.clearRect(0, 0, squareSize, barSize)
        ctx.fillStyle = 'gray'

        const s = barSize/3
        let x1 = s, y1 = 0
        const w = squareSize
        const h = barSize

        while(h > y1 - s) {
            //стартовое значение x1 либо s, либо 0
            x1 = y1 % (2*s) ? 0 : s

            while(w > x1 - s) {
                ctx.fillRect(x1, y1, s, s)
                x1 += (2*s)
            }

            y1 += s
        }
    }

    paintAlpha(canvasEl){
        const ctx = canvasEl.getContext('2d')
        const {r, g, b} = this.props.color
        console.log('this.props.color', this.props.color)

        ctx.clearRect(0, 0, squareSize, barSize)
        this.createPattern(canvasEl)

        const gradientAlpha = ctx.createLinearGradient(0, 0, squareSize, 0)
        gradientAlpha.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        gradientAlpha.addColorStop(1, `rgba(${r}, ${g}, ${b}, 1)`)

        ctx.fillStyle = gradientAlpha
        ctx.fillRect(0, 0, squareSize, barSize)
    }

    onMouseMove = throttle((e) => {
        console.log('alpha onMouseMove')
        const {clientX} = e
        const targetX = this.canvas.current.getBoundingClientRect().left
        let alphaX = clientX - targetX
        const {setAlpha} = this.props
        
        console.log('alphaX', alphaX)
        console.log('squareSize', squareSize)
        
        if(alphaX < 0){
            alphaX = 0
        } else if(alphaX > squareSize){
            alphaX = squareSize
        }
        const alpha = + (alphaX / squareSize).toFixed(3)
        
        // alphaX -= barSize/2

        // setAlphaX(alphaX)
        setAlpha(alpha)
    }, 150)

    onMouseDown = () => {
        console.log('alpha onMouseDown')

        document.body.addEventListener('mousemove', this.onMouseMove)
        document.body.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseUp = () => {
        console.log('alpha onMouseUp')

        document.body.removeEventListener('mousemove', this.onMouseMove)
        document.body.removeEventListener('mouseup', this.onMouseUp)
    }

    initAlphaEvents(alpahEl){
        alpahEl.addEventListener('mousedown', this.onMouseDown)
    }

    componentWillUnmount(){
        this.alpha.current.removeEventListener('mousedown', this.onMouseDown)
    }

    render(){
        const {alpha} = this.props
        const alphaX = (squareSize * alpha) - barSize/2

        console.log('alpha = ', alpha)
        console.log('alphaX = ', alphaX)

        return (
            <div className="color-picker__alpha" ref={this.alpha}>
                <Handle left={alphaX} size={barSize}/>
                <canvas 
                    ref={this.canvas} 
                    width={squareSize} 
                    height={barSize}/>
            </div>
        )
    }
}