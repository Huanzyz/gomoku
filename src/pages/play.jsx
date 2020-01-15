import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import ImageBTN from '../components/button/btn-img'
import GameBar from '../components/play/game-bar'
import Board from '../components/play/board'
import TimeProgress from "../components/play/time-progress"
import GameInfo from '../components/play/game-info'
import Chat from '../components/play/chat'
import { 
    game_quit, 
    handle_time_decrease, 
    game_switch_turn,
    game_tick ,
    game_init_tiles
} from '../actions/game'
import { connect } from 'react-redux'

const MainWrapper = styled.div`
    width: 100vw;
`
const Header = styled.div`
    padding: 0.75rem 8.75rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const Name = styled.span`
    font-family: Gochi-Hand;
    font-size: 4rem;
`
const Logo = styled.img`
    height: 2.5rem;
    margin-left: 2rem;
`
const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.125rem 8.75rem 4.125rem 8.75rem;
`
const SectionOne = styled.div`
    border: 3px solid #E0E0E0;
    display: flex;
    flex-direction: column;
    height: 44.125rem;
`
const SectionTwo = styled.div`
    height: 44.125rem;
    display: flex;
    flex-flow: column;
    width: 26rem;
`
const Line = styled.div`
    background-color: #F2F2F2;
    width: 100%;
    height: 3px;
`
const WidthLimitContainer = styled.div`
    width: 73rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 100%;
`
class Play extends Component{  
    componentDidMount(){
        const { board } = this.props
        if(board.tiles.length === 0){
            this.props.handleInitTiles()
        }    
    }
    render(){
        const {
            play,
            board,
            handleQuitGame
        } = this.props
        return(
            <MainWrapper>
                {!play && <Redirect to="/"/>}
                <Header>
                    <WidthLimitContainer>
                        <LogoWrapper>
                            <Name>GOMOKU</Name>
                            <Logo src={process.env.PUBLIC_URL + '/images/characters.svg'} />
                        </LogoWrapper>
                        <ImageBTN
                            color="#EB5757"
                            before="/images/exit.svg"
                            after="/images/white-exit.svg"
                            onClick={handleQuitGame}
                        />
                    </WidthLimitContainer>
                </Header>
                <ContentWrapper>
                    <WidthLimitContainer>
                        <SectionOne>
                            <GameBar />
                            <Line />
                            {board.tiles.length!== 0 &&
                                <Board />
                            }
                            <Line />
                            <TimeProgress />
                        </SectionOne>
                        <SectionTwo>
                            <GameInfo />
                            <Chat />
                        </SectionTwo>
                    </WidthLimitContainer>
                </ContentWrapper>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    play: state.game.play,
    board: state.game.board
})
const mapDispatchToProps = dispatch => ({
    handleInitTiles: () => dispatch(game_init_tiles()),
    handleSwitchTurn: () => dispatch(game_switch_turn()),
    handleQuitGame: () => dispatch(game_quit())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Play)