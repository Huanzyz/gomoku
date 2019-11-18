import React from 'react'
import styled,{css} from 'styled-components'

const OWrapper = styled.div`
    z-index: 1;
    width: ${props => `calc(${props.width}*0.7)`};
    height: ${props => `calc(${props.height}*0.7)`};
    border-radius: 50%;
    border: ${props => `calc(${props.width}*0.1) solid ${props.color}`};
`
const O = ({width, height, color}) => {
    return(
        <OWrapper width={width} height={height} color={color} />
    )
}

export default O;