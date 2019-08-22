const not = require('./not');
test('not(p)', () => {
  let p = n => n % 2 == 0;
  expect(not(p)(2)).toBe(!p(2));
  expect(not(p)(1)).toBe(!p(1));
  expect(not((a, b) => a - b)(1, 2)).toBe(2 - 1);
})
