import React, { Component } from 'react'
import styled,{keyframes,css} from 'styled-components'
import {getFormattedStringForPoints} from '../../utils/utils'

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
    width: 8rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0px 0px 10px;
    background-color: #494949;
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
    padding: 0 2rem;
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
    render() {
        const{
            roomID, 
            avatar,
            isLock,
            roomName,
            host,
            points,
            onOpen
        } = this.props
        return (
            <MainWrapper onClick={() => onOpen(2, roomID, isLock)}>
                <AvatarWrapper>
                    <Avatar src={process.env.PUBLIC_URL+ `/images/r${avatar}.svg`}></Avatar>
                </AvatarWrapper>
                <SubWrapper>
                    <Info>
                        <Text>{roomName}</Text>
                        <Host>Host: {host}</Host>
                    </Info>
                    <TinyWrapper>
                    <Point>
                        <Image src={process.env.PUBLIC_URL + '/images/diamond.svg'}></Image>
                        <Text> {getFormattedStringForPoints(points)}</Text>
                    </Point>
                    <Image src={isLock? process.env.PUBLIC_URL + '/images/lock.svg': 'none'}></Image>
                    </TinyWrapper>
                </SubWrapper>
            </MainWrapper>
        )
    }
}

export default Room