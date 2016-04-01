import { expect } from 'chai';
import reducer from '../../../client/reducers/task-card'
import * as actions from '../../../client/actions';
import moment from 'moment';

describe( 'task-card reducer', () => {
  const initialState = {
    isSelected: false,
    isSending:  false,
    isFailed:   false,
    errors:     [],
    item:       {}
  };
  
  const getBlankItem = {
    name:        '',
    description: '',
    priority:    1,
    due_date:    moment().startOf( 'day' )
  };
  
  it( 'should return the initial state', () => {
    expect( reducer( undefined, {} ) ).to.be.deep.equal( initialState );
  } );
  
  it( 'should handle SELECT_TASK', () => {
    expect( reducer( initialState, actions.selectTask( {} ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSelected: true,
      item:       {}
    } ) );
  } );
  
  it( 'should handle DELETE_TASK_SUCCESS', () => {
    expect( reducer( initialState, actions.deleteTaskSuccess( 1 ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSelected: false,
      item:       {}
    } ) );
  } );
  
  it( 'should handle CLOSE_TASK', () => {
    expect( reducer( initialState, actions.closeTask() ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSelected: false,
      item:       {}
    } ) );
  } );
  
  it( 'should handle ADD_BLANK_TASK', () => {
    expect( reducer( initialState, actions.addBlankTask() ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSelected: true,
      item:       getBlankItem
    } ) );
  } );
  
  it( 'should handle ADD_CHILD_TASK', () => {
    expect( reducer( initialState, actions.addChildTask( { _id: 1 } ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSelected: true,
      item:       Object.assign( {}, getBlankItem, { parent_id: 1 } )
    } ) );
  } );
  
  it( 'should handle SAVE_TASK_REQUEST', () => {
    expect( reducer( initialState, actions.saveTaskRequest() ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSelected: true,
      isSending:  true,
      errors:     []
    } ) );
  } );
  
  it( 'should handle ADD_TASK_REQUEST', () => {
    expect( reducer( initialState, actions.addTaskRequest() ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSelected: true,
      isSending:  true,
      errors:     []
    } ) );
  } );
  
  it( 'should handle SAVE_TASK_FAILURE', () => {
    expect( reducer( initialState, actions.saveTaskFailure( {} ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSending: false,
      isFailed:  true,
      errors:    {}
    } ) );
  } );
  
  it( 'should handle ADD_TASK_FAILURE', () => {
    expect( reducer( initialState, actions.addTaskFailure( {} ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSending: false,
      isFailed:  true,
      errors:    {}
    } ) );
  } );
  
  it( 'should handle SAVE_TASK_SUCCESS', () => {
    expect( reducer( initialState, actions.saveTaskSuccess( {} ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSending: false,
      isFailed:  false,
      errors:    [],
      item:      {}
    } ) );
  } );
  
  it( 'should handle SAVE_TASK_SUCCESS and change item', () => {
    expect( reducer( initialState, actions.saveTaskSuccess( { name: 'Test' }, false ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSending: false,
      isFailed:  false,
      errors:    [],
      item:      { name: 'Test' }
    } ) );
  } );
  
  it( 'should handle ADD_TASK_SUCCESS', () => {
    expect( reducer( initialState, actions.addTaskSuccess( {} ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isSending: false,
      isFailed:  false,
      errors:    [],
      item:      {}
    } ) );
  } );
  
  //
} );