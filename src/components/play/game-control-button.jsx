import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../button/btn'

class GameControlButton extends Component {
    state = {
        status: 3
    }
    render() {
        const {status} = this.state
        return (
            <React.Fragment>
            <Button
                border="#18A08A"
                bg="#18A08A"
                color="white"
                onClick={this.toggleWaiting}
            >
                Start game
            </Button>
            {
                (status === 3) && 
                <div style={{marginLeft: '1.75rem'}}>
                    <Button
                        border="#EF4128"
                        bg="#EF4128"
                        color="white"
                        onClick={this.toggleWaiting}
                        >
                        Quit
                    </Button>
                </div>
            }
            </React.Fragment>
        )
    }
}

export default GameControlButton