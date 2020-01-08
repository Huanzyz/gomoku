import {
    LIST_ROOM_INFO_BEGIN,
    LIST_ROOM_INFO_SUCCESS,
    LIST_ROOM_INFO_FAILURE
} from '../actions/list-room'

import { getRandomColor } from '../utils/utils'

const InitListRoom = () => ({
    data: [
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