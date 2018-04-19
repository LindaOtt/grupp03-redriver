import React from 'react';
import Settings from '../../../src/component/settings/Settings';
import renderer from 'react-test-renderer';

test('Settings renders without crashing', () => {
  const tree = renderer.create(<Settings />);
  expect(tree.toJSON()).toMatchSnapshot();
});
