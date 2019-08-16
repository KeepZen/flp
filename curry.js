/**
 *
 * @param {Function} fn
 * @param {{strict:Boolean}} strict
 * keyword param, default value is `false`.
 *
 * @example
 * const assert = require('assert');
 * function abc(a,b,c){
 *   console.log(arguments);
 *   return a+b+c
 * }
 * const looseAbc=curry(abc);
 * assert(looseAbc(1,2,3),abc(1,2,3));
 * assert(looseAbc(1,2)(3),abc(1,2,3));
 * assert(looseAbc(1)(2)(3,4),abc(1,2,3,4));
 *
 * const strictAbc = curry(abc,{strict:true});
 * assert(typeof strictAbc(1,2,3,4),'function');
 * assert(strctAbc(1,2,3,4)(2,3,4)(3,4), abc(1,2,3,4));
 */
const curry = (fn, { strict = false } = {}) => {
  const curryed = (args, arg, ...rest) => {
    if (args == null) {
      args = [arg];
    } else {
      args.push(arg);
    }
    if (!strict) {
      args.push(...rest);
    }
    if (args.length >= fn.length) {
      const ret = fn(...args);
      args = [];
      return ret;
    }
    return curryed.bind(null, args);
  }
  return curryed.bind(null, null);
}
module.exports = curry;
