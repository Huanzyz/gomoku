import React, { Component } from 'react'
import Main from './main'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getRandomColor } from '../utils/utils'
import Leaderboard from '../components/leaderboard/leaderboard'
import Profile from '../components/profile'
import DBTools from '../components/DBTools'
import ListRoom from '../components/room/list-room'
import PerfectScrollbar from "react-perfect-scrollbar"
import 'react-perfect-scrollbar/dist/css/styles.css'
import ExitButton from '../components/button/btn-img'
import Modal from '../components/modal/modal'

const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
`
const Header = styled.div`
    padding: 0.75rem 8.75rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
`
const SectionTwo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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
    top: 50%;
    transform: translateY(-50%);
    right: 8.75rem;  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: true,
            typeOfModal: 1,
        }
    }
    handleOpenModal = (type) => {
        this.setState({
            showModal: true,
            type: type
        })        
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
    }
    handleCloseModal = () => {
        this.setState({
            showModal: false
        })
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    render() {
        const {showModal, typeOfModal} = this.state;
        return (
            <Main>
                <MainWrapper>
                    {showModal ? <Modal onClose={this.handleCloseModal} type={typeOfModal}/> : ''}
                    <Header>
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
                    </Header>
                    <Section>                        
                        <SectionOne color={getRandomColor()}>
                            <Profile />
                        </SectionOne>
                        <SectionTwo>
                            <FooterImage src={process.env.PUBLIC_URL + '/images/footer.svg'} />
                            <Leaderboard />
                        </SectionTwo>
                        <GameRoom>
                            <DBTools onOpen={this.handleOpenModal}></DBTools>
                            <PerfectScrollbar>
                                <ListRoom onOpen={this.handleOpenModal}/>
                            </PerfectScrollbar>                            
                        </GameRoom>
                    </Section>                    
                </MainWrapper>
            </Main>
        )
    }
}

export default Dashboard