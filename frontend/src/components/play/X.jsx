import React from 'react'
import styled from 'styled-components'

const XWrapper = styled.div`
    width: ${props => `calc(${props.width}*0.8)`};
    height: ${props => `calc(${props.height}*0.8)`};
    position: relative;
    z-index: 1;
`
const LeftPart = styled.div`
    position: absolute;
    width: ${props => `calc(${props.width}*0.1)`};
    background-color: ${props => props.color}};
    height: ${props => `calc(${props.height}*0.8)`};
    transform: translate3d(-50%, -50%, 0) rotate(-45deg);
    top: 50%;
    left: 50%;
`
const RightPart = styled.div`
    position: absolute;
    width: ${props => `calc(${props.width}*0.1)`};
    background-color: ${props => props.color};
    height: ${props => `calc(${props.height}*0.8)`};
    transform: translate3d(-50%, -50%, 0) rotate(45deg);
    top: 50%;
    left: 50%;
`
const X = ({width, height, color}) => {
    return (
        <XWrapper width={width} height={height}>
            <LeftPart width={width} height={height} color={color}/>
            <RightPart width={width} height={height} color={color}/>
        </XWrapper>
    )
}

export default X