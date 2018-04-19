import React from 'react';
import NewPassword from '../../../src/component/authentication/NewPassword';
import renderer from 'react-test-renderer';

test('NewPassword renders without crashing', () => {
  const tree = renderer.create(<NewPassword />);
  expect(tree.toJSON()).toMatchSnapshot();
});
