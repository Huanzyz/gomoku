import React, {Component} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: ${props => props.right? 'flex-end' : 'flex-start'}
    margin-top: 3px;
`
const Chat = styled.div`
    border-radius: 5px;
    background-color: ${props => props.right ? '#333333' : '#F2F2F2'};
    color: ${props => props.right ? '#F2F2F2' : '#333333'};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0.5rem;
    max-width: 70%;
`
const MainContent = styled.span`
    font-family: Raleway-Medium;    
`
const Time = styled.span`
    font-size: Raleway-Regular;
`
class BubbleChat extends Component{
    render(){
        const {right, content, createAt} = this.props;
        return(
            <Wrapper right={right}>
                <Chat right={right}>
                    <MainContent>{content}</MainContent>
                    <Time>{createAt}</Time>
                </Chat>
            </Wrapper>
        )
    }
}

export default BubbleChat