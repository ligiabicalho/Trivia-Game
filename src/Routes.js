import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default Routes;
