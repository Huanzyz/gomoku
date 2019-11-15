import React, {Component} from 'react'
import styled from 'styled-components'
import Input from '../input'
import Button from '../button/btn'
const MainWrapper = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem 4rem;  
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    left: 50%;
`
const Title = styled.span`
    font-size: 2rem;
    margin-bottom: 2rem;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`
const Label = styled.span`
    font-family: Raleway-Medium;
    margin-right: 1.5rem;
`
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
const ExitBTN = styled.img`
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    :hover{
        transform: scale(1.2);
    }
    transition: transform 0.2s ease-in;
`
const Alert = styled.span`
    color: #EF4128;
    margin-top: 1rem;
`
class JoinRoom extends Component{
    constructor(props){
        super(props)
        this.state={
            roomID: "",
            password: "",
            isLock: false,
            error: true,
            alert: {
                title: "Incorrect password!!!",
                detail: "Please check your input again..."
            }
        }
    }
    handleRoomID = (e) => {
        this.setState({
            roomID: e.target.value
        })
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    render(){
        const {roomID, password, alert, error} = this.state;
        return(
            <MainWrapper>
                    <ExitBTN src={process.env.PUBLIC_URL+'/images/close.svg'} onClick={this.props.onClose}/>
                    <Title>Join room</Title>
                    <ContentWrapper>
                        <InputWrapper>
                            <Label>Password</Label>
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.handlePassword}
                                color="#494949"
                                error={error}
                            />
                        </InputWrapper>
                        {error ? 
                            <Alert>
                                <b>{alert.title}</b><br/>
                                {alert.detail}
                            </Alert>
                            : ''
                        }
                    </ContentWrapper>
                    <div style={{marginTop: '1rem'}}>
                        <Button
                            color="#fff"
                            border="#494949"
                            bg="#494949"
                        >
                            Join
                        </Button>
                    </div>
            </MainWrapper>
        )
    }
}

export default JoinRoom