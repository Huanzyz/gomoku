import api from '../api/api'
import { 
    modal_open,
    modal_error
} from '../actions/modal'

export const ROOM_SEARCH_BEGIN = 'ROOM_SEARCH_BEGIN'
export const ROOM_SEARCH_SUCCESS = 'ROOM_SEARCH_SUCCESS'
export const ROOM_SEARCH_FAILURE = 'ROOM_SEARCH_FAILURE'

export const room_search_begin = () => ({
    type: ROOM_SEARCH_BEGIN
})
export const room_search_success = (room) => ({
    type: ROOM_SEARCH_SUCCESS,
    room
})
export const room_search_failure = () => ({
    type: ROOM_SEARCH_FAILURE
})

export const handle_room_search = (id) => dispatch => {
    dispatch(room_search_begin())
    api.get('/room/search', {
        id
    })
    .then(res => {
        dispatch(room_search_success(res.data))
        dispatch(modal_open(2))
    })
    .then(err => {
        dispatch(room_search_failure())
        dispatch(modal_error(err))
    })
}