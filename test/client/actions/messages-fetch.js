/*eslint spaced-comment: 0, max-len: 0*/

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../client/actions/messages-fetch';
import * as types from '../../../client/constants';
import nock from 'nock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Messages Fetch', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  
  it('creates FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS when fetch request has been done', (done) => {
    nock('http://localhost:3000/')
      .get('/messages?token=token_here')
      .reply(200, { status: 'success', messages: [] });
    
    const expectedActions = [
      { type: types.FETCH_MESSAGES_REQUEST },
      { type: types.FETCH_MESSAGES_SUCCESS, messages: [] },
    ];
    
    const store = mockStore({ auth: { access_token: 'token_here', isAuthorized: true, host: 'http://localhost:3000' } });
    
    store.dispatch(actions.fetchMessages())
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
  
  it('creates FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, FETCH_TASKS_REQUEST when fetch request has been done and return at least one message', (done) => {
    nock('http://localhost:3000/')
      .get('/messages?token=token_here')
      .reply(200, { status: 'success', messages: [{ message: 'Test Message' }] });
    
    const expectedActions = [
      { type: types.FETCH_MESSAGES_REQUEST },
      { type: types.FETCH_MESSAGES_SUCCESS, messages: [{ message: 'Test Message' }] },
      { type: types.FETCH_TASKS_REQUEST },
    ];
    
    const store = mockStore({ auth: { access_token: 'token_here', isAuthorized: true, host: 'http://localhost:3000' } });
    
    store.dispatch(actions.fetchMessages())
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
});
