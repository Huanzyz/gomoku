import React, { Component } from 'react'
import styled from 'styled-components'
import JoinRoom1 from './join-room-1'
import JoinRoom2 from './join-room-2'
import CreateRoom from './create-room'
import { connect } from 'react-redux'

const BackDrop = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: absolute;
    transition: all 1.3s;
    width: 100%;
    z-index: 3;
    transform: ${props => !props.showModal ? 'translateY(-100rem)' : 'translateY(0rem)'};
`
class Modal extends Component {
    render() {
        const {
            isShown,
            type 
        } = this.props
        return (
            <BackDrop showModal={isShown}>
                {type === 1 && <JoinRoom1 />}
                {type === 2 && <JoinRoom2 />}   
                {type === 3 && <CreateRoom />}
            </BackDrop>
        )
    }
}
const mapStatesToProps = state => ({
    isShown: state.modal.isShown,
    type: state.modal.type
})
export default connect(
    mapStatesToProps,
    null
)(Modal)
