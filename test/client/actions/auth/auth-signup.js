require('es6-promise').polyfill();
require('isomorphic-fetch');

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../client/actions/auth/auth-signup';
import * as types from '../../../../client/constants';
import nock from 'nock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Singup', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  
  it('creates ADD_USER_REQUEST, ADD_USER_SUCCESS when singup request has been done', (done) => {
    nock('http://localhost:3000/')
      .post('/users')
      .reply(200, { status: 'success' });
    
    const expectedActions = [
      { type: types.ADD_USER_REQUEST },
      { type: types.ADD_USER_SUCCESS },
    ];
    
    const store = mockStore({ auth: { host: 'http://localhost:3000' } });
    
    store.dispatch(actions.authAddUser({ username: 'avg206', password: '1111' }))
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
  
  it('creates ADD_USER_REQUEST, ADD_USER_SUCCESS when singup request has been failed', (done) => {
    nock('http://localhost:3000/')
      .post('/users')
      .reply(200, { status: 'error', errors: { password: 'fdgsdfg3234' } });
    
    const expectedActions = [
      { type: types.ADD_USER_REQUEST },
      { type: types.ADD_USER_FAILURE, errors: { password: 'fdgsdfg3234' } },
    ];
    
    const store = mockStore({ auth: { host: 'http://localhost:3000' } });
    
    store.dispatch(actions.authAddUser({ username: 'avg206', password: '1111' }))
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
});
