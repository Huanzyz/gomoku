import React, { Component } from 'react';
import Main from './main'
import { Row, Col } from 'react-bootstrap'
import styled, {keyframes} from 'styled-components'
import {Link as LinkRouter, Redirect} from 'react-router-dom'
import Input from '../components/input';
import { user_clear_error, user_login_begin, user_login_success, user_login_failure, user_error } from "../actions/user";
import { connect } from "react-redux"
import api from '../api/api'
import { setJwtToStorage, setUsernameToStorage } from '../utils/utils'
import { room_set_authenticated } from '../actions/room'

const FormWrapper = styled.div`
    border: 3px solid #E0E0E0;
    border-radius: 10px;
    padding: 4rem 2.5rem;
    display: inline-block;
`
const InputLabel = styled.label`
    font-family: Raleway-SemiBold;
    margin-bottom: 0.5rem
`
const FormLabel = styled.h2`
    font-family: Gochi-Hand;
    margin-bottom: 3rem
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 16rem;
    margin-bottom: 2rem;
`
const Alert = styled.span`
    color: #EF4128;
    opacity: ${props => props.error === false ? "0" : "1"};
    position: ${props => props.error === false ? "absolute" : "relative"};
    transition: opacity 0.5s linear;
`
const Button = styled.button`
    background-color: #0772B8;
    border-radius: 5px;
    height: 2.25rem;
    color: white;
    font-family: Raleway-SemiBold;
    border: none;
    :hover{
        background-color: #007BFF;
    }
    transition: background-color 0.2s linear;
    margin-top: 2rem;
    display: flex !important;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0%;
`
const Logo = styled.span`
    font-family: Gochi-Hand;
    font-size: 5rem;
    margin-bottom: 4rem;
`
const LinkWrapper = styled.div`
    margin-top: 3rem;
`
const Link = styled.span`
    font-family: Raleway-SemiBold;
    font-size: 1rem;
    margin-top: 3rem;
    cursor: pointer;
    color: black !important;
    :hover {
        color: #0772B8 !important;
        text-decoration: underline !important;
    }
`
const Image = styled.img`
    height: 11rem;
    margin-top: 2rem;
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
const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const LoadingLogo = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    background-image: url(/images/white-refresh.svg);
    animation: ${rotate} 1s linear infinite;
`
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,  
            username: "",
            password: ""
        }
    }  
    componentDidMount(){
        this.props.clearError()
    }
    handleUsernameInput = e => {
        if(this.props.loading !== true){
            this.props.clearError()
            this.setState({
                username: e.target.value            
            })
        }
    }
    handlePasswordInput = e => {
        if(this.props.loading !== true){
            this.props.clearError()
            this.setState({
                password: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        if(this.props.loading !== true){
            this.props.userLoginBegin()
            if(username === ""){
                let err = {
                    title: "Empty username!",
                    detail: "Please check your input again..."
                }
                this.props.userLoginFailure()
                this.props.userError(err)
            }
            else if(password === ""){
                let err = {
                    title: "Empty password!",
                    detail: "Please check your input again..."
                }
                this.props.userLoginFailure()
                this.props.userError(err)
            }
            else{
                api.post('/auth',{
                    username,
                    password
                },{})
                .then(res => {
                    this.props.userLoginSuccess(res.data.user)
                    setJwtToStorage(res.data.token)
                    setUsernameToStorage(res.data.user.username)
                    this.props.roomSetAuthenticate(true)
                    this.setState({
                        redirectToReferrer: true
                    })
                })
                .catch(err => {
                    this.props.userLoginFailure()
                    this.props.userError(err)
                })
            }   
        }
    }
    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        const {redirectToReferrer} = this.state;        
        if(redirectToReferrer === true){
            return <Redirect to={from} />
        }
        const {
            username, 
            password
        } = this.state;
        const {
            loading,
            error,
            errorInfo
        } = this.props
        return (
            <Main>
                <Row noGutters='true' className='min-vh-100 flex-center'>
                    <MainWrapper>
                        <WidthLimitContainer>
                        <Row noGutters="true" className="h-100 w-100">
                            <Col md="5">
                                <FormWrapper>
                                    <FormLabel>Account Login</FormLabel>
                                    <form onSubmit={this.handleSubmit}>
                                        <InputGroup>
                                            <InputLabel>Username</InputLabel>
                                            <Input 
                                                name="username" 
                                                type="text" 
                                                value={username}
                                                onChange={this.handleUsernameInput} 
                                                error={error}
                                                color="#0772B8"
                                                />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputLabel>Password</InputLabel>
                                            <Input 
                                                name="password" 
                                                type="password" 
                                                value={password}
                                                onChange={this.handlePasswordInput} 
                                                error={error}
                                                color="#0772B8"
                                                />
                                        </InputGroup>
                                        <Alert error={error}>
                                            <b>{errorInfo.title}</b><br></br>{errorInfo.detail}
                                        </Alert>
                                        <Button
                                            className="btn-block"
                                            variant="primary"
                                            type="submit"
                                        >
                                           {loading ? <LoadingLogo /> : "Log in"}
                                        </Button>
                                    </form>
                                </FormWrapper>
                            </Col>
                            <Col md="7">
                                <InfoWrapper>
                                    <Logo>GOMOKU</Logo>
                                    <span>This caro game is a product with our enthusiasm.<br></br>First product that we apply new technology such as React, Redux.<br></br>Made by Tran - Huan</span>
                                    <LinkWrapper><LinkRouter to="/register"><Link>New member? Sign up now ...</Link></LinkRouter></LinkWrapper>
                                    <Image src={process.env.PUBLIC_URL + "/images/characters.svg"} />
                                </InfoWrapper>
                            </Col>
                        </Row>
                        </WidthLimitContainer>
                    </MainWrapper>
                </Row>
            </Main>
        )
    }
}
const mapStateToProps = state => ({
    loading: state.user.loading,
    error: state.user.error,
    errorInfo: state.user.errorInfo
})
const mapDispatchToProps = dispatch => ({
    clearError: () => dispatch(user_clear_error()),
    userLoginBegin: () => dispatch(user_login_begin()),
    userLoginSuccess: (user) => dispatch(user_login_success(user)),
    userLoginFailure: () => dispatch(user_login_failure()),
    userError: (err) => dispatch(user_error(err)),
    roomSetAuthenticate: (bool) => dispatch(room_set_authenticated(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)