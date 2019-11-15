import React, {Component} from 'react'
import styled from 'styled-components'
import Room from './room'
const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;   
    height: 39.75rem; 
    padding-right: ${props => props.quantity > 6 ? "1.5rem" : "0"}
    transition: padding-right 0.5s ease-in;
`
class ListRoom extends Component{
    constructor(props){
        super(props)
        this.state = {
            quantity: 6
        }
    }
    render(){
        const {quantity} = this.state;
        return(
            <MainWrapper quantity={quantity}>
                <Room onOpen={this.props.onOpen}></Room>
                <Room onOpen={this.props.onOpen}></Room>
                <Room onOpen={this.props.onOpen}></Room>
                <Room onOpen={this.props.onOpen}></Room>
                <Room onOpen={this.props.onOpen}></Room>
                <Room onOpen={this.props.onOpen}></Room>
            </MainWrapper>
        )
    }
}

export default ListRoom