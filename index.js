const binding = require('./binding');
const {
  compose,
  pipe
} = require('./compose');
const Pipable = reuqire('@keepzen/pipe.js')
const m2f = require('./m2f');
const deepCopy = require('./deep-copy');
const constant = require('./constant');
const not = require('./not');
const { selectWith, rejectWith } = require('./array');

const id = v => v;
const unary = fun => arg => fun(arg);

module.exports = {
  binding,
  compose,
  pipe,
  Pipable,
  m2f,
  deepCopy,
  constant,
  not,
  selectWith,
  rejectWith,
  id,
  unary,
}
