const _ = require('./placeHolder');
const toString = require('./_toString');

const _pipe = v => (fun, ...paramers) => {
  const index = paramers.findIndex(arg => arg === _);
  if (index != -1) {
    paramers[index] = v;
  } else {
    paramers.unshift(v);
  }
  return Pipeable(fun(...paramers));
}

/**
 * 
 * Make a functor that can pipe the `value` to other function.
 * The return `functor` have fellow attributes:
 * + `valueOf`: ( )=>any
 * + `pipe`: (fun,...params)=>Pipeable 
 * + `map`: alias of `pipe`
 * @param {any} value
 * @returns {Functor} The `functor` have three attributes.
 * 
 */
const Pipeable = (value) => {
  const pipe = _pipe(value);
  pipe.toString = toString;
  return {
    valueOf() { return value },
    pipe,
    map: pipe
  }
}

/**
 * Alias of `Pipeable` make this is more like factor.
 */
Pipeable.of = Pipeable;
Pipeable.toString = toString;
/**
 * The place holder of `v`, use as a element of `paramers` in `bind`/`map`.
 * `paramers` can include zero or one place holder.
 * If `paramers` have none place holder, the `v` will put as the first argument of `fun`,
 * same as put the place holder at index 0 at `paramers`.
 */
Pipeable.placeHolder = _;
module.exports = Pipeable;
