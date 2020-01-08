import React, {Component} from 'react'
import styled from 'styled-components'
import Room from './room'
import { connect } from 'react-redux'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;   
    height: 39.75rem; 
    padding-right: ${props => props.quantity > 6 ? "1.5rem" : "0"}
    transition: padding-right 0.5s ease-in;
`
class ListRoom extends Component{
    render(){
        const {
            listRoom
        } = this.props
        return(
            <MainWrapper quantity={listRoom.length}>
                {listRoom.map(e => <Room
                    key={e.roomID}
                    roomID={e.roomID}
                    points={e.points}
                    avatar={e.avatar}
                    isLock={e.isLock}
                    roomName={e.roomName}
                    host={e.host}
                />)}
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    listRoom: state.listRoom.data
})
export default connect(
    mapStateToProps,
    null
)(ListRoom)