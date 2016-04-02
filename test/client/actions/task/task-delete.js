/*eslint spaced-comment: 0, max-len: 0*/

require('es6-promise').polyfill();
require('isomorphic-fetch');

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../client/actions/task/task-delete';
import * as types from '../../../../client/constants';
import nock from 'nock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Delete', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  
  it('creates DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS when add task request has been done', (done) => {
    nock('http://localhost:3000/')
      .delete('/tasks/1?token=token_here')
      .reply(200, { status: 'success' });
    
    const expectedActions = [
      { type: types.DELETE_TASK_REQUEST },
      { type: types.DELETE_TASK_SUCCESS, id: 1 },
    ];
    
    const store = mockStore({ auth: { access_token: 'token_here' } });
    
    store.dispatch(actions.deleteTask(1))
         .then(() => {
           expect(store.getActions()).to.be.deep.equal(expectedActions);
         })
         .then(done)
         .catch(done);
  });
});
