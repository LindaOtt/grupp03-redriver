import React from 'react';
import { Redirect } from 'react-router';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../../src/App';
import Register from '../../../src/component/authentication/Register';
import renderer from 'react-test-renderer';

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
    firstname: 'Jan'
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
    firstname: 'Jan'
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
    firstname: 'Jan'
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
    firstname: 'Jan'
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
    firstname: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('Register handleSubmit should return "Formuläret ej korrekt ifyllt!" when firstname is missing', () => {
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
    firstname: ''
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
    firstname: 'Jan'
  });

  component.instance().handleSubmit();

  const passwordState = component.state('password');
  const passwordConfirmState = component.state('passwordConfirm');

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
  expect(passwordState).toEqual('Password123');
  expect(passwordConfirmState).toEqual('password1');
  expect(passwordState).not.toEqual(passwordConfirmState);
});


// TODO: This test doesn't work yet.
test('Register handleSubmit should call sendRequest', () => {
  jest.mock(Register, () => {
    return jest.fn().mockImplementation(() => {
      return {sendRequest: () => {}};
    });
  });

  const component = shallow(
    <Register />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: 'banan@example.com',
    passwordConfirm: 'Password123',
    surname: 'Banan',
    firstname: 'Jan'
  });

  component.instance().handleSubmit();

  const passwordState = component.state('password');
  const passwordConfirmState = component.state('passwordConfirm');

  expect(sendRequest).toHaveBeenCalledTimes(1);
});


/*test('Register should navigate to login when registered', () => {
  const component = shallow(
    <Register />
  );

  component.instance().render();
  const navigateState = component.state('navigate');

  expect(navigateState).toEqual(true);
});*/
