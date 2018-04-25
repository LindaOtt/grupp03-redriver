import React from 'react';
import Enzyme from 'enzyme';
import {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FriendsView from '../../../src/component/friends/FriendsView';

Enzyme.configure({ adapter: new Adapter() });

test('FriendsView renders without crashing', () => {
  const component = shallow(
    <FriendsView state = {{ isSignedIn: true }}/>
  );

  expect(component).toMatchSnapshot();
});


test('FriendsView redirects to login', () => {
  const component = shallow(
    <FriendsView state = {{ isSignedIn: false }}/>
  );

  expect(component).toMatchObject(/Redirect to="\/login"/);
});
