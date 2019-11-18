import React,{Component} from 'react'
import styled from 'styled-components'
import X from './X'
import O from './O'


const TileWrapper = styled.div`
    cursor: pointer; 
    border: ${props => !props.lastTick ? '1px solid #E0E0E0' : '0.2rem solid #333'};    
    :hover{
        border: 0.2rem solid #333333;
    }
    position: relative;
    ${props => props.lastTick && `
    ::before,::after{
        content: "";
        display: block;
        position: absolute;
        background: #fff;
    }
    ::before{
        top: -0.2rem;
        bottom: -0.2rem;
        left: 0.2rem;
        right: 0.2rem;
    }
    ::after{
        top: 0.2rem;
        bottom: 0.2rem;
        left: -0.2rem;
        right: -0.2rem;
    }`}
    width: ${props => props.width};
    height: ${props =>  props.height};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

class Tile extends Component {
    render(){
        const {
            value, 
            width, 
            height, 
            onTick,
            lastTick
        } = this.props;
        return(
            <TileWrapper
                width={width}
                height={height}
                lastTick={lastTick}
                onClick={onTick}
            >
                {value === 1 && 
                    <X
                        width={width}
                        height={height}
                        color='#EB5757'
                    />}
                {value === 2 &&
                    <O 
                        width={width}
                        height={height}
                        color="#0772B8"
                    />
                }
            </TileWrapper>
        )
    }
}

export default Tile