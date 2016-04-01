import { expect } from 'chai';
import reducer from '../../../client/reducers/tasks'
import * as actions from '../../../client/actions';

describe( 'tasks reducer', () => {
  const initialState = {
    isFetching: false,
    isFailed:   false,
    sort:       { field: 'name', val: 1 },
    filter:     { type: 'name', val: '' },
    items:      [],
    tree:       []
  };
  
  it( 'should return the initial state', () => {
    expect( reducer( undefined, {} ) ).to.be.deep.equal( initialState );
  } );
  
  it( 'should handle FETCH_TASKS_REQUEST', () => {
    expect( reducer( initialState, actions.fetchTasksRequest() ) ).to.be.deep.equal( Object.assign( {}, initialState, { isFetching: true } ) );
  } );
  
  it( 'should handle FETCH_TASKS_FAILURE', () => {
    expect( reducer( initialState, actions.fetchTasksFailure( {} ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isFetching: false,
      isFailed:   true
    } ) );
  } );
  
  it( 'should handle FETCH_TASKS_SUCCESS', () => {
    const tasks = { tasks: [ { _id: 1, name: "test", parent_id: -1 } ] };
    const tree = [ { _id: 1, name: "test", parent_id: -1, children: [] } ];
    
    expect( reducer( initialState, actions.fetchTasksSuccess( tasks ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isFetching: false,
      isFailed:   false,
      items:      tasks.tasks,
      tree:       tree
    } ) );
  } );
  
  it( 'should handle ADD_TASK_SUCCESS', () => {
    const task = { _id: 1, name: "test", parent_id: -1 };
    const tree = [ { _id: 1, name: "test", parent_id: -1, children: [] } ];
    
    expect( reducer( initialState, actions.addTaskSuccess( Object.assign( {}, task ) ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isFetching: false,
      isFailed:   false,
      items:      [ task ],
      tree:       tree
    } ) );
  } );
  
  it( 'should handle ADD_TASK_SUCCESS and build tree', () => {
    const task = { _id: 1, name: "test", parent_id: -1 };
    const childTask = { _id: 2, name: "test", parent_id: 1 };
    const tree = [ { _id: 1, name: "test", parent_id: -1, children: [ { _id: 2, name: "test", parent_id: 1, children: [] } ] } ];
    
    expect( reducer( Object.assign( {}, initialState, { items: [ task ] } ), actions.addTaskSuccess( childTask ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isFetching: false,
      isFailed:   false,
      items:      [ { _id: 1, name: "test", parent_id: -1 }, { _id: 2, name: "test", parent_id: 1 } ],
      tree:       tree
    } ) );
  } );
  
  it( 'should handle SAVE_TASK_SUCCESS', () => {
    const task = { _id: 1, name: "test", parent_id: -1 };
    const newTask = { _id: 1, name: "new test", parent_id: -1 };
    const tree = [ { _id: 1, name: "new test", parent_id: -1, children: [] } ];
    
    expect( reducer( Object.assign( {}, initialState, { items: [ task ] } ), actions.saveTaskSuccess( newTask ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isFetching: false,
      isFailed:   false,
      items:      [ { _id: 1, name: "new test", parent_id: -1 } ],
      tree:       tree
    } ) );
  } );
  
  it( 'should handle DELETE_TASK_SUCCESS', () => {
    const task1 = { _id: 1, name: "test", parent_id: -1 };
    const task2 = { _id: 2, name: "new test", parent_id: -1 };
    const tree = [ { _id: 2, name: "new test", parent_id: -1, children: [] } ];
    
    expect( reducer( Object.assign( {}, initialState, { items: [ task1, task2 ] } ), actions.deleteTaskSuccess( 1 ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      isFetching: false,
      isFailed:   false,
      items:      [ task2 ],
      tree:       tree
    } ) );
  } );
  
  it( 'should handle SORT_TASKS', () => {
    const sort = { field: 'name', val: 1 };
    
    expect( reducer( initialState, actions.sortTasks( 'name', 1 ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      sort: sort
    } ) );
  } );
  
  it( 'should handle SORT_TASKS', () => {
    const filter = { type: 'name', val: 'Test' };
    
    expect( reducer( initialState, actions.filterTasks( 'name', 'Test' ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      filter: filter
    } ) );
  } );
  
} );