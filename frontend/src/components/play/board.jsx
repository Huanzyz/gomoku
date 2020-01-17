import React, {Component} from 'react'
import styled from 'styled-components'
import Tile from './tile'
import Result from './result'
import { handle_game_tick } from '../../actions/game'
import { connect } from 'react-redux'

// const Tile = styled.div`
//     cursor: pointer; 
//     border: 1px solid #E0E0E0;
//     :hover{
//         border: 1px solid #828282;
//     }
//     width: 2rem;
//     height: 2rem;
// `
const Row =  styled.div`
    display: flex;
`
const Wrapper = styled.div`
    position: relative;
`
const BackDrop = styled.div`
    background: rgba(130, 130, 130, 0.2);
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: 3;
`
class Board extends Component{
    generateRow(rowIndex){
        const {
            tiles, 
            lastTick, 
            tileSize,
            handleTick
        } = this.props
        let cols = []
        for(let i = 0; i < this.props.cols; i++){
            const id = rowIndex * this.props.cols + i
            cols.push(
                <Tile 
                    key={id}
                    onTick={() => handleTick(id)}
                    value={tiles[id].value}
                    lastTick={lastTick === id}
                    width={tileSize}
                    height={tileSize}
                />         
            )
        }
        return cols;
    }
    generateBoard(){
        let rows = [];
        for(let i = 0; i < this.props.rows; i++){
            let row = this.generateRow(i);
            rows.push(
                <Row key={i}>
                    {row}
                </Row>
            )
        }
        return rows;
    }
    handleShowResult = () => {
        this.setState(prevState => ({
            end: !prevState.end
        }))
    }
    render(){
        const {
            win, 
            end,
            turn,
            myTurn
        } = this.props
        return(
            <Wrapper className="board">
                {win !== null  && <Result win={win} end={end}/>}
                {((turn !== myTurn && !end) || end) && <BackDrop />}
                {this.generateBoard()}
            </Wrapper>
        )
    }
}
const mapStateToProps = state => ({
    rows: state.game.board.rows,
    cols: state.game.board.cols,
    tiles: state.game.board.tiles,
    lastTick: state.game.board.lastTick,
    tileSize: state.game.board.tileSize,
    turn: state.game.board.turn,
    myTurn: state.game.board.myTurn,
    win: state.game.board.win,
    end: state.game.board.end
})
const mapDispatchToProps = dispatch => ({
    handleTick: id => dispatch(handle_game_tick(id))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)