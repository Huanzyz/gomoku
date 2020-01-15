import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { isAuthenticated } from '../utils/utils';

const PrivateRoute = ({component: Component, ...rest}) => ( // destructuring so that we can rename the Component to use a capital C because it's a component
    <Route {...rest} render={(props) => ( // props here contains route props (match, location, history)
        isAuthenticated() === true
        ? <Component {...props} />
        : <Redirect to = {{                     //to: object
            pathname: '/login',                 //pathname: a location to redirect to    
            state: {from: props.location}       //the state object can be accessed via this.props.location.state in the redirected-to component
            //state.from : the page the user is trying to go to
        }} />
    )} />
)

export default PrivateRoute