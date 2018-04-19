import React from 'react';
import TestRegister from '../../../src/component/authentication/TestRegister';
import renderer from 'react-test-renderer';

test('TestRegister renders without crashing', () => {
  const tree = renderer.create(<TestRegister />);
  expect(tree.toJSON()).toMatchSnapshot();
});
