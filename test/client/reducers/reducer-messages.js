import { expect } from 'chai';
import reducer from '../../../client/reducers/messages';
import * as actions from '../../../client/actions';

describe( 'messages reducer', () => {
  const initialState = {
    items: []
  };
  
  it( 'should return the initial state', () => {
    expect( reducer( undefined, {} ) ).to.be.deep.equal( initialState );
  } );
  
  it( 'should handle FETCH_MESSAGES_SUCCESS', () => {
    expect( reducer( initialState, actions.fetchMessagesSuccess( { messages: [ { message: "Message" } ] } ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      items: [ { message: "Message" } ]
    } ) );
  } );
  
  it( 'should handle ADD_USER_SUCCESS', () => {
    expect( reducer( initialState, actions.addUserSuccess() ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      items: [ { message: "New Account added! Login Now!", _id: -1, type: 'success' } ]
    } ) );
  } );
  
  it( 'should handle MESSAGES_DISPLAYED', () => {
    expect( reducer( initialState, actions.messagesDisplayed( 1 ) ) ).to.be.deep.equal( Object.assign( {}, initialState, {
      items: []
    } ) );
  } );
  
} );