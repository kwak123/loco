import moxios from 'moxios';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import * as apiActions from '../../../client/actions/api';
import mockRoutes from '../shared/mock-routes.json';
import mockServiceObj from '../shared/mock-service.json';
import mockStops from '../shared/mock-stops.json';
import organizedRoutes from '../shared/organized-routes.json';

import * as util from '../../../client/lib/util';

// Nature of MTA data means the actually used data is in the lines property
const mockService = mockServiceObj.lines;

describe('api actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({ routes: [], service: [], organized: {}, stops: [], error: '' });
    moxios.install()
  });
  afterEach(() => moxios.uninstall());

  describe('getRoutes', () => {
    it('should return GET_ROUTES_START then GET_ROUTES_SUCCESS, if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200, response: mockRoutes }));

      let expectedActions = [
        { type: apiActions.GET_ROUTES_START },
        { type: apiActions.GET_ROUTES_SUCCESS, routes: mockRoutes }
      ];
      
      return store.dispatch(apiActions.getRoutes()).then(() => {
        // TODO: checks if actions has the desired routes... consider separating?
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should return GET_ROUTES_START then GET_ROUTES_FAIL with error payload', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 400 }));

      let expectedActions = [
        { type: apiActions.GET_ROUTES_START },
        { type: apiActions.GET_ROUTES_FAIL, error: 'Request failed with status code 400' }
      ];

      return store.dispatch(apiActions.getRoutes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getService', () => {
    it('should return GET_SERVICE_START then GET_SERVICE_SUCCESS, if successful', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 200, response: mockServiceObj }));

      let expectedActions = [
        { type: apiActions.GET_SERVICE_START },
        { type: apiActions.GET_SERVICE_SUCCESS, service: mockService }
      ];

      return store.dispatch(apiActions.getService()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should return GET_SERVICE_START then GET_SERVICE_FAIL', () => {
      moxios.wait(() => moxios.requests.mostRecent().respondWith({ status: 400 }));

      let expectedActions = [
        { type: apiActions.GET_SERVICE_START },
        { type: apiActions.GET_SERVICE_FAIL, error: 'Request failed with status code 400' }
      ];

      return store.dispatch(apiActions.getService()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('organizeRoutes', () => {

    it('should dispatch ORGANIZE_ROUTES_START then ORGANIZE_ROUTES_SUCCESSFUL if successful', () => {
      let expectedActions = [
        { type: apiActions.ORGANIZE_ROUTES_START },
        { type: apiActions.ORGANIZE_ROUTES_SUCCESS, organized: {} }
      ];

      store.dispatch(apiActions.organizeRoutes());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should handle fetching service and routes from state for creating organized', () => {
      let orgStore = mockStore({ routes: mockRoutes, service: mockService, organized: {} });
      let expectedActions = [
        { type: apiActions.ORGANIZE_ROUTES_START },
        { type: apiActions.ORGANIZE_ROUTES_SUCCESS, organized: organizedRoutes }
      ];

      orgStore.dispatch(apiActions.organizeRoutes());
      expect(orgStore.getActions()).toEqual(expectedActions);
    });

    it('should dispatch ORGANIZE_ROUTES_START then ORGANIZE_ROUTES_FAIL if unsuccessful', () => {
      let orgStore = mockStore({ service: mockService, organized: {} }); // missing routes
      let expectedActions = [
        { type: apiActions.ORGANIZE_ROUTES_START },
        { type: apiActions.ORGANIZE_ROUTES_FAIL, error: 'Failed to organize routes' }
      ];

      orgStore.dispatch(apiActions.organizeRoutes());
      expect(orgStore.getActions()).toEqual(expectedActions);
    });
  });

  describe('getRoutesAndService', () => {

    it('should dispatch getRoutes, then getService, then organizeRoutes, then GET_ROUTES_AND_SERVICE_SUCCESS if successful', () => {
      moxios.stubRequest('/api/routes?sub=mta', { status: 200, response: mockRoutes });
      moxios.stubRequest('/api/service?sub=mta', { status: 200, response: mockServiceObj });

      let expectedActions = [
        { type: apiActions.GET_ROUTES_START },
        { type: apiActions.GET_ROUTES_SUCCESS, routes: mockRoutes },
        { type: apiActions.GET_SERVICE_START },
        { type: apiActions.GET_SERVICE_SUCCESS, service: mockService },
        { type: apiActions.ORGANIZE_ROUTES_START },
        // Organizer needs two arrays to reduce down to a data object, this is not an option here
        { type: apiActions.ORGANIZE_ROUTES_SUCCESS, organized: {} },
        { type: apiActions.GET_ROUTES_AND_SERVICE_SUCCESS }
      ];

      return store.dispatch(apiActions.getRoutesAndService()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getStops', () => {
    
    it('should dispatch GET_STOPS_START then GET_STOPS_SUCCESS if successful', () => {
      moxios.stubRequest('/api/stops?sub=mta&route_id=7', { status: 200, response: mockStops });

      let expectedActions = [
        { type: apiActions.GET_STOPS_START },
        { type: apiActions.GET_STOPS_SUCCESS, stops: mockStops }
      ];

      return store.dispatch(apiActions.getStops('7')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should dispatch GET_STOPS_START then GET_STOPS_FAIL with error payload', () => {
      moxios.stubRequest('/api/stops?sub=mta&route_id=7', { status: 400 });

      let expectedActions = [
        { type: apiActions.GET_STOPS_START },
        { type: apiActions.GET_STOPS_FAIL, error: 'Request failed with status code 400' }
      ];

      return store.dispatch(apiActions.getStops('7')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});