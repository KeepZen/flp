const Stream = (interator) => {
  const isDone = { done: false };
  const take = _take(interator, isDone);
  const skip = _skip(interator, isDone);
  const map = fun => {
    const take = _take(interator, isDone, fun);
    return { take, skip, map }
  }
  return {
    take, skip, map,
  }
}
function* _range(from, to, step = 1, fun = id => id) {
  let i = from;
  while (i < to) {
    yield fun(i);
    i += step;
  }
  return to;
}
const _skip = (g, done) => n => {
  if (n < 0) {
    throw 'Bad argument `n`, expect a postive integer get a naitive.'
  }
  while (n-- > 0) {
    ({ done: done.done } = g.next());
  }
}
const _take = (g, done, fun = id => id) => (n = 1) => {
  if (n == 1) {
    let ret = g.next();
    done.done = ret.done;
    return fun(ret.value);
  }
  const ret = new Array(n).fill(undefined);
  let i = 0, value;
  do {
    ({ value, done: done.done } = g.next());
    ret[i++] = value;
  } while (i < n && !done.done);
  return ret;
}
const Range = (from, to, step) => {
  const g = _range(from, to, step);
  const tem = (to - from) / step;
  let length = Math.floor(tem);
  if (length < tem) {
    length++;
  }
  const done = { done: false };
  return {
    include: (n) => from <= n && n <= to,
    take: _take(g, done),
    skip: _skip(g, done),
    get length() { return length },
    get haveRest() { return !done.done },
  }
}
test('Range(from,to)', () => {
  let r = Range(1, 10);
  expect(r.take()).toBe(1);
  expect(r.take(2)).toMatchObject([2, 3]);
  r.skip(1);
  expect(r.take()).toBe(5);
  expect(r.haveRest).toBe(true);
  r.skip(4);
  expect(r.take()).toBe(10);
  //console.log(r.take());
  expect(r.haveRest).toBe(false);
})
