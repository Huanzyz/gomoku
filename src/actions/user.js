import api from '../api/api'

export const USER_INFO = "USER_INFO"
export const USER_ERROR = "USER_ERROR"
export const USER_CLEAR_ERROR = "USER.CLEAR_ERROR"


export const user_info = user => ({
    type: USER_INFO,
    user
})
export const receiveError = alert => ({
    type: USER_ERROR,
    alert
})
export const clearError = () => ({
    type: USER_CLEAR_ERROR
})

export const get_user_info = (id) => dispatch => {
    api.get('/users/',{
        user_id: id
    })
    .then(res => {
        dispatch(user_info(res.data.data));
    })
}

