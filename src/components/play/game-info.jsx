import React, {Component} from 'react'
import styled from 'styled-components'
import O from './O'
import X from './X'
import { connect } from 'react-redux'
import { rankString, shortenName } from '../../utils/utils'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const AvatarWrapper = styled.div`
    position: relative;
`
const LeftAvatar = styled.img`
    height: 9rem;
`
const RightAvatar = styled.img`
    height: 9rem;
    transform: scaleX(-1)
`
const CheckWrapper = styled.div`
    border-radius: 50%;
    background: white;
    padding: 0.75rem;
    display: inline-block;
    border: 3px solid rgba(224, 224, 224, 0.27);
    position: absolute;
    bottom: 0;
`
const Result = styled.span`
    font-family: 'Gochi-Hand';
    font-size: 5.625rem;
`
const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const UserName = styled.span`
    font-family: Gochi-Hand;
    font-size: 2rem;
`
const RankingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
const RankingLogo = styled.div`
    background-image: url(/images/crown.svg);
    height: 1.25rem;
    width: 1.25rem;
    margin-right: 1.25rem;
`
class GameInfo extends Component{
    render(){
        const {
            host,
            guest,
            hostPoint,
            guestPoint
        } = this.props
        return(
            <MainWrapper>
                <SubWrapper>
                    <AvatarWrapper>
                        <LeftAvatar src={process.env.PUBLIC_URL + `/images/a${host.avatar}.svg`}/>
                        <CheckWrapper style={{left: '0'}}>
                            <O width="3rem" height="3rem" color="#0772B8"/>
                        </CheckWrapper>
                    </AvatarWrapper>
                    <Result style={{marginTop: "3.8rem"}}>{guestPoint}</Result>
                </SubWrapper>
                <SubWrapper>
                    <UserInfo>
                        <UserName>{shortenName(host.username,8)}</UserName>
                        <RankingWrapper>
                            <RankingLogo />
                            <span>{rankString(host.rank)}</span>
                        </RankingWrapper>
                    </UserInfo>
                    <Result>-</Result>
                    <UserInfo>
                        <UserName>{guest === null ? " " : shortenName(guest.username,8)}</UserName>
                        <RankingWrapper>
                            <RankingLogo />
                            <span>{guest === null ? " " : rankString(guest.rank)}</span>
                        </RankingWrapper>
                    </UserInfo>
                </SubWrapper>
                <SubWrapper>
                    <Result style={{marginBottom: "3.8rem"}}>{hostPoint}</Result>
                    <AvatarWrapper>
                        <RightAvatar src={process.env.PUBLIC_URL + `/images/${guest === null ? 'noname' : 'a' + guest.avatar}.svg`}/>
                        <CheckWrapper style={{right: '0'}}>
                            <X width="3rem" height="3rem" color="#EB5757"/>
                        </CheckWrapper>
                    </AvatarWrapper>
                    
                </SubWrapper>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    host: state.room.room.host,
    guest: state.room.room.guest,
    hostPoint: state.game.hostPoint,
    guestPoint: state.game.guestPoint
})
export default connect(
    mapStateToProps
)(GameInfo)