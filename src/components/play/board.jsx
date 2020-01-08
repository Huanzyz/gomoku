import React, {Component} from 'react'
import styled from 'styled-components'
import Tile from './tile'
import Result from './result'

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
    state={
        waiting: false,
        win: true,
        end: false
    }
    generateRow(rowIndex){
        const {tiles, lastTick, tileSize, onTick} = this.props
        let cols = []
        for(let i = 0; i < this.props.cols; i++){
            const id = rowIndex * this.props.cols + i;
            cols.push(
                <Tile 
                    key={id}
                    onTick={() => onTick(id)}
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
        const {waiting, win, end} = this.state
        return(
            <Wrapper className="board" onClick={this.handleShowResult}>
                <Result win={win} end={end}/>
                {waiting && <BackDrop />}
                {this.generateBoard()}
            </Wrapper>
        )
    }
}

export default Board