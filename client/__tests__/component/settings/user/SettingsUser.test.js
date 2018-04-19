import React from 'react';
import SettingsUser from '../../../../src/component/settings/user/SettingsUser';
import renderer from 'react-test-renderer';

test('SettingsUser renders without crashing', () => {
  const tree = renderer.create(<SettingsUser />);
  expect(tree.toJSON()).toMatchSnapshot();
});
