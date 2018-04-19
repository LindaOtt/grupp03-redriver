import React from 'react';
import Login from '../../../src/component/authentication/Login';
import renderer from 'react-test-renderer';

test('Login renders without crashing', () => {
  const tree = renderer.create(<Login />);
  expect(tree.toJSON()).toMatchSnapshot();
});
