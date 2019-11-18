import React, {Component} from 'react'
import styled from 'styled-components'
import Tile from './tile'

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
class Board extends Component{
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
    render(){
        return(
            <div style={{
                
            }}>
                {this.generateBoard()}
            </div>
        )
    }
}

export default Board