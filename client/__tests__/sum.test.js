const sum = require('../src/examples-for-tests/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).not.toBe(0);
  expect(sum(1, 2)).toBeGreaterThan(2);
  expect(sum(1, 2)).toBeLessThan(4);
});

test('adds 1 + 2 not to equal 0', () => {
  expect(sum(1, 2)).not.toBe(0);
  expect(sum(1, 2)).toBeGreaterThan(2);
  expect(sum(1, 2)).toBeLessThan(4);
});

test('adds 1 + 2 to be greater than 2', () => {
  expect(sum(1, 2)).toBeGreaterThan(2);
  expect(sum(1, 2)).toBeLessThan(4);
});

test('adds 1 + 2 to be less than 4', () => {
  expect(sum(1, 2)).toBeLessThan(4);
});
