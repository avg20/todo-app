/*eslint spaced-comment: 0, max-len: 0*/

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../client/actions/tasks-fetch';
import * as types from '../../../client/constants';
import nock from 'nock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Tasks Fetch', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  
  it('creates FETCH_TASKS_REQUEST, FETCH_TASKS_SUCCESS when fetch request has been done', (done) => {
    nock('http://localhost:3000/')
      .get('/tasks?token=token_here')
      .reply(200, { status: 'success', tasks: [] });
    
    const expectedActions = [
      { type: types.FETCH_TASKS_REQUEST },
      { type: types.FETCH_TASKS_SUCCESS, tasks: [] },
    ];
    
    const store = mockStore({ auth: { access_token: 'token_here' } });
    
    store.dispatch(actions.fetchTasks())
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
});
