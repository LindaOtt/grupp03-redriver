import React from 'react';
import { MemoryRouter } from 'react-router';
import UserAccount from '../../../src/component/account/UserAccount';
import renderer from 'react-test-renderer';

test('UserAccount renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <UserAccount state = {{ isSignedIn: true, userInfo : { username: 'username' }}}/>
    </MemoryRouter>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
