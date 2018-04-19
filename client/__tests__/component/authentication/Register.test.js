import React from 'react';
import Register from '../../../src/component/authentication/Register';
import renderer from 'react-test-renderer';

test('Register renders without crashing', () => {
  const tree = renderer.create(<Register />);
  expect(tree.toJSON()).toMatchSnapshot();
});
