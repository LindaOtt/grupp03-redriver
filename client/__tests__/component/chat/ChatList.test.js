import React from 'react';
import ChatList from '../../../src/component/chat/ChatList';
import renderer from 'react-test-renderer';

test('ChatList renders without crashing', () => {
  const tree = renderer.create(
    <ChatList state = {{ isSignedIn: true }}/>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
