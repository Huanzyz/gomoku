import React, { Component } from 'react';
import styled from 'styled-components'
import { rankString, rateString, formatNumber, shortenName } from '../utils/utils'
import { get_user_info } from '../actions/user'
import { connect } from 'react-redux'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding-bottom: 2.5rem;
`
const Avatar = styled.div`
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    background-image: ${props => `url(${props.url})`};
    background-repeat:no-repeat;
    background-position: center center;
    background-size: contain;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.46);
    background-color: white;
    margin-right: 2rem;
    position: relative;
    text-align: center;
`
const SubWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Image = styled.img`
    height: 2rem;
    width: 2rem;
    margin-right: 0.7rem;
`
const Info = styled.span`
    font-size: 1.25rem;
    color: white;
`
const Username = styled.span`
    font-size: 1.875rem;
    color: white;
    position: absolute;
    bottom: 0;
    right: 50%;
    bottom: -3.875rem;
    right: 50%;
    transform: translateX(60%);
    width: 100%;
`
class Profile extends Component {
    componentDidMount(){
        const { user } = this.props
        this.props.getUserInfo(user.username)
    }
    render() {
        const {
            user
        } = this.props
        let countWin = parseInt(user.winCount);
        let countTotal = countWin + parseInt(user.drawCount)+ parseInt(user.loseCount);
        if(countTotal === 0) countTotal = 1
        return (
            <MainWrapper>
                <SubWrapper>
                    <Avatar url={`${process.env.PUBLIC_URL}/images/a${user.avatar}.svg`}>
                        <Username>{shortenName(user.username, 11)}</Username>
                    </Avatar>
                    <InfoWrapper>
                        <SubWrapper>
                            <Image src={process.env.PUBLIC_URL + '/images/crown.svg'}></Image>
                            <Info>{rankString(user.rank)}</Info>
                        </SubWrapper>
                        <SubWrapper style={{ margin: '1.5rem 0rem' }}>
                            <Image src={process.env.PUBLIC_URL + '/images/swords.svg'}></Image>
                            <Info>{rateString(countWin/countTotal)}</Info>
                        </SubWrapper>
                        <SubWrapper>
                            <Image src={process.env.PUBLIC_URL + '/images/diamond.svg'}></Image>
                            <Info>{formatNumber(parseInt(user.points))} pts</Info>
                        </SubWrapper>
                    </InfoWrapper>
                </SubWrapper>
            </MainWrapper>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user.user
})
const mapDispatchToProps = dispatch => ({
    getUserInfo: (id) => dispatch(get_user_info(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)