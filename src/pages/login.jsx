import React, { Component } from 'react';
import Main from './main'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import {Link as LinkRouter, Redirect} from 'react-router-dom'
import Input from '../components/input';
import { clearError, receiveError } from "../actions/user";
import { connect } from "react-redux";
import {isEmptyString, setUsernameToStorage, setJwtToStorage} from '../utils/utils'
import api from '../api/api'

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
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false,  
            usernameInput : "",
            passwordInput: ""
        }
    }  

    handleUsernameInput = e => {
        this.props.clearError();
        this.setState({
            usernameInput: e.target.value            
        })
    }
    handlePasswordInput = e => {
        this.props.clearError();
        this.setState({
            passwordInput: e.target.value
        })
    }

    checkInput = () => {
        const {usernameInput, passwordInput} = this.state
        if(isEmptyString(usernameInput) || isEmptyString(passwordInput)){
            this.props.setError({
                title: "Invalid input!",
                detail: "Please check your input again..."                
            })
            return false;
        }
        return true;
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {usernameInput, passwordInput} = this.state
        if(this.checkInput()){
            api.post('/auth', {
                username: usernameInput,
                password: passwordInput
            })
            .then(res => {
                setUsernameToStorage(res.data.user.username)
                setJwtToStorage(res.data.token)
                this.props.saveUserInfo(res.data.user)
                this.setState({
                    redirectToReferrer: true
                })
            })
            .catch(err => {
                this.props.setError({
                    title: err.response.data.title,
                    detail: err.response.data.detail                    
                })
            })
        }        
    }
    render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        const {redirectToReferrer} = this.state;
        
        if(redirectToReferrer === true){
            return <Redirect to={from} />
        }

        const {
            usernameInput, 
            passwordInput
        } = this.state;
        const {
            error,
            alert
        } = this.props
        return (
            <Main>
                <Row noGutters='true' className='min-vh-100 flex-center'>
                    <Col lg="8" className="py-3">
                        <Row noGutters="true" className="h-100">
                            <Col md="5">
                                <FormWrapper>
                                    <FormLabel>Account Login</FormLabel>
                                    <form onSubmit={this.handleSubmit}>
                                        <InputGroup>
                                            <InputLabel>Username</InputLabel>
                                            <Input 
                                                name="username" 
                                                type="text" 
                                                value={usernameInput}
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
                                                value={passwordInput}
                                                onChange={this.handlePasswordInput} 
                                                error={error}
                                                color="#0772B8"
                                                />
                                        </InputGroup>
                                        <Alert error={error}>
                                            <b>{alert.title}</b><br></br>{alert.detail}
                                        </Alert>
                                        <Button
                                            className="btn-block"
                                            variant="primary"
                                            type="submit"
                                        >
                                            Log in
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
                    </Col>
                </Row>
            </Main>
        )
    }
}
const mapStateToProps = state => ({
    error: state.user.error,
    alert: state.user.alert
})
const mapDispatchToProps = dispatch => ({
    setError: alert => dispatch(receiveError(alert)),
    clearError: () => dispatch(clearError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)