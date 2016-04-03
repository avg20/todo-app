import expect from 'expect';
import React from 'react';
import moment from 'moment';
import TestUtils from 'react-addons-test-utils';
import ViewTasksList from '../../../client/components/ViewTasksList';

const event = {
  stopPropagation: () => {},
};

const setup = (currentProps) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(<ViewTasksList {...currentProps} />);
  const output = renderer.getRenderOutput();

  return {
    props: currentProps,
    output,
    renderer,
  };
};

describe('ViewTasksList', () => {
  before(() => {
    console.error = (err) => {  // eslint-disable-line
      throw err;
    };
  });
  
  it('should render correctly without tasks', () => {
    const currentProps = {
      isFetching: false,
      isFailed: false,
      activeItem: {},
      tasks: [],

      onTasksReload: expect.createSpy(),
      onTaskClick: expect.createSpy(),
      onAddTaskClick: expect.createSpy(),
      onTaskStatusToggle: expect.createSpy(),
    };

    const { output } = setup(currentProps);

    expect(output.props.children.props.children).toBe('No Tasks found');
  });
  
  it('should render correctly with isFailed = true', () => {
    const currentProps = {
      isFetching: false,
      isFailed: true,
      activeItem: {},
      tasks: [],

      onTasksReload: expect.createSpy(),
      onTaskClick: expect.createSpy(),
      onAddTaskClick: expect.createSpy(),
      onTaskStatusToggle: expect.createSpy(),
    };

    const { props, output } = setup(currentProps);

    expect(output.props.children.props.children).toBe('Try to reload...');
    
    output.props.children.props.onClick(event);
    expect(props.onTasksReload.calls.length).toBe(1);
  });
  
  it('should render correctly with tasks', () => {
    const currentProps = {
      isFetching: false,
      isFailed: false,
      activeItem: {},
      tasks: [],

      onTasksReload: expect.createSpy(),
      onTaskClick: expect.createSpy(),
      onAddTaskClick: expect.createSpy(),
      onTaskStatusToggle: expect.createSpy(),
    };
    
    const child = {
      activeItem: {},
      _id: '123',
      children: [],
      status: 1,
      priority: 3,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),
    };
    
    currentProps.tasks.push(child);
    currentProps.tasks.push(child);

    const { output } = setup(currentProps);

    expect(output.props.className).toBe('ui tasks');
    expect(output.props.children.length).toBe(2);
  });
  
  it('should render correctly with isFetching = true', () => {
    const currentProps = {
      isFetching: true,
      isFailed: false,
      activeItem: {},
      tasks: [],

      onTasksReload: expect.createSpy(),
      onTaskClick: expect.createSpy(),
      onAddTaskClick: expect.createSpy(),
      onTaskStatusToggle: expect.createSpy(),
    };
    
    const child = {
      activeItem: {},
      _id: '123',
      children: [],
      status: 1,
      priority: 3,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),
    };
    
    currentProps.tasks.push(child);

    const { output } = setup(currentProps);

    expect(output.props.className).toBe('ui tasks');
    expect(output.props.children.length).toBe(2);
    
    expect(output.props.children[1].props.children[1].props.className)
      .toBe('ui active inverted dimmer');
    expect(output.props.children[1].props.children[1].props.children.props.className)
      .toBe('ui loader');
  });
});
