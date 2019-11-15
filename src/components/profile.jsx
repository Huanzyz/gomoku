import React, { Component } from 'react';
import styled from 'styled-components'

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 8.75rem;
`
const Avatar = styled.div`
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    background-image: url('/images/a1.svg');
    background-repeat:no-repeat;
    background-position: center center;
    background-size: contain;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.46);
    background-color: white;
    margin-right: 2rem;
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
    margin-top: 1.875rem;
`
class Profile extends Component {
    render() {
        return (
            <MainWrapper>
                <SubWrapper>
                    <Avatar />
                    <InfoWrapper>
                        <SubWrapper>
                            <Image src={process.env.PUBLIC_URL + '/images/crown.svg'}></Image>
                            <Info>1st</Info>
                        </SubWrapper>
                        <SubWrapper style={{ margin: '1.5rem 0rem' }}>
                            <Image src={process.env.PUBLIC_URL + '/images/swords.svg'}></Image>
                            <Info>32.22%</Info>
                        </SubWrapper>
                        <SubWrapper>
                            <Image src={process.env.PUBLIC_URL + '/images/diamond.svg'}></Image>
                            <Info>10.000 pts</Info>
                        </SubWrapper>
                    </InfoWrapper>
                </SubWrapper>
                <Username>Username</Username>
            </MainWrapper>
        )
    }
}

export default Profile;