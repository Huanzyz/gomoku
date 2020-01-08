import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import ImageBTN from '../components/button/btn-img'
import GameBar from '../components/play/game-bar'
import Board from '../components/play/board'
import TimeProgress from "../components/play/time-progress"
import GameInfo from '../components/play/game-info'
import Chat from '../components/play/chat'

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
    constructor(props){
        super(props)
        this.state = {
            rows: 18,
            cols: 22,
            time: 15, 
            max: 15,
            lastTick: -1,
            tileSize: '2rem',
            tiles: [],
            lock: false,
            turn: 1,
            waiting: true
        } 
    }
    changeTurn = () => {
        this.setState(prevState => ({
            turn: prevState.turn === 1 ? 2 : 1
        }))
    }
    handleTick= id => {
        let {tiles, lock, turn} = this.state
        if(tiles[id].value === 0){
            tiles[id].value = turn;
            this.changeTurn();
        }
        this.setState({
            tiles,
            lastTick: id,
            time: 15
        })        
    }
    initTiles = (rows, cols) => {
        let tiles = []
        for(let i = 0;i < rows*cols; i++){
            tiles.push({value: 0})
        }
        clearInterval(this.timeID);
        this.setState({
            tiles
        })
    }
    componentDidMount(){
        let {tiles, rows, cols, waiting} = this.state
        if(tiles.length === 0){            
            this.initTiles(rows, cols);
        }
        if(!waiting){
            this.timeID = setInterval(()=>{
                if(this.state.time !== 0){
                    this.setState(prevState => {
                        return({
                            time: prevState.time - 1
                        })
                    })
                }
            },1000)
        }
    }
    componentWillMount(){
        clearInterval(this.timeID);
    }
    render(){
        const {rows, cols, time, max, lastTick, tileSize, tiles} = this.state;

        return(
            <MainWrapper>
                <Header>
                    <WidthLimitContainer>
                        <LogoWrapper>
                            <Name>GOMOKU</Name>
                            <Logo src={process.env.PUBLIC_URL + '/images/characters.svg'} />
                        </LogoWrapper>
                        <Link to="/login">
                            <ImageBTN
                                color="#EB5757"
                                before="/images/exit.svg"
                                after="/images/white-exit.svg"
                            />
                        </Link>
                    </WidthLimitContainer>
                </Header>
                <ContentWrapper>
                    <WidthLimitContainer>
                        <SectionOne>
                            <GameBar />
                            <Line />
                            {tiles.length!== 0 &&
                                <Board 
                                    tiles={tiles}
                                    rows={rows}
                                    cols={cols}
                                    tiles={tiles}
                                    lastTick={lastTick}
                                    tileSize={tileSize}
                                    onTick={this.handleTick}
                                />
                            }
                            <Line />
                            <TimeProgress max={max} time={time} />
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
export default Play