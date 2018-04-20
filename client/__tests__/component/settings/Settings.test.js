import React from 'react';
import Settings from '../../../src/component/settings/Settings';
import renderer from 'react-test-renderer';

test('Settings renders without crashing', () => {
  const tree = renderer.create(
    <Settings state = {{ isSignedIn: true, userRole: 'User', userInfo : { username: 'username' }}}/>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
