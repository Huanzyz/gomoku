import React from 'react'
import styled,{css} from 'styled-components'
import { callbackify } from 'util'

const TimeBar = styled.div`
    width: 100%;
    background-color: #333333;
    transition: ${props => props.time !== props.max ? 'width 1s linear' : 'none'};
    height: 10px;
    width: ${props => `calc(100%/${props.max}*${props.time})` }
`

const TimeProgress = ({time, max}) => {
    return (
        <TimeBar time={time} max={max}/>
    )
}

export default TimeProgress