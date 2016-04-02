/*eslint spaced-comment: 0, max-len: 0*/

import { expect } from 'chai';
import reducer from '../../../client/reducers/auth';
import * as actions from '../../../client/actions';

describe('auth reducer', () => {
  const initialState = {
    isAuthorized: false,
    isSending: false,
    page: 'login',
    errors: {},
    username: '',
    access_token: '',
  };
  
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.be.deep.equal(initialState);
  });
  
  it('should handle LOGIN_USER_REQUEST', () => {
    expect(reducer(initialState, actions.loginUserRequest())).to.be.deep.equal(Object.assign({}, initialState, {
      isSending: true,
    }));
  });
  
  it('should handle ADD_USER_REQUEST', () => {
    expect(reducer(initialState, actions.addUserRequest())).to.be.deep.equal(Object.assign({}, initialState, {
      isSending: true,
    }));
  });
  
  it('should handle LOGIN_USER_FAILURE', () => {
    expect(reducer(initialState, actions.loginUserFailure({ error: 'error' }))).to.be.deep.equal(Object.assign({}, initialState, {
      isSending: false,
      errors: { error: 'error' },
    }));
  });
  
  it('should handle ADD_USER_FAILURE', () => {
    expect(reducer(initialState, actions.addUserFailure({ error: 'error' }))).to.be.deep.equal(Object.assign({}, initialState, {
      isSending: false,
      errors: { error: 'error' },
    }));
  });
  
  it('should handle ADD_USER_SUCCESS', () => {
    expect(reducer(initialState, actions.addUserSuccess())).to.be.deep.equal(Object.assign({}, initialState, {
      isSending: false,
      page: 'login',
    }));
  });
  
  it('should handle SETUP_CREDITIONS', () => {
    expect(reducer(initialState, actions.setupCreditions('token', 'username'))).to.be.deep.equal(Object.assign({}, initialState, {
      isAuthorized: true,
      access_token: 'token',
      username: 'username',
    }));
  });
  
  it('should handle LOGIN_USER_SUCCESS', () => {
    expect(reducer(initialState, actions.loginUserSuccess('token', 'username'))).to.be.deep.equal(Object.assign({}, initialState, {
      isAuthorized: true,
      access_token: 'token',
      username: 'username',
    }));
  });
  
  it('should handle USER_LOGOUT', () => {
    expect(reducer(initialState, actions.userLogout())).to.be.deep.equal(Object.assign({}, initialState, {
      isAuthorized: false,
      access_token: '',
      username: '',
      page: 'login',
    }));
  });
  
  it('should handle AUTH_PAGE_TOGGLE from login to signup', () => {
    expect(reducer(initialState, actions.authPageToggle())).to.be.deep.equal(Object.assign({}, initialState, {
      page: 'signup',
    }));
  });
  
  it('should handle AUTH_PAGE_TOGGLE from signup to login', () => {
    const state = Object.assign({}, initialState, { page: 'signup' });
    
    expect(reducer(state, actions.authPageToggle())).to.be.deep.equal(Object.assign({}, initialState, {
      page: 'login',
    }));
  });
});
