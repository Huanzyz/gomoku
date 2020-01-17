import api from '../api/api'
import { toast } from 'react-toastify'
export const RANK_INFO_BEGIN = 'RANK_INFO_BEGIN'
export const RANK_INFO_SUCCESS = 'RANK_INFO_SUCCESS'
export const RANK_INFO_FAILURE = 'RANK_INFO_FAILURE'

export const rank_info_begin = () => ({
    type: RANK_INFO_BEGIN
})
export const rank_info_success = (data) => ({
    type: RANK_INFO_SUCCESS,
    data
})
export const rank_info_failure = () => ({
    type: RANK_INFO_FAILURE
})

export const get_rank_info = () => dispatch => {
    dispatch(rank_info_begin())
    api.get('/rank',{})
    .then(res => {
        dispatch(rank_info_success(res.data.ranking))
    })
    .catch(err => {
        dispatch(rank_info_failure())
        toast.error('Failed to get ranking info! Try again!');
    })
}