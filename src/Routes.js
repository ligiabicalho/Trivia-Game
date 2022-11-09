import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Game from './pages/Game';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
    );
  }
}

export default Routes;
