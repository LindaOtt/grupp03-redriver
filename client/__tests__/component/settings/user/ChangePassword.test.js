import React from 'react';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChangePassword from '../../../../src/component/settings/user/ChangePassword';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

Enzyme.configure({ adapter: new Adapter() });

describe('ChangePassword', () => {
  const props = {
    openSnackBar: jest.fn()
  };

  const component = shallow(
    <ChangePassword {...props}/>
  );

  it('renders without crashing', () => {
    expect(component).toMatchSnapshot();
  });


  describe('handleChange', () => {
    let event = {
      target: {
        value: 'Password123'
      }
    }

    it('should set password to Password123', () => {
      component.instance().handleChange('password')(event);
      const passwordState = component.state('password');

      expect(passwordState).toEqual('Password123');
    });

    it('should set passwordConfirm to Password123', () => {
      component.instance().handleChange('passwordConfirm')(event);
      const passwordConfirmState = component.state('passwordConfirm');

      expect(passwordConfirmState).toEqual('Password123');
    });
  });


  describe('handleSubmit', () => {
    it('should return "Formuläret ej korrekt ifyllt!" when password is missing', (done) => {
      const props1 = {
        openSnackBar: jest.fn()
      };

      const component1 = shallow(
        <ChangePassword {...props1}/>
      );

      component1.setState({
        password: '',
        passwordConfirm: 'Password123'
      });

      component1.instance().handleSubmit();

      expect(props1.openSnackBar).toHaveBeenCalledTimes(1);
      done();
    });

    it('should return "Formuläret ej korrekt ifyllt!" when passwordConfirm is missing', (done) => {
      const props2 = {
        openSnackBar: jest.fn()
      };

      const component2 = shallow(
        <ChangePassword {...props2}/>
      );

      component2.setState({
        password: 'Password123',
        passwordConfirm: ''
      });

      component2.instance().handleSubmit();

      expect(props2.openSnackBar).toHaveBeenCalledTimes(1);
      done();
    });

    it('should return "Lösenorden matchar inte!" when password and passwordConfirm are different', (done) => {
      const props3 = {
        openSnackBar: jest.fn()
      };

      const component3 = shallow(
        <ChangePassword {...props3}/>
      );

      component3.setState({
        password: 'Password123',
        passwordConfirm: 'password1'
      });

      component3.instance().handleSubmit();

      expect(props3.openSnackBar).toHaveBeenCalledTimes(1);
      done();
    });

    //TODO: Rewrite this test when sendRequest is implemented.
    it('should call sendRequest', (done) => {
      const props4 = {
        openSnackBar: jest.fn()
      };

      const component4 = shallow(
        <ChangePassword {...props4}/>
      );

      component4.setState({
        password: 'Password123',
        passwordConfirm: 'Password123'
      });

      component4.instance().handleSubmit();

      expect(props4.openSnackBar).toHaveBeenCalledTimes(0);
      done();
    });
  });
});
