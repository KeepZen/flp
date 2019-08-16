const deepCopy = require('./deep-copy');

test('deepCopy()', () => {
  expect(deepCopy(1)).toBe(1);
  expect(deepCopy(true)).toBe(true);
  let fn = jest.fn();
  expect(deepCopy(fn)).toBe(fn);
  let a = [];
  a.push(1, 3);
  a.push(a)
  let aCopy = deepCopy(a);
  expect(aCopy[2]).toBe(aCopy);
  let b = { a, v: 1 };
  a.push(b);
  let bCopy = deepCopy(b);
  console.log(bCopy);
  expect(bCopy === bCopy.a[3]).toBe(true);
})
