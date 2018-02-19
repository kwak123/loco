import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import axios from 'axios';

import Main from './components/Main.jsx';
import NavBarContainer from './containers/NavBarContainer';
import LogInContainer from './containers/LogInContainer'
import RoutesContainer from './containers/RoutesContainer';

import { checkLogged } from './actions/user';
import { store, history } from './store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="outer">
      <NavBarContainer />
      <Switch>
        <Route exact path="/" component={RoutesContainer} />
        <Route path="/login" component={LogInContainer} />
      </Switch>
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('app'));