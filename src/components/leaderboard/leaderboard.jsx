import React, { Component } from 'react'
import Item from './leaderboard-item'
import Button from '../button/btn-refresh'
import styled from 'styled-components'
import {connect} from 'react-redux'
import { get_rank_info } from '../../actions/rank'
import { rankString } from '../../utils/utils'
import { compose } from 'redux'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
`
const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
    width: 100%;
    min-width: 273px;
`
const Title = styled.span`
    font-family: Gochi-Hand;
    font-size: 2.624rem;
`
class Leaderboard extends Component { 
    handleRefresh = () => {
        this.props.getRankInfo();
    }
    render() { 
        const {
            ranking,
            loading
        } = this.props
        console.log(ranking)
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
                {
                    ranking.map((e, index) => <Item rank={rankString(index + 1)} username={e.username} point={e.points}/>)
                }
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    ranking: state.rank.data,
    loading: state.rank.loading
})
const mapDispatchToProps = dispatch => ({
    getRankInfo: () => dispatch(get_rank_info())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard)