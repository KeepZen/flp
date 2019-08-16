const deepCopy = require('./deep-copy');

/**
 * Get a **immutable** copy of `value`.
 * @param {any} value the `value` which may be mutable.
 * @example
 * const assert = require('assert');
 * let obj = {a:1,b:2}
 * obj.add_a_and_b=function(){
 *  return this.c  = this.a + this.b;
 * }
 * let objc = constant(obj);
 * objc.a++;
 * assert.equal(obj.a,1);
 * objc.add_a_and_b();
 * assert.equal(objc.c,undefined);
 * @returns {any} An constant value.
 */
const constant = (value) => {
  if (value instanceof Object && value != null) {
    value = deepCopy(value, { freeze: true });
  }
  return value;
}
module.exports = constant;
