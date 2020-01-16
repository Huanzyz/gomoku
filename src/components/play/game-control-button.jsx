import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../button/btn'
import { game_quit, handle_game_start , game_play_again} from '../../actions/game'
import { connect } from 'react-redux'

class GameControlButton extends Component {
    render() {
        const { end, win, currentUser, host, handleQuitGame, handleStartGame, handlePlayAgain } = this.props
        return (
            <React.Fragment>
            {(win === null && end && currentUser === host) &&
                <Button
                    border="#18A08A"
                    bg="#18A08A"
                    color="white"
                    onClick={handleStartGame}
                >
                    Start game
                </Button>
            }
            {(win !== null && end && currentUser === host) &&
                <Button
                    border="#f7b731"
                    bg="#fed330" 
                    color="white"
                    onClick={handlePlayAgain}
                >
                    Play again
                </Button>
            }
            <div style={{marginLeft: '1.75rem'}}>
                <Button
                    border="#EF4128"
                    bg="#EF4128"
                    color="white"
                    onClick={handleQuitGame}
                    >
                    Quit
                </Button>
            </div>
            
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    win: state.game.board.win,
    end: state.game.board.end,
    currentUser: state.user.user.username,
    host: state.room.room.host.username
})
const mapDispatchToProps = dispatch => ({
    handleQuitGame: () => dispatch(game_quit()),
    handleStartGame : () => dispatch(handle_game_start()),
    handlePlayAgain: () => dispatch(game_play_again())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameControlButton)