import React from 'react';
import SettingsSuperUser from '../../../../src/component/settings/superUser/SettingsSuperUser';
import renderer from 'react-test-renderer';

test('SettingsSuperUser renders without crashing', () => {
  const tree = renderer.create(<SettingsSuperUser />);
  expect(tree.toJSON()).toMatchSnapshot();
});
