import React from 'react';
import ChatView from '../../../src/component/chat/ChatView';
import renderer from 'react-test-renderer';

test('ChatView renders without crashing', () => {
  const tree = renderer.create(<ChatView />);
  expect(tree.toJSON()).toMatchSnapshot();
});
