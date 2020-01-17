import React, { Component } from 'react'
import styled from 'styled-components'
import Button from './button/btn'
import RefreshBTN from './button/btn-refresh'
import { get_list_room_info } from '../actions/list-room'
import { connect } from 'react-redux'
import { modal_open } from '../actions/modal'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Name = styled.span`
    font-family: Gochi-Hand;
    font-size: 2.625rem;
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
class DBTools extends Component{
    render(){
        const {
            loading,
            openModal,
            getListRoomInfo
        } = this.props        
        return(
            <MainWrapper>
                <Name>Game Rooms</Name>
                <ButtonWrapper>
                    <RefreshBTN
                        color="#0772BB"
                        before="/images/refresh.svg"
                        after="/images/white-refresh.svg"
                        loading={loading ? 1 : 0}
                        onClick={getListRoomInfo} 
                    />
                    <div style={{margin: '0 1rem'}}>
                        <Button border="#494949" bg="#fff" color="#494949" onClick={() => openModal(1)}>Join Room</Button>
                    </div>
                    <Button border="#494949" bg="#494949" color="#fff" onClick={() => openModal(3)}>Create Room</Button>
                </ButtonWrapper>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    loading: state.listRoom.loading
})
const mapDispatchToProps = dispatch => ({
    getListRoomInfo: () => dispatch(get_list_room_info()),
    openModal: (type) => dispatch(modal_open(type))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DBTools)