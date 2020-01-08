import React from 'react'
import styled, { keyframes } from 'styled-components'
import Main from '../pages/main'

const dots = keyframes`
    0%, 20% {
        color: black;
        text-shadow:
        .25em 0 0 white,
        .5em 0 0 white;
    }
    40% {
        color: black;
        text-shadow:
        .25em 0 0 white,
        .5em 0 0 white;
    }
    60% {
        text-shadow:
        .25em 0 0 black,
        .5em 0 0 white;
    }
    80%, 100% {
        text-shadow:
        .25em 0 0 black,
        .5em 0 0 black;
        }    
`
const LoadingText = styled.h3`
    :after{
        content: ' .';
        animation: ${dots} 1s steps(5, end) infinite
    }
`
const birdFly = keyframes`
    0% {
        transform: translateY(1rem) translateX(0rem) scaleX(1);
    }
    25%{
        transform: translateY(1rem) translateX(-3rem) scaleX(1);
    }
    26%{
        transform: translateY(1rem) translateX(-3rem) scaleX(-1);
    }
    50%{
        transform: translateY(1rem) translateX(0) scaleX(-1);
    }
    75%{
        transform: translateY(1rem) translateX(3rem) scaleX(-1);
    }
    76%{
        transform: translateY(1rem) translateX(3rem) scaleX(1);
    }    
    100%{
        transform: translateY(1rem) translateX(0rem) scaleX(1);
    }
`

const ufoFly = keyframes`
    0% {
        transform: translateY(-1rem) translateX(0rem) scaleX(1);
    }
    25%{
        transform: translateY(-1rem) translateX(-3rem) scaleX(1);
    }
    26%{
        transform: translateY(-1rem) translateX(-3rem) scaleX(-1);
    }
    50%{
        transform: translateY(-1rem) translateX(0) scaleX(-1);
    }
    75%{
        transform: translateY(-1rem) translateX(3rem) scaleX(-1);
    }
    76%{
        transform: translateY(-1rem) translateX(3rem) scaleX(1);
    }    
    100%{
        transform: translateY(-1rem) translateX(0rem) scaleX(1);
    }
`
const TheBird = styled.img`
    height: 2rem;
    width: 2rem;
    transform: translateY(1rem);
    animation: ${birdFly} 5s infinite;
`
const TheUFO = styled.img`
    height: 2rem;
    width: 2rem;
    transform: translateY(-1rem);
    animation: ${ufoFly} 5s infinite;
`
const Loading = () => {
    return (
        <Main>
            <div className="min-vh-100 flex-center ">
                <div className="d-flex flex-column justify-content-center align-items-center"> 
                    <TheUFO src='/images/ufo.svg'/>               
                    <LoadingText>Loading</LoadingText>
                    <TheBird src='/images/tiny-bird.svg'/>
                </div>
            </div>
        </Main>
    )
}
export default Loading