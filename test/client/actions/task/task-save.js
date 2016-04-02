require( 'es6-promise' ).polyfill();
require( 'isomorphic-fetch' );

import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../client/actions/task/task-save';
import * as types from '../../../../client/constants';
import nock from 'nock';

const middleware = [ thunk ];
const mockStore = configureMockStore( middleware );

describe( 'Save', () => {
  afterEach( () => {
    nock.cleanAll();
  } );
  
  it( 'creates SAVE_TASK_REQUEST, SAVE_TASK_SUCCESS and toggle = false when save task request has been done', ( done ) => {
    nock( 'http://localhost:3000/' )
      .post( '/tasks/1?token=token_here' )
      .reply( 200, { status: 'success', task: { _id: 1, name: "Test" } } );
    
    const expectedActions = [
      { type: types.SAVE_TASK_REQUEST },
      { type: types.SAVE_TASK_SUCCESS, task: { _id: 1, name: "Test" }, toggled: false }
    ];
    
    const store = mockStore( { auth: { access_token: "token_here" } } );
    
    store.dispatch( actions.saveTask( { _id: 1, name: "Test" } ) )
         .then( () => {
           expect( store.getActions() ).to.be.deep.equal( expectedActions );
         } )
         .then( done )
         .catch( done );
  } );
  
  it( 'creates SAVE_TASK_REQUEST, SAVE_TASK_SUCCESS and toggle = true when save task request has been done', ( done ) => {
    nock( 'http://localhost:3000/' )
      .post( '/tasks/1?token=token_here' )
      .reply( 200, { status: 'success', task: { _id: 1, name: "Test" } } );
    
    const expectedActions = [
      { type: types.SAVE_TASK_REQUEST },
      { type: types.SAVE_TASK_SUCCESS, task: { _id: 1, name: "Test" }, toggled: true }
    ];
    
    const store = mockStore( { auth: { access_token: "token_here" } } );
    
    store.dispatch( actions.saveTask( { _id: 1, name: "Test" }, true ) )
         .then( () => {
           expect( store.getActions() ).to.be.deep.equal( expectedActions );
         } )
         .then( done )
         .catch( done );
  } );
} );