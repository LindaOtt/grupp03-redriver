import React from 'react';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FriendsList from '../../../src/component/friends/FriendsList';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

Enzyme.configure({ adapter: new Adapter() });

describe('FriendsList', () => {
  const props = {
    state: {
      isSignedIn: true
    }
  };

  it('should render without crashing', () => {
    const component = shallow(
      <MemoryRouter>
        <FriendsList {...props}/>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });


  describe('renderFriendsList', () => {
    it('should return array with friends', () => {
      const component = shallow(
        <FriendsList {...props}/>
      );

      component.setState({
        friends: ['Banan', 'test1', 'Kattis']
      });

      let friendsArray = component.instance().renderFriendsList();

      expect(friendsArray).toHaveLength(3);
    });
  });


  describe('sendRequest', () => {
    const mock = new MockAdapter(axios);
    const apiUrl = 'https://redserver.azurewebsites.net/api/user/getfriends';

    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYW5hbiIsImVtYWlsIjoiYmFuYW5AZXhhbXBsZS5jb20iLCJqdGkiOiI3MWE1YzA3Yy1mNWNhLTQ3MTYtYjk0Ny05ZDlhZWIwNjZmNzciLCJyb2xlcyI6InVzZXIiLCJleHAiOjE1MjQ2NTE5MzIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjM5MzkvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2MzkzOS8ifQ.C_xboFny2nszame4GHJNnlOzlWJ2tVGmflfnmJAyXAE';

    const baseProps = {
      state: {
        isSignedIn: true,
        token: mockToken
      }
    };

    it('should respond with status 200', (done) => {
      mock.onGet(apiUrl).reply(200);

      const component = shallow(
        <FriendsList {...baseProps}/>
      );

      component.instance().sendRequest().then(response => {
        expect(response.status).toEqual(200);
        done();
      });
    });


    it('should respond with status 401', (done) => {
      mock.onGet(apiUrl).reply(401);

      const component = shallow(
        <FriendsList {...baseProps}/>
      );

      component.instance().sendRequest().catch(error => {
        expect(error.message).toEqual('Request failed with status code 401');
        expect(error.response.status).toEqual(401);
        done();
      });
    });


    it('should get friends from the database', (done) => {
      let mockData = {
        friendsList: ['Banan', 'Kattis', 'test1']
      }

      mock.onGet(apiUrl).reply(200, mockData);

      const component = shallow(
        <FriendsList {...baseProps}/>
      );

      // Call sendRequest
      component.instance().sendRequest().then(response => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(mockData);
        done();
      });
    });
  });


  describe('componentDidMount', () => {
    it('should call sendRequest', (done) => {
      const sendRequestSpy = jest.spyOn(FriendsList.prototype, 'sendRequest');

      const component = shallow(
        <FriendsList {...props}/>
      );

      expect(sendRequestSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });


  describe('render', () => {
    it('should navigate to login when user is not signed in', () => {
      const component = shallow(
        <FriendsList state = {{ isSignedIn: false }}/>
      );

      component.instance().render();

      expect(component).toMatchObject(/Redirect to="\/login"/);
    });
  });
});
