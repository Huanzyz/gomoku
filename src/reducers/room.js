import {
    ROOM_SEARCH_BEGIN,
    ROOM_SEARCH_SUCCESS,
    ROOM_SEARCH_FAILURE,
    ROOM_JOIN_BEGIN,
    ROOM_JOIN_SUCCESS,
    ROOM_JOIN_FAILURE,
    ROOM_SET_INFO,
    ROOM_CREATE_BEGIN,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAILURE,
    ROOM_GUEST_JOIN,
    ROOM_SOCKET,
    ROOM_SET_AUTHENTICATED,
    ROOM_PUSH_CHAT
} from '../actions/room'

const InitRoom = () => ({
    room: {
        id: "8aaf253097",
        roomName: "abc",
        betPoints: 1000,
        hasPassword: true,
        host: 
        {
            username: "abcdefghe",
            avatar: "8",
            points: 10000,
            countWin: 100,
            countDraw: 10,
            countLose: 30,
            rank: 1
        },
        guest: null,
        background: "5"
    },
    chat: [],
    // room: {},
    loading: false,
    authenticated: true
})

const room = (state = InitRoom(), action) => {
    switch(action.type){
        case ROOM_SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.bool
            }
        case ROOM_SEARCH_BEGIN:
            return {
                ...state,
                loading: true,
                room: {}
            }
        case ROOM_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                room: action.room
            }
        case ROOM_SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                room: {}
            }
        case ROOM_JOIN_BEGIN:
            return {
                ...state,
                loading: true
            }
        case ROOM_JOIN_SUCCESS:
            return {
                ...state,
                loading: false,
                room: action.room //
            }
        case ROOM_JOIN_FAILURE:
            return {
                ...state,
                loading: false
            }
        case ROOM_SET_INFO:
            return{
                ...state,
                room: action.room
            }
        case ROOM_CREATE_BEGIN:
            return {
                ... state,
                loading: true
            }
        case ROOM_CREATE_SUCCESS:
            return {
                ... state,
                loading: false,
                room: action.room
            }   
        case ROOM_CREATE_FAILURE:
            return {
                ... state,
                loading: false
            }
        case ROOM_GUEST_JOIN:
            return {
                ...state,
                room: action.room
            }
        case ROOM_SOCKET:
            return {
                ...state,
                socket: action.socket
            }
        case ROOM_PUSH_CHAT:
            let chat = [...state.chat]
            chat.push(action.chat)
            return {
                ...state,
                chat
            }
        default:
            return state
    }
}
export default room