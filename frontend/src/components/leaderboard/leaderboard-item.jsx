import React, { Component } from 'react'
import styled from 'styled-components'
import { formatNumber, shortenName } from '../../utils/utils'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
    width: 100%;   
`
const Rank = styled.span`
    font-family: Gochi-Hand;
    color: #F3C522;
    font-size: 2.625rem;
    margin-right: 1rem;
`
const Username = styled.span`
    font-size: 1.25rem;
    margin-right: 1rem;
`
const Point = styled.span`
    font-size: 2rem;
    font-family: Gochi-Hand;
    color: #E83843;
`
class LeaderboardItem extends Component{
    render(){        
        return(
            <MainWrapper>
                <div>
                    <Rank>{this.props.rank}</Rank>
                    <Username>{shortenName(this.props.username, 10)}</Username>
                </div>
                <Point>{formatNumber(this.props.point)} pts</Point>
            </MainWrapper>
        )
    }
}

export default LeaderboardItem;