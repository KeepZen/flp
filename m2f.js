const toString = require('./_toString');
/**
 * Convert a method to a function.
 *
 * If you have a function `fn` you can attch it to a object `obj` like
 * `obj.fn=fn`, so the `this` in `fn` now is `obj`.
 *
 * But how do you do if you want use a method as a function?
 * Like sort arrays with a fixed way?
 *
 * `m2f` is use to help you for this.
 *
 * @param {Function} method
 * The method you want covert to a function.
 * @returns {Function}
 * The return function do same as `md`, but add `this` as the first parameter.
 * @example
 * const assert = require('assert');
 * const {PlaceHolder:_,binding,m2f} = require('@keepzen/fp.js');
 * const sortWithZ = binding(m2f(Array.sort),_,(a,b)=>a.z-b.z);
 * let arr=[{a:1,z:2},{b:2,z:1},{c:2,z:4}];
 * sourtWithZ(arr);
 * assert.equal(arr[0].z,1);
 * assert.equal(arr[1].z,2);
 * assert.equal(arr[2].c,2);
 */
const m2f = method => {
  const params = new Array(method.length + 1).fill('x').map((x, i) => x + i).join(', ');
  const code = `(function function_from_${method.name} (${params}) {
    return  method.call(...arguments)
  })`;
  const fun = eval(code);
  fun.toString = toString;
  return fun;
}
module.exports = m2f;
