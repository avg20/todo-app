import { expect } from 'chai';
import * as actions from '../../../../client/actions/task/task-actions';
import * as types from '../../../../client/constants';

describe('Actions', () => {
  it('should create an action to filter tasks', () => {
    const filterType = 'name';
    const val = 'Test';
    
    const expectedAction = {
      type: types.FILTER_TASKS,
      filterType,
      val,
    };
    
    expect(actions.filterTasks(filterType, val)).to.be.deep.equal(expectedAction);
  });
  
  it('should create an action to sort tasks', () => {
    const field = 'name';
    const val = 1;
    
    const expectedAction = {
      type: types.SORT_TASKS,
      field,
      val,
    };
    
    expect(actions.sortTasks(field, val)).to.be.deep.equal(expectedAction);
  });
});
