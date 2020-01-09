import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Leaderboard from '../components/leaderboard/leaderboard'
import Profile from '../components/profile'
import DBTools from '../components/DBTools'
import ListRoom from '../components/room/list-room'
import PerfectScrollbar from "react-perfect-scrollbar"
import 'react-perfect-scrollbar/dist/css/styles.css'
import ExitButton from '../components/button/btn-img'
import Modal from '../components/modal/modal'
import Loading from '../components/loading'
import { store } from '../index'

const MainWrapper = styled.div`
    width: 100vw;
`
const Header = styled.div`
    padding: 0.75rem 8.75rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const Name = styled.span`
    font-family: Gochi-Hand;
    font-size: 4rem;
`
const Logo = styled.img`
    height: 2.5rem;
    margin-left: 2rem;
`
const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
const Section = styled.div`
    position: relative;
`
const SectionOne = styled.div`
    height: 21.5rem;
    background: ${props => props.color};
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const SectionTwo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 29rem;
    position: relative;
`
const FooterImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    height: 29rem;
`
const GameRoom = styled.div`  
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 2rem;
    position: absolute;
    top: 1.5rem;
    right: 0;  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
`
const WidthLimitContainer = styled.div`
    width: 73rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 100%;
`
class Dashboard extends Component {
    render() {
        let color = store.getState().listRoom.color
        
        // return(
        //     <Loading />
        // )
        
        return (
            <MainWrapper>
                <Modal />
                <Header>
                    <WidthLimitContainer>
                        <LogoWrapper>
                            <Name>GOMOKU</Name>
                            <Logo src={process.env.PUBLIC_URL + '/images/characters.svg'} />
                        </LogoWrapper>
                        <Link to="/login">
                            <ExitButton
                                color="#EB5757"
                                before="/images/exit.svg"
                                after="/images/white-exit.svg"
                            />
                        </Link>
                    </WidthLimitContainer>                   
                </Header>
                <Section>
                    <SectionOne color={color}>
                        <WidthLimitContainer>
                            <Profile />
                            <GameRoom>
                                <DBTools />
                                <PerfectScrollbar>
                                    <ListRoom />
                                </PerfectScrollbar>
                            </GameRoom>
                        </WidthLimitContainer>
                    </SectionOne>
                    <SectionTwo>
                        <FooterImage src={process.env.PUBLIC_URL + '/images/footer.svg'} />
                        <WidthLimitContainer>
                            <Leaderboard />
                        </WidthLimitContainer>
                    </SectionTwo>
                </Section>
            </MainWrapper>
        )
    }
}

export default Dashboard