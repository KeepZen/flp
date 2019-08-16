const curry = require('./curry');
const fn = jest.fn((a, b, c) => a + b + c);
test('curry(fn)', () => {
  const curryedFn = curry(fn);
  expect(curryedFn(1)(2)(3)).toBe(1 + 2 + 3);
  expect(fn).toHaveBeenCalledWith(1, 2, 3);
  expect(curryedFn(1, 2)(3)).toBe(1 + 2 + 3);
  expect(fn).toHaveBeenCalledWith(1, 2, 3);
  expect(curryedFn(1, 2, 3)).toBe(1 + 2 + 3);
  expect(fn).toHaveBeenCalledWith(1, 2, 3);
  expect(curryedFn(1, 2, 3, 4)).toBe(1 + 2 + 3);
  expect(fn).toHaveBeenCalledWith(1, 2, 3, 4);
})
test('curry(fn,{strict:true})', () => {
  const curryedFn2 = curry(fn, { strict: true });
  expect(curryedFn2.length).toBe(1);
  expect(typeof curryedFn2).toBe('function');
  expect(curryedFn2(1)(2)(3)).toBe(1 + 2 + 3);
  expect(typeof curryedFn2(1, 2)).toBe('function');
  expect(curryedFn2(1, 2)(3, 4)(5, 6)).toBe(1 + 3 + 5);
})
