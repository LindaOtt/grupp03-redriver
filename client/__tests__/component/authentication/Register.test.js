import React from 'react';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Register from '../../../src/component/authentication/Register';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

Enzyme.configure({ adapter: new Adapter() });

test('Register renders without crashing', () => {
  const component = shallow(
    <Register />
  );

  expect(component).toMatchSnapshot();
});


test('Register handleChange should set userName to Banan', () => {
  const component = shallow(
    <Register />
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


test('Register handleChange should set password to Password123', () => {
  const component = shallow(
    <Register />
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


test('Register handleSubmit should return "Formuläret ej korrekt ifyllt!" when username is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
  };

  const component = shallow(
    <Register {...baseProps} />
  );

  component.setState({
    userName: '',
    password: 'Password123',
    email: 'banan@example.com',
    passwordConfirm: 'Password123',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Register handleSubmit should return "Formuläret ej korrekt ifyllt!" when password is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
  };

  const component = shallow(
    <Register {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: '',
    email: 'banan@example.com',
    passwordConfirm: '',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Register handleSubmit should return "Formuläret ej korrekt ifyllt!" when email is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
  };

  const component = shallow(
    <Register {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: '',
    passwordConfirm: 'Password123',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Register handleSubmit should return "Formuläret ej korrekt ifyllt!" when passwordConfirm is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
  };

  const component = shallow(
    <Register {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: 'banan@example.com',
    passwordConfirm: '',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Register handleSubmit should return "Formuläret ej korrekt ifyllt!" when surname is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
  };

  const component = shallow(
    <Register {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: 'banan@example.com',
    passwordConfirm: 'Password123',
    surname: '',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Register handleSubmit should return "Formuläret ej korrekt ifyllt!" when firstName is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
  };

  const component = shallow(
    <Register {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: 'banan@example.com',
    passwordConfirm: 'Password123',
    surname: 'Banan',
    firstName: ''
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Register handleSubmit should return "Lösenorden matchar inte!" when password and passwordConfirm is not matching', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
  };

  const component = shallow(
    <Register {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: 'banan@example.com',
    passwordConfirm: 'password1',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  const passwordState = component.state('password');
  const passwordConfirmState = component.state('passwordConfirm');

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
  expect(passwordState).toEqual('Password123');
  expect(passwordConfirmState).toEqual('password1');
  expect(passwordState).not.toEqual(passwordConfirmState);
});


// TODO: This test doesn't work yet. TypeError: Cannot read property 'then' of undefined
/*test('Register handleSubmit should call sendRequest', async () => {
  // Mock parent method openSnackBar
  const baseProps = {
    openSnackBar: jest.fn()
  };

  const sendRequestMock = jest.fn();

  window.sendRequest = jest.fn().mockImplementation(() => {
    Promise.resolve({
      json: 200
    });
  });

  const component = shallow(
    <Register sendRequest={sendRequestMock} />
  );

  component.setState({
    userName: 'Katt',
    password: 'Password123',
    email: 'katt@example.com',
    passwordConfirm: 'Password123',
    surname: 'Katt',
    firstName: 'Katt'
  });

  component.instance().handleSubmit();
  expect(window.sendRequest).toHaveBeenCalledTimes(1);

  // Mock sendRequest
  //component.instance().sendRequest = jest.fn();

  // Call handleSubmit
/*  await component.instance().handleSubmit().then((response) => {
    expect(response.status).toEqual(200);
    expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
    expect(component.instance().sendRequest).toHaveBeenCalledTimes(1);
  });
});*/


test('Register sendRequest should respond with status 200', (done) => {
  let mock = new MockAdapter(axios);
  mock.onPost('https://redserver.azurewebsites.net/api/account/register').reply(200);

  const component = shallow(
    <Register />
  );

  component.setState({
    userName: 'Katt',
    password: 'Password123',
    email: 'katt@example.com',
    passwordConfirm: 'Password123',
    surname: 'Katt',
    firstName: 'Katt'
  });

  // Call sendRequest
  component.instance().sendRequest().then(response => {
    expect(response.status).toEqual(200);
    done();
  });
});


test('Register sendRequest should respond with status 400', (done) => {
  let mock = new MockAdapter(axios);
  mock.onPost('https://redserver.azurewebsites.net/api/account/register').reply(400);

  const component = shallow(
    <Register />
  );

  component.setState({
    userName: 'Katt',
    password: 'Password123',
    email: 'katt@example.com',
    passwordConfirm: 'Password123',
    surname: 'Katt',
    firstName: 'Katt'
  });

  // Call sendRequest
  component.instance().sendRequest().catch(error => {
    expect(error.message).toEqual('Request failed with status code 400');
    expect(error.response.status).toEqual(400);
    done();
  });
});


test('Register should navigate to login when registration is done', () => {
  const component = shallow(
    <Register />
  );

  component.setState({
    navigate: true
  });

  component.instance().render();
  const navigateState = component.state('navigate');

  expect(navigateState).toEqual(true);
  expect(navigateState).not.toEqual(false);
  expect(component).toMatchObject(/"\/login"/);
});
