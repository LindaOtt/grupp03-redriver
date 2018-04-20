import React from 'react';
import { MemoryRouter } from 'react-router';
import Login from '../../../src/component/authentication/Login';
import renderer from 'react-test-renderer';

test('Login renders without crashing', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <Login state = {{ isSignedIn: false }}/>
    </MemoryRouter>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
