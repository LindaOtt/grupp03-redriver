import React from 'react';
import { MemoryRouter } from 'react-router';
import FriendsList from '../../../src/component/friends/FriendsList';
import renderer from 'react-test-renderer';

test('FriendsList renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <FriendsList state = {{ isSignedIn: true }}/>
    </MemoryRouter>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
