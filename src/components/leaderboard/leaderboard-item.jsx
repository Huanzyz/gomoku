import React, { Component } from 'react'
import styled from 'styled-components'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;       
`
const Rank = styled.span`
    font-family: Gochi-Hand;
    color: #F3C522;
    font-size: 2.625rem;
    margin-right: 6rem;
`
const Username = styled.span`
    font-size: 1.25rem;
`
class LeaderboardItem extends Component{
    render(){        
        return(
            <MainWrapper>
                <Rank>{this.props.rank}st</Rank>
                <Username>{this.props.username}</Username>
            </MainWrapper>
        )
    }
}

export default LeaderboardItem;