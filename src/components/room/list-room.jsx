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
        this.dummyDB = [
            {
                roomID: '4WhO7a',
                points: 10000,
                avatar: 5,
                isLock: true,
                roomName: `Let's chill!!!`,
                host: 'SuicideSquad123'
            },
            {
                roomID: 'm5B11n',
                points: 15000,
                avatar: 10,
                isLock: true,
                roomName: `Yooooooo =))`,
                host: 'Zy3Pikachuuu'
            },
            {
                roomID: 'b1UDXO',
                points: 11000,
                avatar: 2,
                isLock: false,
                roomName: `Heyahey <3`,
                host: 'EiEiDenVau'
            },
            {
                roomID: '14ykbT',
                points: 52000,
                avatar: 0,
                isLock: true,
                roomName: `Hello from VN !!!`,
                host: 'U23VNChampion'
            },
            {
                roomID: '5ziCRU',
                points: 12000,
                avatar: 6,
                isLock: false,
                roomName: `Challenge accepted !!!`,
                host: 'MasterObiWan213'
            },
            {
                roomID: '8LnaoJ',
                points: 90000,
                avatar: 11,
                isLock: false,
                roomName: `Pho is the truth !!!`,
                host: 'SGboiz2019'
            }
        ]
    }
    render(){
        return(
            <MainWrapper quantity={this.dummyDB.length}>
                {this.dummyDB.map(e => <Room
                    key={e.roomID}
                    roomID={e.roomID}
                    points={e.points}
                    avatar={e.avatar}
                    isLock={e.isLock}
                    roomName={e.roomName}
                    host={e.host}
                    onOpen={this.props.onOpen}
                />)}
            </MainWrapper>
        )
    }
}

export default ListRoom