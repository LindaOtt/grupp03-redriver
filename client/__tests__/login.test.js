import React from 'react';
import TestLogin from '../src/component/authentication/TestLogin';
import renderer from 'react-test-renderer';

test('TestLogin renders without crashing', () => {
  const tree = renderer.create(<TestLogin />);
  expect(tree.toJSON()).toMatchSnapshot();
});
