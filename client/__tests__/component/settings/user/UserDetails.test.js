import React from 'react';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserDetails from '../../../../src/component/settings/user/UserDetails';

Enzyme.configure({ adapter: new Adapter() });

test('UserDetails renders without crashing', () => {
  const component = shallow(
    <UserDetails state =  {{ userInfo : { username: 'username' } }}/>
  );

  expect(component).toMatchSnapshot();
});


test('UserDetails handleChange should set userName to Banan', () => {
  const component = shallow(
    <UserDetails state =  {{ userInfo : { username: 'username' } }} />
  );

  let event = {
    target: {
      value: 'Banan'
    }
  }

  component.instance().handleChange('userName')(event);
  const userState = component.state('userName');

  expect(userState).toEqual('Banan');
  expect(userState).not.toEqual('username');
});


test('UserDetails handleChange should set firstName to Jan', () => {
  const component = shallow(
    <UserDetails state =  {{ userInfo : { firstName: 'firstname' } }} />
  );

  let event = {
    target: {
      value: 'Jan'
    }
  }

  component.instance().handleChange('firstName')(event);
  const firstNameState = component.state('firstName');

  expect(firstNameState).toEqual('Jan');
  expect(firstNameState).not.toEqual('firstname');
});


test('UserDetails handleEditButton should set formDisabled to false', () => {
  const component = shallow(
    <UserDetails state =  {{ userInfo : { firstName: 'firstname' } }} />
  );

  component.instance().handleEditButton(false);
  const formState = component.state('formDisabled');

  expect(formState).toEqual(false);
  expect(formState).not.toEqual(true);
});


test('UserDetails handleEditButton should set formDisabled to true', () => {
  const component = shallow(
    <UserDetails state =  {{ userInfo : { firstName: 'firstname' } }} />
  );

  component.instance().handleEditButton(true);
  const formState = component.state('formDisabled');

  expect(formState).toEqual(true);
  expect(formState).not.toEqual(false);
});


test('UserDetails handleSubmit should return "Formuläret ej korrekt ifyllt!" when username is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      userInfo: {
        firstName: 'firstname'
      }
    }
  };

  const component = shallow(
    <UserDetails {...baseProps} />
  );

  component.setState({
    userName: '',
    email: 'banan@example.com',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('UserDetails handleSubmit should return "Formuläret ej korrekt ifyllt!" when email is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      userInfo: {
        firstName: 'firstname'
      }
    }
  };

  const component = shallow(
    <UserDetails {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    email: '',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('UserDetails handleSubmit should return "Formuläret ej korrekt ifyllt!" when surname is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      userInfo: {
        firstName: 'firstname'
      }
    }
  };

  const component = shallow(
    <UserDetails {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    email: 'banan@example.com',
    surname: '',
    firstName: 'Jan'
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('UserDetails handleSubmit should return "Formuläret ej korrekt ifyllt!" when surname is missing', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      userInfo: {
        surname: 'surname'
      }
    }
  };

  const component = shallow(
    <UserDetails {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    email: 'banan@example.com',
    surname: 'Banan',
    firstName: ''
  });

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(1);
});


test('UserDetails handleSubmit should return "Lösenorden matchar inte!" when password and passwordConfirm is not matching', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      userInfo: {
        surname: 'surname'
      }
    }
  };

  const component = shallow(
    <UserDetails {...baseProps} />
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


test('UserDetails handleSubmit should call handleEditButton', () => {
  const baseProps = {
    openSnackBar: jest.fn(),
    state: {
      userInfo: {
        surname: 'surname'
      }
    }
  };

  const component = shallow(
    <UserDetails {...baseProps} />
  );

  component.setState({
    userName: 'Banan',
    password: 'Password123',
    email: 'banan@example.com',
    passwordConfirm: 'Password123',
    surname: 'Banan',
    firstName: 'Jan'
  });

  component.instance().handleEditButton = jest.fn();

  component.instance().handleSubmit();

  expect(baseProps.openSnackBar).toHaveBeenCalledTimes(0);
  expect(component.instance().handleEditButton).toHaveBeenCalledTimes(1);
});


test('UserDetails render should call handleEditButton when "Ändra uppgifter" button is clicked', () => {
  const baseProps = {
    state: {
      userInfo: {
        surname: 'surname'
      }
    }
  };

  const component = mount(
    <UserDetails {...baseProps} />
  );

  component.setState({
    formDisabled: true
  });

  component.instance().handleEditButton = jest.fn();

  let button = component.find('button');

  component.instance().render();
  button.simulate('click');

  expect(component.instance().handleEditButton).toHaveBeenCalledTimes(1);
});


test('UserDetails render should call handleEditButton when "Ångra" button is clicked', () => {
  const baseProps = {
    state: {
      userInfo: {
        surname: 'surname'
      }
    }
  };

  const component = mount(
    <UserDetails {...baseProps} />
  );

  component.setState({
    formDisabled: false
  });

  component.instance().handleEditButton = jest.fn();

  let button = component.find('button');

  component.instance().render();
  button.at(0).simulate('click');

  expect(component.instance().handleEditButton).toHaveBeenCalledTimes(1);
});


test('UserDetails render should call handleSubmit when "Ok" button is clicked', () => {
  const baseProps = {
    state: {
      userInfo: {
        surname: 'surname'
      }
    }
  };

  const component = mount(
    <UserDetails {...baseProps} />
  );

  component.setState({
    formDisabled: false
  });

  component.instance().handleSubmit = jest.fn();

  let button = component.find('button');

  component.instance().render();
  button.at(1).simulate('click');

  expect(component.instance().handleSubmit).toHaveBeenCalledTimes(1);
});
