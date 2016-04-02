require( 'es6-promise' ).polyfill();
require( 'isomorphic-fetch' );

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../client/actions/task/task-add';
import * as types from '../../../../client/constants';
import nock from 'nock';

const middleware = [ thunk ];
const mockStore = configureMockStore( middleware );

describe( 'Add', () => {
  afterEach( () => {
    nock.cleanAll();
  } );
  
  it( 'creates ADD_TASK_REQUEST, ADD_TASK_SUCCESS when add task request has been done', ( done ) => {
    nock( 'http://localhost:3000/' )
      .post( '/tasks?token=token_here' )
      .reply( 200, { status: 'success', task: { _id: 1, name: "Test" } } );
    
    const expectedActions = [
      { type: types.ADD_TASK_REQUEST },
      { type: types.ADD_TASK_SUCCESS, task: { _id: 1, name: "Test" } }
    ];
    
    const store = mockStore( { auth: { access_token: "token_here" } } );
    
    store.dispatch( actions.addTask( { _id: 1, name: "Test" } ) )
         .then( () => {
           expect( store.getActions() ).to.be.deep.equal( expectedActions );
         } )
         .then( done )
         .catch( done );
  } );
} );