import api, {host_socketio} from '../api/api'
import {
    modal_open,
    modal_error
} from '../actions/modal'
import {
    game_open, game_init_tiles
} from '../actions/game'
import { store } from '../index'
import { getRandomNumber } from '../utils/utils'
import socketIOClient from "socket.io-client"
import { list_room_info_success } from './list-room'
import { rank_info_success } from './rank'
import { game_start, handle_game_tick, handle_game_assign_turn, game_check_win, game_reset } from './game'
import { coordinateToId, getCurrentTime } from '../utils/utils'

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
export const EMPTY = 'EMPTY'
export const ROOM_GUEST_JOIN = 'ROOM_GUEST_JOIN'
export const ROOM_SOCKET = 'ROOM_SOCKET'
export const ROOM_SET_AUTHENTICATED = 'ROOM_SET_AUTHENTICATED'
export const ROOM_PUSH_CHAT = 'ROOM_PUSH_CHAT'

export const room_set_authenticated = (bool) => ({
    type: ROOM_SET_AUTHENTICATED,
    bool
})
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
            let socket = store.getState().room.socket
            let host = store.getState().user.user.username
            socket.emit('join', {
                roomId: id,
                username: host,
                password
            })
      
        }
    }
    else{
        let socket = store.getState().room.socket
        let host = store.getState().user.user.username

        socket.emit('join', {
            roomId: id,
            username: host,
            password
        })
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
        let socket = store.getState().room.socket
        socket.emit('create', {
            roomName,
            betPoint: betPoints,
            password,
            username: host
        })
    }
}

export const room_set_info = (room) => ({
    type: ROOM_SET_INFO,
    room
})

export const room_guest_join = (room) => ({
    type: ROOM_GUEST_JOIN,
    room
})

export const room_socket = (socket) => ({
    type: ROOM_SOCKET,
    socket
})

export const room_push_chat = (chat) => ({
    type: ROOM_PUSH_CHAT,
    chat
})

export const room_send_message = message => dispatch => {
    let socket = store.getState().room.socket
    let username = store.getState().user.user.username
    let roomId = store.getState().room.room.id
    socket.emit('send-message', {
        username,
        roomId,
        message
    })
    dispatch(room_push_chat({
        content: message,
        right: true,
        createAt: getCurrentTime()
    }))
}

export const initialSocketIO = () => dispatch => {
    if(store.getState().room.socket !== undefined)  return ({ type: EMPTY })
    const socket = socketIOClient(host_socketio)

    socket.on('listen-interval-rooms', data => {
        dispatch(list_room_info_success(data.rooms))
    })

    socket.on('listen-interval-rank', data => {
        dispatch(rank_info_success(data.ranking))
    })
    
    socket.on('listen-create', data => {
        if(data.code === 200){
            dispatch(room_create_success(data.room))
            dispatch(game_open())
            dispatch(handle_game_assign_turn())
        }
        else{
            dispatch(room_create_failure())
            dispatch(modal_error(data.error))
        }
    })

    socket.on('listen-join', data => {
        if(data.code === 200){
            dispatch(room_join_success(data.room))
            dispatch(game_open())
            dispatch(handle_game_assign_turn())
        }
        else{
            dispatch(room_join_failure())
            dispatch(modal_error(data.error))
        }
    })

    socket.on('listen-guest-join', data => {

        dispatch(room_guest_join(data))
        dispatch(handle_game_assign_turn())
    })

    socket.on('listen-start', data => {
        if(data === 'go') 
            dispatch(game_start())
            dispatch(game_init_tiles())
    })

    socket.on('listen-move', data => {
        let tiles = store.getState().game.board.tiles
        dispatch(handle_game_tick(coordinateToId(data.x, data.y), tiles))
    })

    socket.on('listen-opponent-out-room', data => {
        let play = store.getState().game.play
        if(play){
            dispatch(game_check_win(true))
            dispatch(room_set_info(data))
            dispatch(handle_game_assign_turn())
            dispatch(game_reset())
        }
    })
    socket.on('listen-message', data => {
        dispatch(room_push_chat({
            content: data.message,
            right: false,
            createAt: getCurrentTime()
        }))
    })

    dispatch(room_socket(socket))
}
