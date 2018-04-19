import ObjectAssignment from '../../src/examples-for-tests/ObjectAssignment';

test('assigns one and two to object', () => {
  expect(ObjectAssignment()).toEqual({one: 1, two: 2});
  expect(ObjectAssignment()).not.toEqual({two: 1, one: 2});
});
