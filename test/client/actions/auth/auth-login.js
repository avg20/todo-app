/*eslint spaced-comment: 0, max-len: 0*/

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../client/actions/auth/auth-login';
import * as types from '../../../../client/constants';
import nock from 'nock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Login', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  
  it('creates LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, FETCH_TASKS_REQUEST when login request has been done', (done) => {
    nock('http://localhost:3000/')
      .post('/users/login')
      .reply(200, { status: 'success', access_token: 'fdgsdfg3234' });
    
    const expectedActions = [
      { type: types.LOGIN_USER_REQUEST },
      { type: types.LOGIN_USER_SUCCESS, token: 'fdgsdfg3234', username: 'avg206' },
      { type: types.FETCH_TASKS_REQUEST },
    ];
    
    const store = mockStore({ auth: { access_token: 'token_here' } });
    
    store.dispatch(actions.authLoginUser({ username: 'avg206', password: '1111' }))
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
  
  it('creates LOGIN_USER_REQUEST, LOGIN_USER_FAILURE when login request has been failed', (done) => {
    nock('http://localhost:3000/')
      .post('/users/login')
      .reply(200, { status: 'error', errors: { password: 'fdgsdfg3234' } });
    
    const expectedActions = [
      { type: types.LOGIN_USER_REQUEST },
      { type: types.LOGIN_USER_FAILURE, errors: { password: 'fdgsdfg3234' } },
    ];
    
    const store = mockStore({ todos: [] });
    
    store.dispatch(actions.authLoginUser({ username: 'avg206' }))
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
});
