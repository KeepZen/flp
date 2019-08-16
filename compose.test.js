const { compose, pipe } = require('./compose');

const g = jest.fn((a, b) => a + b);
const f = jest.fn(c => c + 1);

test('compose(f,g)', () => {
  const z = compose(f, g);
  expect(typeof z).toBe('function');
  expect(z.length).toBe(g.length);
  expect(z(1, 2, 3)).toBe(1 + 2 + 1);
  expect(g).toHaveBeenCalledWith(1, 2, 3);
  expect(f).toHaveBeenCalledWith(3);
})

test('pipe(g,f)', () => {
  const z = pipe(g, f);
  expect(typeof z).toBe('function');
  expect(z.length).toBe(g.length);
  expect(z(1, 2, 3)).toBe(1 + 2 + 1);
  expect(g).toHaveBeenCalledWith(1, 2, 3);
  expect(f).toHaveBeenCalledWith(3);
  console.log(z.name);
})
