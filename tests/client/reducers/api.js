import apiReducer from '../../../client/reducers/api';
import {
  GET_ROUTES_SUCCESS,
  GET_ROUTES_FAIL,
  GET_SERVICE_SUCCESS,
  GET_SERVICE_FAIL,
  ORGANIZE_ROUTES_SUCCESS,
  ORGANIZE_ROUTES_FAIL,
  GET_STOPS_SUCCESS,
  GET_STOPS_FAIL
} from '../../../client/actions/api';

import mockService from '../shared/mock-service.json';
import mockRoutes from '../shared/mock-routes.json';
import mockStops from '../shared/mock-stops.json';
import organizedRoutes from '../shared/organized-routes.json';

const initialState = { routes: [], service: [], organized: {}, stops: [], error: '' };

describe('apiReducers', () => {
  it("should have default state { routes: [], service: [], organized: {}, stops: [] }", () => {
    let reduced = apiReducer(undefined, 'invalid action');
    let expected = initialState;
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_ROUTES_SUCCESS with expected payload', () => {
    let action = { type: GET_ROUTES_SUCCESS, routes: mockRoutes };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { routes: mockRoutes });
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_ROUTES_FAIL with error payload', () => {
    let error = 'test error';
    let action = { type: GET_ROUTES_FAIL, error };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { error });
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_SERVICE_SUCCESS with expected payload', () => {
    let action = { type: GET_SERVICE_SUCCESS, service: mockService.lines };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { service: mockService.lines });
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_SERVICE_FAIL with error payload', () => {
    let error = 'test error';
    let action = { type: GET_SERVICE_FAIL, error };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { error });
    expect(reduced).toEqual(expected);
  });

  it('should accept ORGANIZE_ROUTES_SUCCESS', () => {
    let action = { type: ORGANIZE_ROUTES_SUCCESS, organized: { test: true } };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { organized: { test: true } });
    expect(reduced).toEqual(expected);
  });

  it('should accept ORGANIZE_ROUTES_FAIL with error payload', () => {
    let error = 'test error';
    let action = { type: ORGANIZE_ROUTES_FAIL, error };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { error });
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_STOPS_SUCCESS with expected payload', () => {
    let action = { type: GET_STOPS_SUCCESS, stops: mockStops };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { stops: mockStops });
    expect(reduced).toEqual(expected);
  });

  it('should accept GET_STOPS_FAIL with error payload', () => {
    let error = 'test error';
    let action = { type: GET_STOPS_FAIL, error };
    let reduced = apiReducer(undefined, action);
    let expected = Object.assign({}, initialState, { error });
    expect(reduced).toEqual(expected);
  });
});