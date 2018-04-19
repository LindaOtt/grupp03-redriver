import React from 'react';
import App from '../src/App';
import renderer from 'react-test-renderer';

test('App renders without crashing', () => {
  const tree = renderer.create(<App />);
  expect(tree.toJSON()).toMatchSnapshot();
});
