import React, { Component } from 'react'
import styled from 'styled-components'
import JoinRoom from './join-room'
import CreateRoom from './create-room'

const BackDrop = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    position: absolute;
    transition: all 1.3s;
    width: 100%;
    z-index: 3;
    transform: ${props => !props.showModal ? 'translateY(-100rem)' : 'translateY(0rem)'};
`
// showModal, onClose, typeOfModal, roomID, isLock
// 1: JOIN ROOM [Room's ID, Password]
// 2: JOIN ROOM [Password]
// 3: CREATE ROOM 
class Modal extends Component {
    render() {
        const {
            roomID,
            password,
            roomName,
            betPoints,
            isLock,
            error,
            alert,
            typeOfModal,
            //
            handleRoomID,
            handlePassword,
            handleRoomName,
            handleBetPoints,
            //
            onClose,
            // 
            showModal
        } = this.props    
        return (
            <BackDrop showModal={showModal}>
                {(typeOfModal === 1 || typeOfModal == 2) ?
                    <JoinRoom                       
                        //Main data
                        roomID={roomID}
                        password={password}
                        isLock={isLock}
                        error={error}
                        alert={alert}
                        typeOfModal={typeOfModal}
                        //For input
                        handleRoomID={handleRoomID}
                        handlePassword={handlePassword}
                        //For button
                        onClose={onClose}
                        //For redirecting
                        showModal={showModal}  
                    />      
                :
                    <CreateRoom                       
                        //Main data
                        password={password}
                        roomName={roomName}
                        betPoints={betPoints}
                        isLock={isLock}
                        error={error}
                        alert={alert}
                        //For input
                        handlePassword={handlePassword}
                        handleRoomName={handleRoomName}
                        handleBetPoints={handleBetPoints}
                        //For button
                        onClose={onClose}
                    />  
                }
            </BackDrop>
        )
    }
}

export default Modal
