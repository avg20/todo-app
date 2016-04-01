/*
 export const selectTask = ( item ) => {
 return {
 type: SELECT_TASK,
 item: item
 }
 };
 
 export const closeTask = () => {
 return {
 type: CLOSE_TASK
 }
 };
 
 export const addBlankTask = () => {
 return {
 type: ADD_BLANK_TASK
 };
 };
 
 export const addChildTask = ( parent ) => {
 return {
 type:   ADD_CHILD_TASK,
 parent: parent
 }
 };*/

import { expect } from 'chai';
import * as actions from '../../../../client/actions/task/task-active';
import * as types from '../../../../client/constants';

describe( 'Active', () => {
  it( 'should create an action to select task', () => {
    const item = {};
    
    const expectedAction = {
      type: types.SELECT_TASK,
            item
    };
    
    expect( actions.selectTask( item ) ).to.be.deep.equal( expectedAction );
  } );
  
  it( 'should create an action to close task', () => {
    const expectedAction = {
      type: types.CLOSE_TASK
    };
    
    expect( actions.closeTask() ).to.be.deep.equal( expectedAction );
  } );
  
  it( 'should create an action to add blank task', () => {
    const expectedAction = {
      type: types.ADD_BLANK_TASK
    };
    
    expect( actions.addBlankTask() ).to.be.deep.equal( expectedAction );
  } );
  
  it( 'should create an action to add blank task', () => {
    const parent = {};
    
    const expectedAction = {
      type: types.ADD_CHILD_TASK,
            parent
    };
    
    expect( actions.addChildTask( parent ) ).to.be.deep.equal( expectedAction );
  } );
} );