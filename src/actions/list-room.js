import api from '../api/api'
import { toast } from 'react-toastify'
export const LIST_ROOM_INFO_BEGIN = 'LIST_ROOM_INFO_BEGIN'
export const LIST_ROOM_INFO_SUCCESS = 'LIST_ROOM_INFO_SUCCESS'
export const LIST_ROOM_INFO_FAILURE = 'LIST_ROOM_INFO_FAILURE'

export const list_room_info_begin = () => ({
    type: LIST_ROOM_INFO_BEGIN
})
export const list_room_info_success = (data) => ({
    type: LIST_ROOM_INFO_SUCCESS,
    data
})
export const list_room_info_failure = () => ({
    type: LIST_ROOM_INFO_FAILURE
})

export const get_list_room_info = () => dispatch => {
    dispatch(list_room_info_begin())
    api.get('/rooms', {})
    .then(res => dispatch(list_room_info_success(res.data)))
    .catch(err => {
        dispatch(list_room_info_failure())
        toast.error("Failed to get list of rooms' info! Try again!")
    })
}