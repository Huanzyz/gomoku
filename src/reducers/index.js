import {combineReducers} from 'redux'
import user from './user'
import room from './room'
import listRoom from './list-room'
import rank from './rank'
import modal from './modal'
import game from './game'

export default combineReducers({
    user,
    room,
    listRoom, 
    rank, 
    modal,
    game
})