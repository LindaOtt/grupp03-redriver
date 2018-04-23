import React from 'react';
import ChangePassword from '../../../../src/component/settings/user/ChangePassword';
import renderer from 'react-test-renderer';

test('ChangePassword renders without crashing', () => {
  const tree = renderer.create(
    <ChangePassword />
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
