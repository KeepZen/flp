const _ = require('./placeHolder');
const toString = require('./_toString');
const _call = (fun, value, index, paramers) => {
  if (index != -1) {
    paramers[index] = value;
  } else {
    paramers.unshift(value);
  }
  return fun(...paramers);
}
const _pipe = v => (fun, ...paramers) => {
  const index = paramers.findIndex(arg => arg === _);
  const valueOf = () => {
    const valueOrPromise = v.valueOf();
    if (valueOrPromise instanceof Promise) {
      return valueOrPromise.then(
        value => _call(fun, value, index, paramers)
      );
    } else {
      return _call(fun, valueOrPromise, index, paramers);
    }
  }
  const ret = Pipeable();
  ret.valueOf = valueOf;
  return ret;
}

const noFunction = () => undefined;
const _then = pipable => async (resolve, reject = noFunction) => {
  try {
    const value = pipable.valueOf();
    return resolve(value);
  } catch (err) {
    return reject(err);
  }
}
const Pipeable = (value) => {
  const ret = {
    valueOf: () => value,
  }
  const pipe = _pipe(ret);
  pipe.toString = toString;
  ret.pipe = pipe;
  ret.map = pipe;
  ret.then = _then(ret);
  return ret
}

Pipeable.of = Pipeable;
Pipeable.toString = toString;

Pipeable.placeHolder = _;
module.exports = Pipeable;
