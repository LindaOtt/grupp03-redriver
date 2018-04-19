import React from 'react';
import FriendsView from '../../../src/component/friends/FriendsView';
import renderer from 'react-test-renderer';

test('FriendsView renders without crashing', () => {
  const tree = renderer.create(<FriendsView />);
  expect(tree.toJSON()).toMatchSnapshot();
});