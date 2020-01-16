import React, {Component} from 'react'
import styled,{css} from 'styled-components'

const ButtonWrapper = styled.div`
    border: 2px solid rgba(0, 0, 0, 0.54);
    border-radius: 10px;
    :hover{
        border-color: ${props=> props.color} !important;
        background-color: ${props=> props.color};
        box-shadow: -8px 8px 0px #E0E0E0;
        transform: translateX(8px);
        transform: translateY(-8px);
    }
    transition: background-color 0.5s ease-in-out, border-color 0.1s linear, transform 0.2s ease-in, box-shadow 0.2s ease-in;
    cursor: pointer;
`
const Logo = styled.div`
    margin: 0.875rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: ${props=> css`url(${props.before})`};
    ${ButtonWrapper}:hover & {
        background-image: ${props=> css`url(${props.after})`};
    }
    transition: background-image 0.5s ease-in-out;
`

class Button extends Component{
    render(){
        const {
            color,
            before,
            after,
            onClick
        } = this.props
        return(
            <ButtonWrapper color={color} onClick={onClick} >
                <Logo before={before} after={after}/>
            </ButtonWrapper>
        )
    }
}

export default Button