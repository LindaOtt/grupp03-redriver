import React from 'react';
import UserDetails from '../../../../src/component/settings/user/UserDetails';
import renderer from 'react-test-renderer';

test('UserDetails renders without crashing', () => {
  const tree = renderer.create(
    <UserDetails state = {{ userInfo : { username: 'username' } }}/>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
