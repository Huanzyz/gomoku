import React, { Component } from 'react'
import styled,{keyframes,css} from 'styled-components'
import {getFormattedStringForPoints} from '../../utils/utils'
import { modal_open } from '../../actions/modal'
import { connect } from 'react-redux'
import { room_set_info } from '../../actions/room'

const bounce = keyframes`
    0% {
        transform: translateY(0rem);
    }
    25% {
        transform: translateY(-1rem);
    }
    75%{
        transform: translateY(1rem);
    }
    100% {
        transform: translateY(0rem);
    }
`
const MainWrapper = styled.div`
    border: 1px solid #494949;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 43rem;
    cursor: pointer;
    transition: all 0.5s ease-in;
    margin-top: 0.5rem;
`
const AvatarWrapper = styled.div`
    height: 6rem;
    width: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0px 0px 10px;
`
const Avatar = styled.img`
    height: 6rem;
    width: auto;    
    ${MainWrapper}:hover & {
        animation: ${bounce} 1s linear infinite
    }
`
const SubWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem 0 1rem;
    width: 100%;
`
const TinyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
const Text = styled.span`
    font-size: 1.5rem;
`
const Host = styled.span`
    font-size: 1rem;
`
const Point = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 10rem;
    margin-right: 3rem;
`
const Image = styled.img`
    width: 2rem;
    height: 2rem;
    visibility: ${props => props.src == "none" ? "hidden" : "visible"};
`
class Room extends Component {
    handleClick = () => {
        this.props.setRoomInfo(this.props.room)
        this.props.openModal(2)
    }
    render() {
        const{
            room,
            openModal
        } = this.props
        return (
            <MainWrapper onClick={this.handleClick}>
                <AvatarWrapper>
                    <Avatar src={process.env.PUBLIC_URL+ `/images/r${room.background}.svg`}></Avatar>
                </AvatarWrapper>
                <SubWrapper>
                    <Info>
                        <Text>{room.roomName}</Text>
                        <Host>Host: {room.host.username}</Host>
                    </Info>
                    <TinyWrapper>
                    <Point>
                        <Image src={process.env.PUBLIC_URL + '/images/diamond.svg'}></Image>
                        <Text> {getFormattedStringForPoints(room.betPoints)}</Text>
                    </Point>
                    <Image src={room.hasPassword? process.env.PUBLIC_URL + '/images/lock.svg': 'none'}></Image>
                    </TinyWrapper>
                </SubWrapper>
            </MainWrapper>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    openModal: (type) => dispatch(modal_open(type)),
    setRoomInfo: (room) => dispatch(room_set_info(room))
})
export default connect(
    null,
    mapDispatchToProps
)(Room)