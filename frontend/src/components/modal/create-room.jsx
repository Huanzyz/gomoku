import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Input from '../input'
import Button from '../button/btn'
import { connect } from 'react-redux'
import { modal_close, modal_clear_error } from '../../actions/modal'
import { handle_create_room } from '../../actions/room'

const MainWrapper = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem 4rem;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
`
const Title = styled.span`
    font-size: 2rem;
    margin-bottom: 2rem;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 25rem;
`
const Label = styled.span`
    font-family: Raleway-Medium;
    margin-right: 1.5rem;
`
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
const ExitBTN = styled.img`
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    :hover{
        transform: scale(1.2);
    }
    transition: transform 0.2s ease-in;
`
const Alert = styled.span`
    color: #EF4128;
    margin-top: 1rem;
    opacity: ${props => !props.error ? "0" : "1"};
    position: ${props => !props.error ? "absolute" : "relative"};
    transition: opacity 0.5s linear;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const Text = styled.span`
    width: 1.5rem;
    height: 1.5rem;
`
const LoadingLogo = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(/images/white-refresh.svg);
    animation: ${rotate} 1s linear infinite;
`
class CreateRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomName: "",
            betPoints: "",
            password: ""
            
        }
    }
    handleRoomNameInput = e => {
        if(this.props.loading !== true){
            this.props.clearError()
            this.setState({
                roomName: e.target.value
            })
        }
        
    }
    handleBetPointsInput = e => {
        if(this.props.loading !== true){
            this.props.clearError()
            this.setState({
                betPoints: e.target.value.replace(/\D/,'')
            })
        }
    }
    handlePasswordInput = e => {
        if(this.props.loading !== true){
            this.props.clearError()
            this.setState({
                password: e.target.value
            })
        }
    }
    handleClick = () => {
        const {
            roomName,
            betPoints,
            password
        } = this.state
        const {
            loading,
            handleCreateRoom
        } = this.props
        if(loading !== true){
            handleCreateRoom(roomName, betPoints, password)
        }
    }
    render() {
        const {
            roomName,
            betPoints,
            password
        } = this.state
        const {
            loading, 
            error,
            errorInfo,
            closeModal,
            handleCreateRoom
        } = this.props
        return (
            <MainWrapper>
                <ExitBTN src={process.env.PUBLIC_URL + '/images/close.svg'} onClick={closeModal} />
                <Title>Create room</Title>
                <ContentWrapper>
                    <InputWrapper style={{ marginTop: "1rem" }}>
                        <Label>Room's name</Label>
                        <div style={{ width: "15rem" }}>
                            <Input
                                name="roomName"
                                type="text"
                                value={roomName}
                                onChange={this.handleRoomNameInput}
                                color="#494949"
                                error={error}
                            />
                        </div>
                    </InputWrapper>
                    <InputWrapper style={{ margin: "1rem 0" }}>
                        <Label>Bet points</Label>
                        <div style={{ width: "15rem" }}>
                            <Input
                                name="betPoints"
                                type="text"
                                value={betPoints}
                                onChange={this.handleBetPointsInput}
                                color="#494949"
                                error={error}
                            />
                        </div>
                    </InputWrapper>
                    <InputWrapper>
                        <Label>Password</Label>
                        <div style={{ width: "15rem" }}>
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.handlePasswordInput}
                                color="#494949"
                                error={error}
                            />
                        </div>
                    </InputWrapper>
                    <Alert error={error}>
                        <b>{errorInfo.title}</b><br />
                        {errorInfo.detail}
                    </Alert>
                </ContentWrapper>
                <div style={{ marginTop: '2rem' }}>
                    <Button
                        color="#fff"
                        border="#494949"
                        bg="#494949"
                        onClick={this.handleClick}
                    >
                        {!loading ? <Text>Join</Text> :
                            <LoadingLogo />}
                    </Button>
                </div>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    loading: state.room.loading,
    error: state.modal.error,
    errorInfo: state.modal.errorInfo
})
const mapDispatchToProps = dispatch => ({
    clearError: () => dispatch(modal_clear_error()),
    closeModal: () => dispatch(modal_close()),
    handleCreateRoom: (roomName, betPoints, password) => dispatch(handle_create_room(roomName, betPoints, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRoom)