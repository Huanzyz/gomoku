import React, { Component } from 'react'
import styled from 'styled-components'
import BubbleChat from './bubble-chat'
import PerfectScrollbar from "react-perfect-scrollbar"
import { connect } from 'react-redux'
import { room_send_message } from '../../actions/room'

const MainWrapper = styled.div`
    border: 3px solid #E0E0E0;
    width: 100%;
    margin-top: 2rem;
    background-color: white;
    position: relative;
    display: flex;
    flex-flow: column;
    flex-grow: 1;
`
const ChatTitle = styled.span`
    font-family: Gochi-Hand;
    font-size: 1.5rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 3;
`
const ChatLogo = styled.div`
    background-image: url(/images/chat.svg);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    height: 3.625rem;
    width: 4.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 3;
`
const Body = styled.div`
    padding: 1rem;
    height: 17rem;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    z-index: 1;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const Input = styled.input`
    border: none;
    padding: 1rem;
    outline: none;
    width: 100%;
`
const Line = styled.div`
    height: 3px;
    background-color: #E0E0E0;
    width: 100%;
`
const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-family: Raleway-SemiBold;
    cursor: pointer;
    :hover{
        text-decoration: underline;
    }
`
const BackDrop = styled.div`
    background: rgba(130, 130, 130, 0.2);
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
`
class Chat extends Component {
    state = {
        message: ""
    }
    handleMessageChange = e => {
        this.setState({
            message: e.target.value
        })
    }
    handleSubmit = () => {
        const { message } = this.state
        if(message !== ""){
            this.props.handleSendMessage(message)
            this.setState({
                message: ""
            })
        }
    }
    handleEnterSubmit = (e) => {
        if(e.charCode === 13) {
            this.handleSubmit()
        }
    }
    render() {
        const {
            message
        } = this.state
        const {
            chat,
            guest
        } = this.props
        return (
            <MainWrapper>
                {(guest === null || typeof guest === 'undefined') && <BackDrop/>}
                <ChatTitle>{(guest === null || typeof guest === 'undefined')? 'Waiting...' : 'Chat' }</ChatTitle>
                <ChatLogo />
                <Body id="body">
                    {chat.length > 3 ?
                        <PerfectScrollbar>
                        {chat.map((c, index) => (
                            <BubbleChat key={index} {...c} />
                        ))} 
                        </PerfectScrollbar>
                        :
                        <React.Fragment>
                        {chat.map((c, index) => (
                            <BubbleChat key={index} {...c} />
                        ))} 
                        </React.Fragment>
                    }
                </Body>
                <Line />
                <InputWrapper>
                    <Input value={message} onChange={this.handleMessageChange} onKeyPress={this.handleEnterSubmit}/>
                    <Button onClick={this.handleSubmit}>SEND</Button>
                </InputWrapper>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    chat: state.room.chat,
    guest: state.room.room.guest,
    socket: state.room.socket
})
const mapDispatchToProps = dispatch => ({
    handleSendMessage: (message) => dispatch(room_send_message(message))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)