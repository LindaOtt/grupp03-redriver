import React from 'react';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FriendsList from '../../../src/component/friends/FriendsList';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

Enzyme.configure({ adapter: new Adapter() });

test('FriendsList renders without crashing', () => {
  const component = shallow(
    <MemoryRouter>
      <FriendsList state = {{ isSignedIn: true }}/>
    </MemoryRouter>
  );

  expect(component).toMatchSnapshot();
});


test('FriendsList renderFriendsList should return array with friends', () => {
  const component = shallow(
    <FriendsList state = {{ isSignedIn: true }}/>
  );

  component.setState({
    friends: ['Banan', 'test1', 'Kattis']
  });

  let friendsArray = component.instance().renderFriendsList();

  expect(friendsArray).toHaveLength(3);
});


test('FriendsList sendRequest should respond with status 200', (done) => {
  let mock = new MockAdapter(axios);
  mock.onGet('https://redserver.azurewebsites.net/api/user/getfriends').reply(200);

  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYW5hbiIsImVtYWlsIjoiYmFuYW5AZXhhbXBsZS5jb20iLCJqdGkiOiI3MWE1YzA3Yy1mNWNhLTQ3MTYtYjk0Ny05ZDlhZWIwNjZmNzciLCJyb2xlcyI6InVzZXIiLCJleHAiOjE1MjQ2NTE5MzIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjM5MzkvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2MzkzOS8ifQ.C_xboFny2nszame4GHJNnlOzlWJ2tVGmflfnmJAyXAE';

  const component = shallow(
    <FriendsList state = {{ isSignedIn: true, token: mockToken }}/>
  );

  // Call sendRequest
  component.instance().sendRequest().then(response => {
    expect(response.status).toEqual(200);
    done();
  });
});


test('FriendsList sendRequest should respond with status 401', (done) => {
  let mock = new MockAdapter(axios);
  mock.onGet('https://redserver.azurewebsites.net/api/user/getfriends').reply(401);

  const mockToken = '';

  const component = shallow(
    <FriendsList state = {{ isSignedIn: true, token: mockToken }}/>
  );

  // Call sendRequest
  component.instance().sendRequest().catch(error => {
    expect(error.message).toEqual('Request failed with status code 401');
    expect(error.response.status).toEqual(401);
    done();
  });
});


test('FriendsList componentDidMount should call sendRequest', (done) => {
  const baseProps = {
    state: {
      isSignedIn: true
    }
  };

  const sendRequestSpy = jest.spyOn(FriendsList.prototype, 'sendRequest');

  const component = shallow(
    <FriendsList {...baseProps}/>
  );

  expect(sendRequestSpy).toHaveBeenCalledTimes(1);
  done();
});


/*test('FriendsList componentDidMount should push friends to state', (done) => {
  const mockToken = '';

  const baseProps = {
    state: {
      isSignedIn: true,
      token: mockToken
    }
  };

  const sendRequestSpy = jest.spyOn(FriendsList.prototype, 'sendRequest');

  const component = shallow(
    <FriendsList {...baseProps}/>
  );

  expect(sendRequestSpy).toHaveBeenCalledTimes(1);
  done();
});*/


test('FriendsList should navigate to login when user is not signed in', () => {
  const component = shallow(
    <FriendsList state = {{ isSignedIn: false }}/>
  );

  component.instance().render();

  expect(component).toMatchObject(/Redirect to="\/login"/);
});
