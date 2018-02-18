import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import NavBarContainer from '../containers/NavBarContainer';
import LogInContainer from '../containers/LogInContainer';
import RoutesContainer from '../containers/RoutesContainer';

export default class Main extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="outer">
          <NavBarContainer />
          <Switch>
            <Route path="/" component={RoutesContainer} />
            <Route path="/login" component={LogInContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

/*
<Route exact path="/" render={(props) => <TrainList trains={this.state.trains} {...props} />} />
<Route path="/login" render={(props) => <Login logged={this.props.logged} handleLogin={this.props.handleLogin} {...props} />} />
<Route path="/nav/:routeId" component={Nav} />
<Route path="/detail/:routeId" component={Details} />
*/