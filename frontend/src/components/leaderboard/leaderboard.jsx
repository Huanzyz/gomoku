import React, { Component } from 'react'
import Item from './leaderboard-item'
import Button from '../button/btn-refresh'
import styled from 'styled-components'
import {connect} from 'react-redux'
import { get_rank_info } from '../../actions/rank'
import { rankString } from '../../utils/utils'
import PerfectScrollbar from "react-perfect-scrollbar"

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
const ListWrapper = styled.div`
    height: 19.625rem;
    padding-right: ${props => props.quantity > 6 ? "1.5rem" : "0"}
`
class Leaderboard extends Component { 
    componentDidMount(){
        this.props.getRankInfo()
    }
    render() { 
        const {
            ranking,
            loading,
            getRankInfo
        } = this.props
        return (
            <MainWrapper>
                <TitleWrapper>
                    <Title>Ranking</Title>
                    <Button
                        color="#F3C522"
                        before="/images/refresh.svg"
                        after="/images/white-refresh.svg"
                        loading={loading ? 1 : 0}
                        onClick={getRankInfo} 
                    />
                </TitleWrapper>
                <PerfectScrollbar>
                    <ListWrapper quantity={ranking.length}>
                    {
                        ranking.map((e, index) => <Item key={index} rank={rankString(index + 1)} username={e.username} point={e.points}/>)
                    }
                    </ListWrapper>
                </PerfectScrollbar>
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