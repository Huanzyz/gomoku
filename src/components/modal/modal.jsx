import React, { Component } from 'react'
import styled from 'styled-components'
import JoinRoom from './join-room'

const BackDrop = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: fixed;
    transition: all 1.3s;
    width: 100%;
    z-index: 3;
`
class Modal extends Component {
    handleScrolling = e => {
        e.preventDefault();
        console.log('touch moved')
    }
    render() {
        const {onClose} = this.props
        return (
            <BackDrop>
                <JoinRoom onClose={onClose}/>
            </BackDrop>
        )
    }
}

export default Modal
