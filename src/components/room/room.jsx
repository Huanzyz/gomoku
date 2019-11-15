import React, { Component } from 'react'
import styled,{keyframes,css} from 'styled-components'
import {getRandomRoomAvatar} from '../../utils/utils'

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
    justify-content: flex-start;
    align-items: center;
`
const Image = styled.img`
    width: 2rem;
    height: 2rem;
`
class Room extends Component {
    render() {
        return (
            <MainWrapper onClick={() => this.props.onOpen(1)}>
                <AvatarWrapper>
                    <Avatar src={process.env.PUBLIC_URL+ getRandomRoomAvatar()}></Avatar>
                </AvatarWrapper>
                <SubWrapper>
                    <Info>
                        <Text>Let's chill!!!!</Text>
                        <Host>Host: Username</Host>
                    </Info>
                    <Point>
                        <Image src={process.env.PUBLIC_URL + '/images/diamond.svg'}></Image>
                        <Text style={{ marginLeft: '1rem' }}>1.000</Text>
                    </Point>
                    <Image src={process.env.PUBLIC_URL + '/images/lock.svg'}></Image>
                </SubWrapper>
            </MainWrapper>
        )
    }
}

export default Room