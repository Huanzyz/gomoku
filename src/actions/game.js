import {store} from '../index'
import { IdToCoordinate } from '../utils/utils'
import { modal_close } from './modal'

export const CHESS_X = 1;
export const CHESS_O = 2;
export const GAME_OPEN = 'GAME_OPEN'
export const GAME_QUIT = 'GAME_QUIT'
export const GAME_TIME_DECREASE = 'GAME_TIME_DECREASE'
export const GAME_ASSIGN_TURN = 'GAME_ASSIGN_TURN'
export const GAME_SWITCH_TURN = 'GAME_SWITCH_TURN'
export const GAME_TICK = 'GAME_TICK'
export const GAME_RESET = 'GAME_RESET'
export const GAME_INIT_TILES = 'GAME_INIT_TILES'
export const GAME_RANDOM_PLAYING = 'GAME_RANDOM_PLAYING'
export const GAME_CHECK_WIN = 'GAME_CHECK_WIN'
export const GAME_END = 'GAME_END'
export const GAME_START = 'GAME_START'
export const GAME_PLAY_AGAIN = 'GAME_PLAY_AGAIN'

export const game_open = () => dispatch =>{
    dispatch(modal_close())
    dispatch({
        type: GAME_OPEN
    })
}
export const game_quit = () => dispatch => {
    let socket = store.getState().room.socket
    let username = store.getState().user.user.username
    let roomId = store.getState().room.room.id
    socket.emit('exit',{
        username,
        roomId
    })
    dispatch({
        type: GAME_QUIT
    })
}
export const game_time_decrease = () => ({
    type: GAME_TIME_DECREASE
})
export const game_assign_turn = (turn) => ({
    type: GAME_ASSIGN_TURN,
    turn
})
export const handle_game_assign_turn = () => dispatch => {
    let host = store.getState().room.room.host.username
    let currentUser = store.getState().user.user.username
    dispatch(game_assign_turn(host === currentUser ? 1 : 2))
}
export const game_switch_turn = () => ({
    type: GAME_SWITCH_TURN
})
export const game_tick = (id, tiles) => ({
    type: GAME_TICK,
    id,
    tiles
})
export const game_reset = () =>  dispatch => {
    dispatch({
        type: GAME_RESET
    })
    dispatch(game_init_tiles())
}
export const game_init_tiles = () => ({
    type: GAME_INIT_TILES
})
export const handle_game_tick = id => dispatch => {
    let {tiles, turn} = store.getState().game.board
    let socket = store.getState().room.socket
    let username = store.getState().user.user.username
    let roomId = store.getState().room.room.id
    let win = store.getState().room.room.win
    let result = ""
    let coordinate = IdToCoordinate(id)
    if(tiles[id].value === 0){
        tiles[id].value = turn
        dispatch(game_tick(id, tiles))        
        dispatch(handle_check_win())
        result = win === null ? "" : win === true ? "win" : "lose"
        socket.emit('send-move',{
            username,
            roomId,
            x: coordinate.x,
            y: coordinate.y,
            result
        })
        dispatch(game_switch_turn())        
    }   
}
export const handle_time_decrease = () => dispatch => {
    let { time, end, turn, myTurn } = store.getState().game.board
    if( time > 0){
        if(!end 
            // && turn  myTurn
            )
            dispatch(game_time_decrease())
    }
    else{
        let { tiles } = store.getState().game.board
        let n = tiles.length
        let randomID = Math.floor(Math.random()*n)
        while(tiles[randomID].value !== 0){
            randomID = Math.floor(Math.random()*n)
        }
        dispatch(handle_game_tick(randomID));
    }
}
const checkVertical = ({rows, cols, lastTick, tiles, turn}) => {
    let userChess = turn
    let opponentChess = turn === CHESS_X ? CHESS_O : CHESS_X

    let count = 1
    
    let i = Math.floor(lastTick / cols) //row index of last tick
    let j = lastTick % cols // columns index of last tick

    for(let k = 1; k < 6 ; k++){
        if(i - k < 0) break
        let id = (i - k) * cols + j
        if(tiles[id].value === userChess){
            count++
            if(count === 5) return true
        }
        else 
            break
    }

    for(let k = 1; k < 6; k++){
        if(i + k === rows) break
        let id = (i + k) * cols + j
        if(tiles[id].value === userChess){
            count++
            if(count === 5) return true
        }
        else
            break;
    }
    return false
}
const checkHorizontal = ({rows, cols, lastTick, tiles, turn}) => {
    let userChess = turn
    let opponentChess = turn === CHESS_X ? CHESS_O : CHESS_X

    let count = 1
    
    let i = Math.floor(lastTick / cols) //row index of last tick
    let j = lastTick % cols // column index of last tick

    for(let k = 1; k < 6 ; k++){
        if(j - k < 0) break
        let id = i * cols + (j - k)
        if(tiles[id].value === userChess){
            count++
            if(count === 5) return true
        }
        else 
            break
    }

    for(let k = 1; k < 6; k++){
        if(j + k === cols) break
        let id = i * cols + (j + k)
        if(tiles[id].value === userChess){
            count++
            if(count === 5) return true
        }
        else
            break;
    }
    return false
}
const checkMajorDiagonal = ({rows, cols, lastTick, tiles, turn}) => {
    let userChess = turn
    let opponentChess = turn === CHESS_X ? CHESS_O : CHESS_X

    let count = 1
    
    let i = Math.floor(lastTick / cols) //row index of last tick
    let j = lastTick % cols // column index of last tick

    for(let k = 1; k < 6 ; k++){
        if(j - k < 0 || i - k < 0) break
        let id = (i - k) * cols + (j - k)
        if(tiles[id].value === userChess) {
            count++
            if(count === 5) return true
        }
        else 
            break
    }

    for(let k = 1; k < 6; k++){
        if(j + k === cols || i + k === rows) break
        let id = (i + k) * cols + (j + k)
        if(tiles[id].value === userChess){
            count++
            if(count === 5) return true
        }
        else
            break;
    }
    return false
}
const checkMinorDiagonal = ({rows, cols, lastTick, tiles, turn}) => {
    let userChess = turn
    let opponentChess = turn === CHESS_X ? CHESS_O : CHESS_X

    let count = 1
    
    let i = Math.floor(lastTick / cols) //row index of last tick
    let j = lastTick % cols // column index of last tick

    for(let k = 1; k < 6 ; k++){
        if(j + k === cols || i - k < 0) break
        let id = (i - k) * cols + (j + k)
        if(tiles[id].value === userChess) {
            count++
            if(count === 5) return true
        }
        else 
            break
    }

    for(let k = 1; k < 6; k++){
        if(j - k < 0 || i + k === rows) break
        let id = (i + k) * cols + (j - k)
        if(tiles[id].value === userChess){
            count++
            if(count === 5) return true
        }
        else
            break;
    }
    return false
}
export const game_check_win = (win) => dispatch => {
    let host = store.getState().room.room.host.username
    let currentUser = store.getState().user.user.username
    dispatch({
        type: GAME_CHECK_WIN,
        win,
        isHost: host === currentUser
    })
}
export const game_end = () => ({
    type: GAME_END
})
export const handle_check_win = () => dispatch => {
    let { board } = store.getState().game
    let { turn, myTurn } = board
    if(
        checkVertical(board) ||
        checkHorizontal(board) ||
        checkMajorDiagonal(board) ||
        checkMinorDiagonal(board)
    )
    {
        dispatch(game_check_win(turn === myTurn))
        dispatch(game_end())
    }
}
export const game_start = () => ({
    type: GAME_START
})
export const handle_game_start = () => dispatch => {
    let socket = store.getState().room.socket
    let username = store.getState().user.user.username
    let roomId = store.getState().room.room.id
    socket.emit('start', {
        username,
        roomId
    })
}
export const game_play_again = () => dispatch => {
    dispatch(handle_game_start())
    dispatch({
        type: GAME_PLAY_AGAIN
    })
}
