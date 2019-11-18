import React, { Component } from 'react'
import styled,{css, keyframes} from 'styled-components'
import Item from './leaderboard-item'
import Button from '../button/btn-refresh'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8.75rem;

    width: auto;
`
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
    width: 100%;
`
const Title = styled.span`
    font-family: Gochi-Hand;
    font-size: 2.624rem;
`
class Leaderboard extends Component { 
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }  
    handleRefresh = () => {
        this.setState(prevState => ({
            loading : !prevState.loading
        }))
    }
    render() { 
        const {loading} = this.state;
        return (
            <MainWrapper>
                <TitleWrapper>
                    <Title>Ranking</Title>
                    <Button
                        color="#F3C522"
                        before="/images/refresh.svg"
                        after="/images/white-refresh.svg"
                        loading={loading}
                        onClick={this.handleRefresh} 
                    />
                </TitleWrapper>
                <Item rank="1" username="Username"/>
                <Item rank="2" username="Username"/>
                <Item rank="3" username="Username"/>
                <Item rank="4" username="Username"/>
                <Item rank="5" username="Username"/>
            </MainWrapper>
        )
    }
}

export default Leaderboard;