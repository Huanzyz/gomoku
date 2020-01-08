import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from '../../pages/login'
import Register from '../../pages/register'
import Dashboard from '../../pages/dashboard'
import Play from '../../pages/play'

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          render={({location}) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="zoom"
                timeout={600}
              >
                <Switch location={location}>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register} />
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/play" component={Play} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    )
  }
}

export default App;
