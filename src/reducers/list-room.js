import {
    LIST_ROOM_INFO_BEGIN,
    LIST_ROOM_INFO_SUCCESS,
    LIST_ROOM_INFO_FAILURE
} from '../actions/list-room'

import { getRandomColor } from '../utils/utils'

const InitListRoom = () => ({
    data: [
        {
            id: '4WhO7a',
            betPoints: 10000,
            background: 5,
            hasPassword: true,
            roomName: `Let's chill!!!`,
            host: {
                username: 'SuicideSquad123'
            }
        },
        {
            id: 'm5B11n',
            betPoints: 15000,
            background: 10,
            hasPassword: true,
            roomName: `Yooooooo =))`,
            host: {
                username:'Zy3Pikachuuu'
            }
        },
        {
            id: 'b1UDXO',
            betPoints: 11000,
            background: 2,
            hasPassword: false,
            roomName: `Heyahey <3`,
            host: {
                username:'EiEiDenVau'
            }
        },
        {
            id: '14ykbT',
            betPoints: 52000,
            background: 0,
            hasPassword: true,
            roomName: `Hello from VN !!!`,
            host: {
                username:'U23VNChampion'
            }
        },
        {
            id: '5ziCRU',
            betPoints: 12000,
            background: 6,
            hasPassword: false,
            roomName: `Challenge accepted !!!`,
            host: {
                username:'MasterObiWan213'
            }
        },
        {
            id: '8LnaoJ',
            betPoints: 90000,
            background: 11,
            hasPassword: false,
            roomName: `Pho is the truth !!!`,
            host: {
                username:'SGboiz2019'
            }
        }
    ],
    loading: false,
    color: getRandomColor()
})

const listRoom = (state = InitListRoom(), action) => {
    switch(action.type){
        case LIST_ROOM_INFO_BEGIN:
            return {
                ...state,
                loading: true
            }
        case LIST_ROOM_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case LIST_ROOM_INFO_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}
export default listRoom