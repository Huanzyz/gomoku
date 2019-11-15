import React, { Component } from 'react'
import styled,{keyframes, css} from 'styled-components'
import Button from './button/btn'
import RefreshBTN from './button/btn-refresh'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Name = styled.span`
    font-family: Gochi-Hand;
    font-size: 2.625rem;
`
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`
class DBTools extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    handleRefresh = () => {
        this.setState(prevState => ({
            loading : !prevState.loading
        }))
    }
    render(){
        const {loading} = this.state;
        return(
            <MainWrapper>
                <Name>Game Rooms</Name>
                <ButtonWrapper>
                    <RefreshBTN
                        color="#0772BB"
                        before="/images/refresh.svg"
                        after="/images/white-refresh.svg"
                        loading={loading.toString()}
                        onClick={this.handleRefresh} 
                    />
                    <div style={{margin: '0 1rem'}}>
                        <Button border="#494949" bg="#fff" color="#494949">Join Room</Button>
                    </div>
                    <Button border="#494949" bg="#494949" color="#fff">Create Room</Button>
                </ButtonWrapper>
            </MainWrapper>
        )
    }
}

export default DBTools