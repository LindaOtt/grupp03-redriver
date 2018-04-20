import React from 'react';
import SettingsUser from '../../../../src/component/settings/user/SettingsUser';
import renderer from 'react-test-renderer';

test('SettingsUser renders without crashing', () => {
  const tree = renderer.create(
    <SettingsUser state = {{ userInfo : { username: 'username' } }}/>
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
