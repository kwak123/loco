// TODO: Add fail handlers

import {
  GET_ROUTES_SUCCESS,
  // GET_ROUTES_FAIL,
  GET_SERVICE_SUCCESS,
  // GET_SERVICE_FAIL,
  ORGANIZE_ROUTES_SUCCESS,
  // ORGANIZE_ROUTES_FAIL,
  GET_STOPS_SUCCESS,
  // GET_STOPS_FAIL
} from '../actions/api';

import initialState from '../store/initial-state';
const apiState = initialState.api;

export default (state = apiState, action) => {
  switch (action.type) {
    case GET_ROUTES_SUCCESS:
      // Replace the old routes, don't want to hold on to those
      return Object.assign({}, state, { routes: action.routes });
    case GET_SERVICE_SUCCESS:
      // Replace the old service data, don't want to hold on to those
      return Object.assign({}, state, { service: action.service });
    case ORGANIZE_ROUTES_SUCCESS:
      // Replace old organized routes, may be out of date
      return Object.assign({}, state, { organized: action.organized });
    case GET_STOPS_SUCCESS:
      return Object.assign({}, state, { stops: action.stops });
    default: return state;
  }
};