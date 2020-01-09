import api from '../api/api'
import { setUsernameToStorage, getUsernameFromStorage, setJwtToStorage } from '../utils/utils'

export const USER_INFO = "USER_INFO"
export const USER_ERROR = "USER_ERROR"
export const USER_CLEAR_ERROR = "USER.CLEAR_ERROR"
export const USER_LOGIN_BEGIN = 'USER_LOGIN_BEGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const USER_REGISTER_BEGIN = 'USER_REGISTER_BEGIN'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'


export const user_info = user => ({
    type: USER_INFO,
    user
})
export const user_error = error => ({
    type: USER_ERROR,
    error
})
export const user_clear_error = () => ({
    type: USER_CLEAR_ERROR
})

export const get_user_info = () => dispatch => {
    let username = getUsernameFromStorage()
    api.get('/users/',{
        username
    })
    .then(res => {
        dispatch(user_info(res.data));
        setUsernameToStorage(res.data.username)
    })
}

export const user_login_begin = () => ({
    type: USER_LOGIN_BEGIN
})
export const user_login_success = (user) => ({
    type: USER_LOGIN_SUCCESS,
    user
})
export const user_login_failure = () => ({
    type: USER_LOGIN_FAILURE
})
export const handle_login_user = (username, password) => dispatch => {
    dispatch(user_login_begin())
    if(username === ""){
        let err = {
            title: "Empty username!",
            detail: "Please check your input again..."
        }
        dispatch(user_login_failure())
        dispatch(user_error(err))
    }
    else if(password === ""){
        let err = {
            title: "Empty password!",
            detail: "Please check your input again..."
        }
        dispatch(user_login_failure())
        dispatch(user_error(err))
    }
    else{
        /*
        api.post('/auth',{
            username,
            password
        },{})
        .then(res => {
            dispatch(user_login_success(res.data.user))
            setJwtToStorage(res.data.token)
        })
        .catch(err => {
            dispatch(user_login_failure())
            dispatch(user_error(err))
        })
        */
       setTimeout(()=>{
            console.log(`Username: ${username} - Password: ${password}`)
            let err = {
                title: "Server error!",
                detail: "Please try again later..."
            }
            dispatch(user_login_failure())
            dispatch(user_error(err))
       }, 5000)
    }
}

export const user_register_begin = () => ({
    type: USER_REGISTER_BEGIN
})
export const user_register_success = () => ({
    type: USER_REGISTER_SUCCESS
})
export const user_register_failure = () => ({
    type: USER_REGISTER_FAILURE
})
export const handle_register_user = (username, password, confirmPassword) => dispatch => {
    dispatch(user_register_begin())
    if(username === ""){
        let err = {
            title: "Empty username!",
            detail: "Please check your input again..."
        }
        dispatch(user_register_failure())
        dispatch(user_error(err))
    }
    else if(password === ""){
        let err = {
            title: "Empty password!",
            detail: "Please check your input again..."
        }
        dispatch(user_register_failure())
        dispatch(user_error(err))
    }
    else if(confirmPassword === ""){
        let err = {
            title: "Empty confirm password!",
            detail: "Please check your input again..."
        }
        dispatch(user_register_failure())
        dispatch(user_error(err))
    }
    else if(confirmPassword !== password){
        let err = {
            title: "Confirm password doesn't match!",
            detail: "Please check your input again..."
        }
        dispatch(user_register_failure())
        dispatch(user_error(err))
    }
    else{
        /*
        api.post('/register',{
            username,
            password
        },{})
        .then(res => {
            dispatch(user_register_success(res.data.user))
        })
        .catch(err => {
            dispatch(user_register_failure())
            dispatch(user_error(err))
        })
        */
       setTimeout(()=>{
            console.log(`Username: ${username} - Password: ${password} - Confirm password: ${confirmPassword}`)
            let err = {
                title: "Server error!",
                detail: "Please try again later..."
            }
            dispatch(user_register_failure())
            dispatch(user_error(err))
       }, 5000)
    }
}

