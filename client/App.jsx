import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import axios from 'axios';

import NavBarContainer from './containers/NavBarContainer';
import LogInContainer from './containers/LogInContainer'
import RoutesContainer from './containers/RoutesContainer';

import styles from './App.css';

import { checkLogged } from './actions/user';
import { store, history } from './store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="app__container">
      <NavBarContainer />
      <Switch> 
        <Route exact path="/" component={RoutesContainer} />
        <Route path="/login" component={LogInContainer} />
      </Switch>
      </div>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('app')
);


/*
<Route exact path="/" render={(props) => <TrainList trains={this.state.trains} {...props} />} />
<Route path="/login" render={(props) => <Login logged={this.props.logged} handleLogin={this.props.handleLogin} {...props} />} />
<Route path="/nav/:routeId" component={Nav} />
<Route path="/detail/:routeId" component={Details} />
*/