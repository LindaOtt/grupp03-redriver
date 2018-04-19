import React from 'react';
import SettingsAdmin from '../../../../src/component/settings/admin/SettingsAdmin';
import renderer from 'react-test-renderer';

test('SettingsAdmin renders without crashing', () => {
  const tree = renderer.create(<SettingsAdmin />);
  expect(tree.toJSON()).toMatchSnapshot();
});
