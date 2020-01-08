import React, { Component } from 'react';
import Main from './main'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import {Link as LinkRouter, Redirect} from 'react-router-dom'
import Input from '../components/input'
import { receiveError, clearError } from '../actions/user';
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
    background-color: #18A09C;
    border-radius: 5px;
    height: 2.25rem;
    color: white;
    font-family: Raleway-SemiBold;
    border: none;
    :hover{
        background-color: #01A3A4;
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
    cursor: pointer;
    color: black;
    :hover {
        color: #18A09C !important;
        text-decoration: underline !important;
    }
`
const Image = styled.img`
    height: 11rem;
    margin-top: 2rem;
`
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false, 
            usernameInput : "",
            passwordInput: "",
            confirmPasswordInput: ""
        }
    }    

    handleUsernameInput = e => {
        this.props.clearError()
        this.setState({
            usernameInput: e.target.value
        })
    }
    handlePasswordInput = e => {
        this.props.clearError()
        this.setState({
            passwordInput: e.target.value
        })
    }
    handleConfirmPasswordInput = e => {
        this.props.clearError()
        this.setState({
            confirmPasswordInput: e.target.value
        })
    }
    checkInput = () => {
        const {usernameInput, passwordInput, confirmPasswordInput} = this.state
        if(isEmptyString(usernameInput) || isEmptyString(passwordInput) || isEmptyString(confirmPasswordInput)){
            this.props.setError({
                title: 'Invalid input!',
                detail: 'Please check your input again...'
            })
            return false
        }
        if(passwordInput !== confirmPasswordInput){
            this.props.setError({
                title: `Confirm password doesn't match`,
                detail: 'Please check your input again...'
            })
            return false
        }
        return true
    }
    handleSubmit = e => {
        e.preventDefault()
        if(this.checkInput()){
            const {usernameInput, passwordInput} = this.state
            api.post('/register', {
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
        const {redirectToReferrer} = this.state;

        if(redirectToReferrer === true) {
            return <Redirect to="/" />
        }
        let {
            usernameInput, 
            passwordInput, 
            confirmPasswordInput
        } = this.state;

        let {
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
                                    <FormLabel>Register</FormLabel>
                                    <form onSubmit={this.handleSubmit}>
                                        <InputGroup>
                                            <InputLabel>Username</InputLabel>
                                            <Input
                                                name="username"
                                                type="text"
                                                value = {usernameInput}
                                                onChange = {this.handleUsernameInput}
                                                error={error}
                                                color="#18A09C"
                                            />                                            
                                        </InputGroup>
                                        <InputGroup>
                                            <InputLabel>Password</InputLabel>
                                            <Input
                                                name="password"
                                                type="password"
                                                value = {passwordInput}
                                                onChange = {this.handlePasswordInput}
                                                error={error}
                                                color="#18A09C"
                                            />  
                                        </InputGroup>
                                        <InputGroup>
                                            <InputLabel>Confirm password</InputLabel>
                                            <Input
                                                name="confirm-pass"
                                                type="password"
                                                value = {confirmPasswordInput}
                                                onChange = {this.handleConfirmPasswordInput}
                                                error={error}
                                                color="#18A09C"
                                            />
                                        </InputGroup>
                                        <Alert error={error}>
                                            <b>{alert.title}</b><br></br>{alert.detail}
                                        </Alert>
                                        <Button
                                            className="btn-block"
                                            variant="primary"
                                            onClick={this.alert}
                                            type="submit"
                                        >
                                            Sign up
                                        </Button>
                                    </form>
                                </FormWrapper>
                            </Col>
                            <Col md="7">
                                <InfoWrapper>
                                    <Logo>GOMOKU</Logo>
                                    <span>This caro game is a product with our enthusiasm.<br></br>First product that we apply new technology such as React, Redux.<br></br>Made by Tran - Huan</span>
                                    <LinkWrapper><LinkRouter to="/login"><Link>Already a member? Log in here ...</Link></LinkRouter></LinkWrapper>
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)