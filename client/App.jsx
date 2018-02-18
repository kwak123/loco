import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import Main from './components/Main.jsx';
import NavBarContainer from './containers/NavBarContainer';

import { checkLogged } from './actions/user';
import store from './store';

class App extends Component {
  componentDidMount() {
    store.dispatch(checkLogged());
  }

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));