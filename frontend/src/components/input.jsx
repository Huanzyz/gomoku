import React, { Component } from 'react'
import styled from 'styled-components'
const InputFocusGroup = styled.div`
    width: 100%;
`
const MainInput = styled.input`
    border: none;
    border-radius: 0;
    background-color: #F2F2F2;
    width: 100%;
    height: 2.25rem;
    padding: 1rem 0.7rem;    
    :focus {
        outline: none;
    }
`
const HoverLine = styled.div`
    height: 0.2rem;    
    width: 0%;
    background-color: ${props => props.error === true ? "#EF4128" : props.color};
    transition: width 0.5s linear;      
    ${InputFocusGroup}:hover & {
        width: 100%;
    }
    width: ${props => props.input === "" ? "0%" : "100%"}

`

class Input extends Component {
    render() {
        const {name, type, value, onChange, error, color} = this.props;
        return (
            <InputFocusGroup>
                <MainInput
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
                <HoverLine input={value} error={error} color={color}></HoverLine>
            </InputFocusGroup>
        )
    }
}

export default Input
