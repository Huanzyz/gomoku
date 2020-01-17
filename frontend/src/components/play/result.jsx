import React, {Component} from 'react'
import styled,{css} from 'styled-components'

const Wrapper = styled.div`
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;  
    z-index: 4;
    background-color: white; 
    position: absolute;
    top: 0;
    left: 0; 
    transform: ${props => props.end ? 'translateY(0rem)' :'translateY(-60rem)'};
    opacity: ${props => props.end ? '1' :'0'};
    transition: all 0.5s linear;
`
const TextWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    font-family: Gochi-Hand;
    font-size: 5rem;
    color: white;
    background-color: ${props => props.win? '#EB5757' : '#697C86'}
`
const Logo = styled.div`
    height: 4.7rem;
    width: 4.7rem;
    background-image: ${props => props.win ? 'url(/images/win.svg)' : 'url(/images/lose.svg)'};
    background-position: center center;
    background-size: contain;
    margin-left: 1rem;
`
const Image = styled.img`
    height: 18rem;
`
class Result extends Component {
    state = {
        height: 0,
        width: 0
    }
    componentDidMount(){
        let height = document.querySelector(".board").clientHeight;
        let width = document.querySelector(".board").clientWidth;
        this.setState({
            height,
            width
        })
    }    
    
    render(){
        const {win, end, } = this.props;
        const {height, width} = this.state;
        return(
            <Wrapper height={height} width={width} end={end}>
                <TextWrapper win={win} >
                    <span>{win ? 'YOU WON !!!' : 'YOU LOSE !!!'}</span>
                    <Logo win={win}/>
                </TextWrapper>
                <Image src={win? process.env.PUBLIC_URL + '/images/win.png' : process.env.PUBLIC_URL + '/images/lose.png'} />
            </Wrapper>
        )
    }
}
export default Result