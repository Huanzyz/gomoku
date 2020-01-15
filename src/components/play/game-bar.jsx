import React, {Component} from 'react'
import styled from 'styled-components'
import GameControlButton from './game-control-button'
import { game_quit } from '../../actions/game'
import { connect } from 'react-redux'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; 
    padding: 1.5rem; 
    z-index: 4;
    background-color: white;
`
const BetPointsWrapper= styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.25rem;
`
const BetPointsLogo = styled.img`
    height: 1.25rem;
    width: 1.25rem;
    margin-left: 1.125rem;
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
class GameBar extends Component{
    state = {
        waiting: false
    }
    toggleWaiting = () => {
        this.setState(prevState => ({
            waiting: !prevState.waiting
        }))
    }
    render(){
        const {
            guest
        } = this.props;

        return(
            <MainWrapper>
                <BetPointsWrapper>
                    <span>Bet: <b>10.000</b> pts</span>
                    <BetPointsLogo src={process.env.PUBLIC_URL + '/images/diamond.svg'} />
                </BetPointsWrapper>
                <ButtonWrapper>
                    {guest === null? 
                        <span style={{fontSize: '1.25rem'}}>Room ID: <b>DeNvAuxxx</b></span>
                        :
                        <GameControlButton/>
                    }
                </ButtonWrapper>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    guest: state.room.room.guest
})
const mapDispatchToProps = dispatch => ({
    handleQuitGame: () => dispatch(game_quit())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameBar)