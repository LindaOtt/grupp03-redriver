import Sum from '../../src/examples-for-tests/Sum';

test('adds 1 + 2 to equal 3', () => {
  expect(Sum(1, 2)).toBe(3);
  expect(Sum(1, 2)).not.toBe(0);
  expect(Sum(1, 2)).toBeGreaterThan(2);
  expect(Sum(1, 2)).toBeLessThan(4);
});

test('adds 1 + 2 not to equal 0', () => {
  expect(Sum(1, 2)).not.toBe(0);
  expect(Sum(1, 2)).toBeGreaterThan(2);
  expect(Sum(1, 2)).toBeLessThan(4);
});

test('adds 1 + 2 to be greater than 2', () => {
  expect(Sum(1, 2)).toBeGreaterThan(2);
  expect(Sum(1, 2)).toBeLessThan(4);
});

test('adds 1 + 2 to be less than 4', () => {
  expect(Sum(1, 2)).toBeLessThan(4);
});
