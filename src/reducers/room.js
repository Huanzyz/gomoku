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
    ROOM_CREATE_FAILURE
} from '../actions/room'

const InitRoom = () => ({
    room: {},
    loading: false
})

const room = (state = InitRoom(), action) => {
    switch(action.type){
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
        default:
            return state
    }
}
export default room