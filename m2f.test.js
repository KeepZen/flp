const m2f = require('./m2f');

test('metholdToFunction()', () => {
  const join = m2f([].join);
  expect(typeof join).toBe(`function`);
  expect(join([1, 2], ",")).toBe([1, 2].join(","));
  expect(join.length).toBe([].join.length + 1);
})
