import { expect } from 'chai';
import * as actions from '../../../../client/actions/auth/auth-actions';
import * as types from '../../../../client/constants';

describe( 'Actions', () => {
  it( 'should create an action to setup creditions', () => {
    const token = 'sdf76s7d6af8698a7s6df86as8df87asd6987gas6';
    const username = 'avg206';
    
    const expectedAction = {
      type: types.SETUP_CREDITIONS,
            token,
            username
    };
    
    expect( actions.setupCreditions( token, username ) ).to.be.deep.equal( expectedAction );
  } );
  
  it( 'should create an action to auth page toggle', () => {
    const expectedAction = {
      type: types.AUTH_PAGE_TOGGLE
    };
    
    expect( actions.authPageToggle() ).to.be.deep.equal( expectedAction );
  } );
  
  it( 'should create an action to logout', () => {
    const expectedAction = {
      type: types.USER_LOGOUT
    };
    
    expect( actions.userLogout() ).to.be.deep.equal( expectedAction );
  } );
} );