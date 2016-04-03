import expect from 'expect';
import React from 'react';
import moment from 'moment';
import TestUtils from 'react-addons-test-utils';
import ViewTask from '../../../client/components/ViewTask';

const event = {
  stopPropagation: () => {},
};

const setup = (currentProps) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(<ViewTask {...currentProps} />);
  const output = renderer.getRenderOutput();

  return {
    props: currentProps,
    output,
    renderer,
  };
};

describe('ViewTask', () => {
  before(() => {
    console.error = (err) => {  // eslint-disable-line
      throw err;
    };
  });
  
  it('should render correctly', () => {
    const currentProps = {
      activeItem: {},
      _id: '123',
      children: [],
      status: 1,
      priority: 1,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),

      onClick: expect.createSpy(),
      onAddClick: expect.createSpy(),
      onStatusClick: expect.createSpy(),
    };

    const { props, output } = setup(currentProps);
    const box = output.props.children[0];
    const checkbox = box.props.children[0];
    const addButton = box.props.children[1];
    const taskName = box.props.children[2];
    const dueDate = box.props.children[3];
    const priorityBox = box.props.children[4];

    expect(output.props.className).toBe('task-class');
    expect(box.props.className).toBe('ui segment task');

    box.props.onClick(event);
    expect(props.onClick.calls.length).toBe(1);

    expect(checkbox.props.children.props.className).toBe('circular mini ui icon basic button');
    checkbox.props.children.props.onClick(event);
    expect(props.onStatusClick.calls.length).toBe(1);

    addButton.props.onClick(event);
    expect(props.onAddClick.calls.length).toBe(1);

    expect(taskName.props.children[0].props.children).toBe('Test Task');

    expect(dueDate.props.children.props.className).toBe(' ui label');

    expect(priorityBox.props.className).toBe('task__priority task__priority--low');
  });

  it('should render correctly with status = 2', () => {
    const currentProps = {
      activeItem: {},
      _id: '123',
      children: [],
      status: 2,
      priority: 1,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),

      onClick: expect.createSpy(),
      onAddClick: expect.createSpy(),
      onStatusClick: expect.createSpy(),
    };

    const { output } = setup(currentProps);
    const box = output.props.children[0];
    const checkbox = box.props.children[0];

    expect(box.props.className).toBe('ui segment task task--completed');
    expect(checkbox.props.children.props.className)
      .toBe('circular mini ui icon green basic button');
  });

  it('should render correctly with priority = 2', () => {
    const currentProps = {
      activeItem: {},
      _id: '123',
      children: [],
      status: 1,
      priority: 2,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),

      onClick: expect.createSpy(),
      onAddClick: expect.createSpy(),
      onStatusClick: expect.createSpy(),
    };

    const { output } = setup(currentProps);
    const box = output.props.children[0];
    const priorityBox = box.props.children[4];

    expect(priorityBox.props.className).toBe('task__priority task__priority--medium');
  });
  
  it('should render correctly with priority = 3', () => {
    const currentProps = {
      activeItem: {},
      _id: '123',
      children: [],
      status: 1,
      priority: 3,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),

      onClick: expect.createSpy(),
      onAddClick: expect.createSpy(),
      onStatusClick: expect.createSpy(),
    };

    const { output } = setup(currentProps);
    const box = output.props.children[0];
    const priorityBox = box.props.children[4];

    expect(priorityBox.props.className).toBe('task__priority task__priority--high');
  });

  it('should render correctly as active item', () => {
    const currentProps = {
      activeItem: { _id: '123' },
      _id: '123',
      children: [],
      status: 1,
      priority: 3,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),

      onClick: expect.createSpy(),
      onAddClick: expect.createSpy(),
      onStatusClick: expect.createSpy(),
    };

    const { output } = setup(currentProps);
    const box = output.props.children[0];

    expect(box.props.className).toBe('ui segment task task--selected');
  });

  it('should render correctly as parent item', () => {
    const currentProps = {
      activeItem: { parent_id: '123' },
      _id: '123',
      children: [],
      status: 1,
      priority: 3,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),

      onClick: expect.createSpy(),
      onAddClick: expect.createSpy(),
      onStatusClick: expect.createSpy(),
    };

    const { output } = setup(currentProps);
    const box = output.props.children[0];
    const taskName = box.props.children[2];

    expect(taskName.props.children[1].props.className)
      .toBe('task__parent-indicator angle double down icon');
  });
  
  it('should render correctly with children', () => {
    const currentProps = {
      activeItem: {},
      _id: '123',
      children: [],
      status: 1,
      priority: 3,
      className: 'task-class',
      overdue: false,
      name: 'Test Task',
      due_date: moment(),

      onClick: expect.createSpy(),
      onAddClick: expect.createSpy(),
      onStatusClick: expect.createSpy(),
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
    
    currentProps.children.push(child);
    currentProps.children.push(child);
    
    const { output } = setup(currentProps);
    
    expect(output.props.children.length).toBe(2);
    expect(output.props.children[1]).toNotBe(undefined);
    expect(output.props.children[1].length).toBe(2);
  });
});
