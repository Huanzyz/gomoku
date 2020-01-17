import React, { Component } from 'react'
import styled,{css} from 'styled-components'
import { connect } from 'react-redux'
import { handle_time_decrease } from '../../actions/game'

const TimeBar = styled.div`
    width: 100%;
    background-color: #333333;
    transition: ${props => props.time !== props.max ? 'width 1s linear' : 'none'};
    height: 10px;
    width: ${props => `calc(100%/${props.max}*${props.time})` }
`

class TimeProgress extends Component {
    componentDidMount(){
        this.timeID = setInterval(()=>{
            this.props.handleTimeDecrease()
        }, 1000)

    }
    componentWillMount(){
        clearInterval(this.timeID)
    }
    render(){
        const { time, max } = this.props
        return (
            <TimeBar time={time} max={max}/>
        )
    }
}
const mapStateToProps = state => ({
    time: state.game.board.time,
    max: state.game.board.max
})
const mapDispatchToProps = dispatch => ({    
    handleTimeDecrease: () => dispatch(handle_time_decrease())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeProgress)