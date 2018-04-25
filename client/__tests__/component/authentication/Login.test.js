import React from 'react';
import { MemoryRouter } from 'react-router';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../../../src/component/authentication/Login';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

Enzyme.configure({ adapter: new Adapter() });

test('Login renders without crashing', () => {
  const component = shallow(
    <MemoryRouter>
      <Login state = {{ isSignedIn: false }} />
    </MemoryRouter>
  );

  expect(component).toMatchSnapshot();
});

test('Login should navigate to user page when user is signed in', () => {
  const component = shallow(
    <Login state = {{ isSignedIn: true }} />
  );

  component.instance().render();

  expect(component).toMatchObject(/Redirect to="\/"/);
});


test('Login handleChange should set userName to Banan', () => {
  const component = shallow(
    <Login state = {{ isSignedIn: false }} />
  );

  let event = {
    target: {
      value: 'Banan'
    }
  }

  component.instance().handleChange('userName')(event);
  const userState = component.state('userName');

  expect(userState).toEqual('Banan');
});


test('Login handleChange should set password to Password123', () => {
  const component = shallow(
    <Login state = {{ isSignedIn: false }} />
  );

  let event = {
    target: {
      value: 'Password123'
    }
  }

  component.instance().handleChange('password')(event);
  const passwordState = component.state('password');

  expect(passwordState).toEqual('Password123');
});


test('Login handleSubmit should return "Formuläret ej korrekt ifyllt!" when username is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      isSignedIn: false,
    }
  };

  const component = shallow(
    <Login {...baseProps} />
  );

  component.setState({
    userName: '',
    password: 'Password123',
    email: 'banan@example.com'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Login handleSubmit should return "Formuläret ej korrekt ifyllt!" when password is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      isSignedIn: false,
    }
  };

  const component = shallow(
    <Login {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: '',
    email: 'banan@example.com'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Login handleSubmit should return "Formuläret ej korrekt ifyllt!" when email is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      isSignedIn: false,
    }
  };

  const component = shallow(
    <Login {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: ''
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Login sendRequest should respond with status 200 when user exist', (done) => {
  let mock = new MockAdapter(axios);
  mock.onPost('https://redserver.azurewebsites.net/api/account/login').reply(200);

  const component = shallow(
    <Login state = {{ isSignedIn: false }} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: 'banan@example.com'
  });

  // Call sendRequest
  component.instance().sendRequest().then(response => {
    expect(response.status).toEqual(200);
    done();
  });
});


test('Login sendRequest should respond with status 401 when user does not exist', (done) => {
  let mock = new MockAdapter(axios);
  mock.onPost('https://redserver.azurewebsites.net/api/account/login').reply(401);

  const component = shallow(
    <Login state = {{ isSignedIn: false }} />
  );

  component.setState({
    userName: 'Sofia',
    password: 'Password123',
    email: 'sofia@example.com'
  });

  // Call sendRequest
  component.instance().sendRequest().catch(error => {
    expect(error.message).toEqual('Request failed with status code 401');
    expect(error.response.status).toEqual(401);
    done();
  });
});
