const binding = require('./binding');
const _ = binding.placeHolder;
const fn = (a, b, c, d) => a + b + c + d;
test("binding()", () => {
  let bindFn = binding(fn, "1", _, "3");
  expect(typeof bindFn).toBe('function');
  expect(bindFn.length).toBe(fn.length - 2);
  expect(bindFn(2, "a")).toBe('123a');
  let bindFn2 = binding(bindFn, _, "a");
  expect(bindFn2(2)).toBe(bindFn(2, "a"));
  let z = jest.fn(fn);
  let bindFn3 = binding(z, 1, 2, 3, 4, 5);
  expect(bindFn3.length).toBe(0);
  expect(bindFn3()).toBe(1 + 2 + 3 + 4);
  expect(z).toHaveBeenCalledWith(1, 2, 3, 4, 5);
  console.log(bindFn2.toString());
})
