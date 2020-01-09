import React, {Component} from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
    background-color: ${props => props.bg};
    border: 2px solid #494949;
    border-color: ${props => props.border}
    border-radius: 10px;
    color: ${props => props.color}
    padding: 1rem 1.625rem;
    cursor: pointer;
    :hover{
        box-shadow: -8px 8px 0px #E0E0E0;
        transform: translateX(8px);
        transform: translateY(-8px);
    }
    transition: all 0.2s ease-in;
`
class Button extends Component{

    render(){
        const {border, bg, color, onClick} = this.props
        return(
            <ButtonWrapper border={border} bg={bg} color={color} onClick={onClick}>
                {this.props.children}
            </ButtonWrapper>
        )
    }
}

export default Button