import React, {Component} from 'react'
import styled from 'styled-components'
import Room from './room'
import { connect } from 'react-redux'
import {get_list_room_info} from '../../actions/list-room'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;   
    height: 39.75rem; 
    padding-right: ${props => props.quantity > 6 ? "1.5rem" : "0"}
    transition: padding-right 0.5s ease-in;
`
const MainEmptyWrapper = styled.div`
    height: 39.75rem; 
    background-color: #f7f1e3;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    opacity: 0.3;
    span {
        font-size: 1.5rem;
    }
`
const EmptyImage = styled.img`

`
class ListRoom extends Component{
    componentDidMount(){
        // this.props.getListRoom()
    }
    render(){
        const {
            listRoom
        } = this.props
        if(listRoom.length === 0)
            return(
                <MainEmptyWrapper>
                    <span>List of rooms is empty ...</span>
                    <EmptyImage src={process.env.PUBLIC_URL + '/images/empty.png'}/>
                </MainEmptyWrapper>
            )
        return(
            <MainWrapper quantity={listRoom.length}>
                {listRoom.map((e, index) => <Room
                    key={index}
                    room={e}
                />)}
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    listRoom: state.listRoom.data
})
const mapDispatchToProps = dispatch => ({
    getListRoom : () => dispatch(get_list_room_info())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListRoom)