import React from 'react';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FriendRequests from '../../../src/component/friends/FriendRequests';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

Enzyme.configure({ adapter: new Adapter() });

describe('FriendRequests', () => {
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJCYW5hbiIsImVtYWlsIjoiYmFuYW5AZXhhbXBsZS5jb20iLCJqdGkiOiI3MWE1YzA3Yy1mNWNhLTQ3MTYtYjk0Ny05ZDlhZWIwNjZmNzciLCJyb2xlcyI6InVzZXIiLCJleHAiOjE1MjQ2NTE5MzIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjM5MzkvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2MzkzOS8ifQ.C_xboFny2nszame4GHJNnlOzlWJ2tVGmflfnmJAyXAE';

  const props = {
    openSnackBar: jest.fn(),
    state: {
      isSignedIn: true,
      token: mockToken
    }
  };

  const component = shallow(
    <FriendRequests {...props}/>
  );

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });


  describe('handleChange', () => {
    it('should set friendUserName to Banan', () => {
      let event = {
        target: {
          value: 'Banan'
        }
      }

      component.instance().handleChange('friendUserName')(event);
      const friendUserNameState = component.state('friendUserName');

      expect(friendUserNameState).toEqual('Banan');
    });

    // TODO: This is not implemented in the source code yet.
    /*it('should set friendRequests to Jan and test1', () => {
      let friendsRequests = ['Jan', 'test1'];

      let event1 = {
        target: {
          value: 'Jan'
        }
      }

      let event2 = {
        target: {
          value: 'test1'
        }
      }

      component.instance().handleChange('friendRequests')(event1);
      component.instance().handleChange('friendRequests')(event2);
      const friendRequestsState = component.state('friendRequests');

      expect(friendRequestsState).toEqual(friendsRequests);
    });*/
  });


  describe('handleSubmit', () => {
    const sendRequestSpy = jest.spyOn(FriendRequests.prototype, 'sendRequest');

    it('should return "Formuläret ej korrekt ifyllt!" when friendUserName is missing', (done) => {
      component.setState({
        friendUserName: ''
      });

      component.instance().handleSubmit();

      expect(props.openSnackBar).toHaveBeenCalledTimes(1);
      expect(sendRequestSpy).toHaveBeenCalledTimes(0);
      done();
    });


    it('should call sendRequest', (done) => {
      component.setState({
        friendUserName: 'Banan'
      });

      component.instance().handleSubmit();

      expect(sendRequestSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });


  describe('sendRequest', () => {
    const apiUrl = 'https://redserver.azurewebsites.net/api/user/addfriend';

    it('should respond with status 200 when user exist', (done) => {
      let mock = new MockAdapter(axios);
      mock.onPost(apiUrl).reply(200);

      component.setState({
        friendUserName: 'test1'
      });

      component.instance().sendRequest().then(response => {
        expect(response.status).toEqual(200);
        done();
      });
    });


    it('should respond with status 404 when user does not exist', (done) => {
      let mock = new MockAdapter(axios);
      mock.onGet(apiUrl).reply(404);

      component.setState({
        friendUserName: 'BananApan'
      });

      component.instance().sendRequest().catch(error => {
        expect(error.message).toEqual('Request failed with status code 404');
        expect(error.response.status).toEqual(404);
        done();
      });
    });
  });


  describe('render', () => {
    it('should navigate to login when user is not signed in', () => {
      const component1 = shallow(
        <FriendRequests state = {{ isSignedIn: false }}/>
      );

      component1.instance().render();

      expect(component1).toMatchObject(/Redirect to="\/login"/);
    });
  });
});
