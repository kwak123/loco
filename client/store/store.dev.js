import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Loco reducers
import locoReducers from '../reducers';

const reducer = combineReducers({ routerReducer, ...locoReducers });

export const history = createHistory();
const reactRouterRedux = routerMiddleware(history);

/* Middle wares */
import thunk from 'redux-thunk';

const middleware = [thunk, reactRouterRedux];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import initialState from './initial-state';

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);