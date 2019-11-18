import React, {Component} from 'react'
import styled,{keyframes, css} from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const ButtonWrapper = styled.div`
    border-radius: 10px;
    cursor: pointer;
    :hover{
        border-color: ${props=> props.color} !important;
        background-color: ${props=> props.color};
        box-shadow: -8px 8px 0px #E0E0E0;
        transform: translateX(8px);
        transform: translateY(-8px);
    }
    transition: background-color 0.5s ease-in-out, border-color 0.1s linear, transform 0.2s ease-in, box-shadow 0.2s ease-in;
    border: 2px solid rgba(0, 0, 0, 0.54);
    border-color: ${props => props.loading ? props.color : 'rgba(0, 0, 0, 0.54)'};
    background-color: ${props => props.loading ? props.color : 'transparent' };
`
const Logo = styled.div`
    margin: 0.875rem;
    width: 1.5rem;
    height: 1.5rem;
    background-image: ${props => css`url(${props.before})`};
    ${ButtonWrapper}:hover & {
        background-image: ${props => css`url(${props.after})`};
    }
    transition: background-image 0.5s ease-in-out;    
    background-image: ${props => props.loading ? css`url(${props.after})` : css`url(${props.before})`};
    animation: ${props => props.loading ? css`${rotate} 1s linear infinite;` : 'none' }
`

class Button extends Component{
    render(){
        const{color, before, after, loading, onClick} = this.props
        return(
            <ButtonWrapper color={color} loading={loading} onClick={onClick}>
                <Logo before={before} after={after} loading={loading}/>
            </ButtonWrapper>
        )
    }
}

export default Button