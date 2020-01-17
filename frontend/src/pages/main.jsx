import React, {Component} from 'react';
import Container from "react-bootstrap/Container";

export default class extends Component{
    render(){
        return(
            <Container fluid='true'>
                    {this.props.children}
            </Container>
        )
    }
}