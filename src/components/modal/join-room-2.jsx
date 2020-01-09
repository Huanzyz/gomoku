import React, { Component } from 'react'
import styled, {keyframes, css} from 'styled-components'
import Input from '../input'
import Button from '../button/btn'
import { modal_close, modal_clear_error } from '../../actions/modal'
import { connect } from 'react-redux'
import { handle_join_room } from '../../actions/room'
import { formatNumber } from '../../utils/utils'

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
    width: 20rem;
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
const Image = styled.img`
    height: 2rem;
    width: 2rem;
    margin-right: 1.7rem;
`
const Info = styled.span`
    font-size: 1.25rem;
`
//MODAL JOIN_ROOM: password, betPoints
class JoinRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: ""
        }
    }
    handleInput = e => {
        if(this.props.loading !== true){
            this.props.clearError()
            this.setState({
                password: e.target.value
            })
        }
        
    }
    handleClick = () => {
        const { password } = this.state
        const {
            roomID,
            loading,
            handleJoinRoom
        } = this.props
        if(loading !== true){
            handleJoinRoom(roomID, password)
        }
    }
    render() {
        const {
            password
        } = this.state
        const {
            roomID,
            isLock,
            loading,
            betPoints,
            error, 
            errorInfo,
            closeModal,
            handleJoinRoom
        } = this.props
        return (
            <MainWrapper>
                <ExitBTN src={process.env.PUBLIC_URL + '/images/close.svg'} onClick={closeModal} />
                <Title>Join room</Title>
                <ContentWrapper>
                    <InputWrapper style={{justifyContent : 'center'}}>
                        <div>
                            <Image src={process.env.PUBLIC_URL + '/images/diamond.svg'}/>
                            <Info>{formatNumber(parseInt(betPoints))}</Info>
                        </div>
                    </InputWrapper>
                    {isLock &&
                        <InputWrapper style={{ marginTop: "1rem" }}>
                                <React.Fragment>
                                <Label>Password</Label>
                                    <div style={{ width: "13.75rem" }}>
                                        <Input
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={this.handleInput}
                                            color="#494949"
                                            error={error}
                                        />
                                    </div>
                                </React.Fragment>
                        </InputWrapper>
                    }
                    <Alert error={error}>
                        <b>{errorInfo.title}</b><br/>
                        {errorInfo.detail}
                    </Alert>
                </ContentWrapper>
                <div style={{ marginTop: '2rem'}}>
                    <Button
                        color="#fff"
                        border="#494949"
                        bg="#494949"
                        onClick={this.handleClick}
                    >
                        {!loading?<Text>Join</Text>:
                        <LoadingLogo/>}
                    </Button>
                </div>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    roomID: state.room.room.id,
    isLock: state.room.room.hasPassword,
    betPoints: state.room.room.betPoints,
    loading: state.room.loading,
    error: state.modal.error,
    errorInfo: state.modal.errorInfo
})
const mapDispatchToProps = dispatch => ({
    clearError: () => dispatch(modal_clear_error()),
    handleJoinRoom: (id, password) => dispatch(handle_join_room(id, password)),
    closeModal: () => dispatch(modal_close())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinRoom)
