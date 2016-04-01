require( 'es6-promise' ).polyfill();
require( 'isomorphic-fetch' );

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../client/actions/tasks';
import * as types from '../../../client/constants';
import nock from 'nock';

const middleware = [ thunk ];
const mockStore = configureMockStore( middleware );

describe( 'Tasks', () => {
  afterEach( () => {
    nock.cleanAll()
  } );
  
  it( 'creates SAVE_TASK_REQUEST after task status toggle', ( done ) => {
    const expectedActions = [
      { type: types.SAVE_TASK_REQUEST }
    ];
    
    const store = mockStore( {
      tasks: { items: [ { _id: 1, status: 1 }, { _id: 2, status: 1 } ] },
      auth:  { access_token: "token_here" }
    } );
    
    store.dispatch( actions.taskStatusToggle( 1 ) );
    
    expect( store.getActions() ).to.be.deep.equal( expectedActions );
    
    done();
  } );
} );