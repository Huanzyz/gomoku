import React, { Component } from 'react'
import styled from 'styled-components'
import BubbleChat from './bubble-chat'
import PerfectScrollbar from "react-perfect-scrollbar"

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
        waiting: true,
        chats: [
            {
                content: 'hi! You ready?',
                createAt: '15:58',
                right: true
            },
            {
                content: `yeah! Let's do it!`,
                createAt: '15:58',
                right: false
            },
            {
                content: 'OK',
                createAt: '15:59',
                right: true
            },
            {
                content: `Eiii I'm in! Where are you?`,
                createAt: '16:01',
                right: false
            },
            {
                content: 'Lost connection! Id diam vel quam elementum pulvinar etiam. Pellentesque habitant morbi tristique senectus et netus et. Risus in hendrerit gravida rutrum quisque. Facilisis leo vel fringilla est ullamcorper eget. Egestas diam in arcu cursus euismod. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Fermentum odio eu feugiat pretium nibh ipsum. In hac habitasse platea dictumst quisque. Imperdiet dui accumsan sit amet nulla facilisi morbi. Pellentesque id nibh tortor id aliquet lectus.',
                createAt: '16:01',
                right: true
            },
        ]
    }

    render() {
        const { chats, waiting } = this.state;
        return (
            <MainWrapper>
                {waiting && <BackDrop/>}
                <ChatTitle>{waiting? 'Waiting...' : 'Chat' }</ChatTitle>
                <ChatLogo />
                <Body id="body">
                    {!waiting &&
                    <PerfectScrollbar >
                        {chats.map((c, index) => (
                            <BubbleChat key={index} {...c} />
                        ))} 
                    </PerfectScrollbar>
                    }
                </Body>
                <Line />
                <InputWrapper>
                    <Input />
                    <Button>SEND</Button>
                </InputWrapper>
            </MainWrapper>
        )
    }
}

export default Chat