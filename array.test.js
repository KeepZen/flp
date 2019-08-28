const {
  selectWith,
  rejectWith,
  orderWith,
  reverse,
  zip,
  all,
  every,
  any,
} = require('./array');
let array = [1, 2, 3, 4];
let arrayb = [5, 6, 7, 8];
const isOlder = d => d % 2 == 0;
test('selectWith(fun,array)', () => {
  const selectOld = selectWith(isOlder);
  expect(selectOld(array)).toMatchObject([2, 4]);
  expect(selectOld(arrayb)).toMatchObject([6, 8]);
})

test('rejectWith(isOlder)', () => {
  const rejectOlder = rejectWith(isOlder);
  expect(rejectOlder(array)).toMatchObject([1, 3]);
  expect(rejectOlder(arrayb)).toMatchObject([5, 7]);
})

test('orderWith(fun)', () => {
  let sortByZ = orderWith((a, b) => a.z - b.z);
  let array = [{ a: 1, z: 2 }, { a: 2, z: 1 }, { a: 3, z: -1 }];
  let first = array[0];
  let ret = sortByZ(array);
  expect(ret).toMatchObject([{ a: 3, z: -1 }, { a: 2, z: 1 }, { a: 1, z: 2 }]);
  expect(ret[2]).toBe(first)
  expect(array[0]).toBe(first);
});

test('orderWith(fun,{asc=false})', () => {
  let sortByZ = orderWith((a, b) => a.z - b.z, { asc: false });
  let array = [{ a: 1, z: 2 }, { a: 2, z: 1 }, { a: 3, z: -1 }];
  let ret = sortByZ(array);
  expect(ret).toMatchObject(array);
  expect(ret).not.toBe(array);
  expect(ret[0]).toBe(array[0]);
});

test('zip(a1,a2)', () => {
  const a1 = [1, 2, 3, 4];
  const a2 = ['one', 'two', 'three'];
  const ret1 = zip(a1, a2);
  expect(ret1).toMatchObject([[1, 'one'], [2, 'two'], [3, 'three'], [4, undefined]]);
  expect(zip(a2, a1)).toMatchObject([['one', 1], ['two', 2], ['three', 3]]);
})

function reverse_help([ele, ...rest], ret) {
  if (ele == undefined) {
    return ret;
  }
  return reverse_help(rest, [ele, ...ret]);
}
function reverse2(array) {
  return reverse_help(array, []);
}
test('reverse(array)', () => {
  let array = [1, 2, 3, 4];
  expect(reverse(array)).toMatchObject([4, 3, 2, 1]);
  console.log(reverse2(array));
})

const positive = a => a > 0;
test('all(funp,arrayLike)', () => {
  expect(all(positive, [1, 2, 3, 4])).toBe(true);
  expect(all(positive, [1, 2, -1, 3, 4])).toBe(false)
  expect(all(positive, [])).toBe(false)
})

test('every(funp,arrayLikly)', () => {
  expect(every(positive, [1, 2, 3, 4])).toBe(true);
  expect(every(positive, [1, 2, -1, 3, 4])).toBe(false)
  expect(every(positive, [])).toBe(true)
})

test('any(funp,arrayLikly)', () => {
  expect(any(positive, [-1, -2, -3, 4])).toBe(true);
  expect(any(positive, [-1, -2, -3, -4])).toBe(false);
  expect(any(positive, [])).toBe(false);
  expect(any(positive, [0])).toBe(false);
  expect(any(positive, [+0])).toBe(false);
  expect(any(positive, [-0])).toBe(false);
})
