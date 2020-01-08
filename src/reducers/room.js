import {
    ROOM_SEARCH_BEGIN,
    ROOM_SEARCH_SUCCESS,
    ROOM_SEARCH_FAILURE
} from '../actions/room'

const InitRoom = () => ({
    room: {},
    loading: false,
    error: {}
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
        default:
            return state
    }
}
export default room