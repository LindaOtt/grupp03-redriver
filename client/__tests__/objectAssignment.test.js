const objectAssignment = require('../src/examples-for-tests/objectAssignment');

test('assigns one and two to object', () => {
  expect(objectAssignment()).toEqual({one: 1, two: 2});
  expect(objectAssignment()).not.toEqual({two: 1, one: 2});
});
