const m2f = require('./m2f');
const binding = require('./binding');
const _ = binding.placeHolder;
const not = require('./not');

const selectWith = predicate => binding(m2f([].filter), _, predicate);
const rejectWith = predicate => binding(m2f([].filter), _, not(predicate));

const orderWith = (
  compare = (a, b) => a - b,
  { asc = true } = {}
) => array => m2f([].sort)([...array], asc ? compare : not(compare))


const reverse = array => m2f([].reverse)([...array]);
const zip = (aIterable, arrayLikly) => [...aIterable].map((ele, i) => [ele, arrayLikly[i]]);
const every = (fun, iterable) => [...iterable].every(fun);
const all = (fun, iteratable, ) => {
  iteratable = [...iteratable];
  return iteratable.length > 0 && iteratable.every(fun);
}
const some = (fun, iterable) => [...iterable].some(fun);
module.exports = {
  selectWith,
  rejectWith,
  orderWith,
  reverse,
  zip,
  all,
  every,
  some,
  any: some,
}
