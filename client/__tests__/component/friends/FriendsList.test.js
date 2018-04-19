import React from 'react';
import FriendsList from '../../../src/component/friends/FriendsList';
import renderer from 'react-test-renderer';

test('FriendsList renders without crashing', () => {
  const tree = renderer.create(<FriendsList />);
  expect(tree.toJSON()).toMatchSnapshot();
});
