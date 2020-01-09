import api from '../api/api'
import {
    modal_open,
    modal_error
} from '../actions/modal'
import { getRandomNumber } from '../utils/utils'
import { store } from '../index'

export const ROOM_SEARCH_BEGIN = 'ROOM_SEARCH_BEGIN'
export const ROOM_SEARCH_SUCCESS = 'ROOM_SEARCH_SUCCESS'
export const ROOM_SEARCH_FAILURE = 'ROOM_SEARCH_FAILURE'
export const ROOM_JOIN_BEGIN = 'ROOM_JOIN_BEGIN'
export const ROOM_JOIN_SUCCESS = 'ROOM_JOIN_SUCCESS'
export const ROOM_JOIN_FAILURE = 'ROOM_JOIN_FAILURE'
export const ROOM_CREATE_BEGIN = 'ROOM_CREATE_BEGIN'
export const ROOM_CREATE_SUCCESS = 'ROOM_CREATE_SUCCESS'
export const ROOM_CREATE_FAILURE = 'ROOM_CREATE_FAILURE'
export const ROOM_SET_INFO = 'ROOM_SET_INFO'

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

export const handle_search_room = (id) => dispatch => {
    dispatch(room_search_begin())
    if(id === ""){
        let err = {
            title: "Empty Room ID!",
            detail: "Please check your input again..."
        }
        dispatch(room_search_failure())
        dispatch(modal_error(err))
    }
    else{
        /*
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
        */

        // setTimeout(() => {
        //     let err = {
        //         title: "Room is full!",
        //         detail: "Please pick another room ..."
        //     }
        //     dispatch(room_search_failure())
        //     dispatch(modal_error(err))
        // }, 10000)
        setTimeout(() => {
                let data = {
                    id: "8aaf253097",
                    roomName: "abc",
                    betPoints: 1000,
                    hasPassword: true,
                    host: 
                    {
                        username: "abc",
                        avatar: "1",
                        points: 10000,
                        countWin: 100,
                        countDraw: 10,
                        countLose: 30
                    },
                    guest: null,
                    background: "5"
                }
                dispatch(room_search_success(data))
                dispatch(modal_open(2))
        }, 2000)
    }
}

export const room_join_begin = () => ({
    type: ROOM_JOIN_BEGIN
})
export const room_join_success = (room) => ({
    type: ROOM_JOIN_SUCCESS,
    room
})
export const room_join_failure = () => ({
    type: ROOM_JOIN_FAILURE
})
export const handle_join_room = (id, password) => dispatch => {
    dispatch(room_join_begin())
    let isLock = store.getState().room.room.hasPassword
    if(isLock){
        if(password === ""){
            let err = {
                title: "Empty password!",
                detail: "Please check your input again..."
            }
            dispatch(room_join_failure())
            dispatch(modal_error(err))
        }
        else{
            /*
        api.post('/room/join', {
            id,
            password
        })
        .then(res => {
            dispatch(room_join_success(res.data))        
        })
        .catch(err => {
            dispatch(room_join_failure())
            dispatch(modal_error(err))
        })
        */
    
        setTimeout(() => {
            dispatch(room_join_failure())
            dispatch(modal_error({
                title: "Room is full!",
                detail: "Please pick another room ..."
            }))
        }, 3000)
        }
    }
    else{
        /*
        api.post('/room/join', {
            id,
            password
        })
        .then(res => {
            dispatch(room_join_success(res.data))        
        })
        .catch(err => {
            dispatch(room_join_failure())
            dispatch(modal_error(err))
        })
        */
    
        setTimeout(() => {
            dispatch(room_join_failure())
            dispatch(modal_error({
                title: "Room is full!",
                detail: "Please pick another room ..."
            }))
        }, 3000)
    }
}

export const room_create_begin = () => ({
    type: ROOM_CREATE_BEGIN
})
export const room_create_success = (room) => ({
    type: ROOM_CREATE_SUCCESS,
    room
})
export const room_create_failure = () => ({
    type: ROOM_CREATE_FAILURE
})
export const handle_create_room = (roomName, betPoints, password) => dispatch => {
    dispatch(room_create_begin())
    let accountPoints = store.getState().user.user.points
    if(roomName === ""){
        dispatch(room_create_failure())
        dispatch(modal_error({
            title: "Emply room's name!",
            detail: "Please check your input again ..."
        }))
    }
    else if(betPoints === ""){
        dispatch(room_create_failure())
        dispatch(modal_error({
            title: "Emply bet points!",
            detail: "Please check your input again ..."
        }))
    }
    else if(accountPoints < parseInt(betPoints)){
        dispatch(room_create_failure())
        dispatch(modal_error({
            title: "Not enough points!",
            detail: "Please check your input again ..."
        }))
    }
    else {
        let host = store.getState().user.user.username
        /*
        api.post('/room', {
            roomName,
            betPoints,
            background: getRandomNumber(),
            password,
            host
        }, {})
        .then(res => {
            dispatch(room_create_success(res.data))
        })
        .catch(err => {
            dispatch(room_create_failure())
            dispatch(modal_error(err))
        })*/
        setTimeout(() => {
            console.log(`Host: ${host} - Room's name: ${roomName} - Bet points: ${betPoints} - Password: ${password}`)
            dispatch(room_join_failure())
            dispatch(modal_error({
                title: "Server error!",
                detail: "Please try again ..."
            }))
        }, 3000)
    }
}

export const room_set_info = (room) => ({
    type: ROOM_SET_INFO,
    room
})