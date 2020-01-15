import {
    GAME_OPEN,
    GAME_QUIT,
    GAME_TIME_DECREASE,
    GAME_ASSIGN_TURN,
    GAME_SWITCH_TURN,
    GAME_TICK,
    GAME_RESET,
    GAME_INIT_TILES,
    GAME_CHECK_WIN,
    GAME_END,
    GAME_START,
    GAME_PLAY_AGAIN
} from '../actions/game'

const initTiles = (rows, cols) => {
    let tiles = []
    for(let i = 0;i < rows*cols; i++){
        tiles.push({value: 0})
    }
    return tiles
}
const initGame = () => ({
    play: true,
    board: {
        rows: 18,
        cols: 22,
        time: 15, 
        max: 15,
        lastTick: -1,
        tileSize: '2rem',
        tiles: [],
        turn: 1,
        myTurn: 1,
        win: null,
        end: true
    },
    hostPoint: 0,
    guestPoint: 0
})
const game = (state = initGame(), action) => {
    switch(action.type){
        case GAME_OPEN:
            return {
                ...state,
                play: true
            }
        case GAME_QUIT:
            return {
                ...state,
                play: false
            }
        case GAME_TIME_DECREASE:
            return{
                ...state,
                board: {
                    ...state.board,
                    time: state.board.time - 1
                }
            }
        case GAME_ASSIGN_TURN:
            return {
                ...state,
                board: {
                    ...state.board,
                    myTurn: action.turn
                }
            }
        case GAME_SWITCH_TURN:
            return {
                ...state,
                board: {
                    ...state.board,
                    turn: state.board.turn === 1 ? 2 : 1
                }
            }
        case GAME_TICK:
            return {
                ...state,
                board: {
                    ...state.board,
                    time: 15,
                    lastTick: action.id,
                    tiles: action.tiles
                }
            }
        case GAME_RESET:
            return initGame()    
        case GAME_INIT_TILES:
            return {
                ...state,
                board: {
                    ...state.board,
                    tiles: initTiles(state.board.rows, state.board.cols)
                }
            }
        case GAME_CHECK_WIN:
            console.log(action.win)
            return {
                ...state,
                hostPoint: state.hostPoint + (action.win ? 1 : 0),
                guestPoint: state.guestPoint + (action.win ? 0 : 1),
                board: {
                    ...state.board,
                    win: action.win
                }

            }     
        case GAME_END:
            return {
                ...state,
                board: {
                    ...state.board,
                    end: true
                }
            } 
        case GAME_START: 
            return {
                ...state,
                board: {
                    ...state.board,
                    end: false
                }
            }
        case GAME_PLAY_AGAIN:
            return {
                ...state,
                board: {
                    ...state.board,
                    tiles: initTiles(state.board.rows, state.board.cols),
                    win: null,
                    lastTick: -1,
                    end: false
                }
            }
        default: 
            return state
    }
}


export default game