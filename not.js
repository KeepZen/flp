/**
 * Negative `fun`.
 * 
 * If `fun` is a predicater, return a new negative predicater.
 * If `fun` is a compare function, return the negative compare function.
 * @param {Function} fun :`(v,...args)=>Boolean|Number`
 * @returns {Function} other_fun: `(v,...args)=>Boolean|Number`
 */
const not = fun => (...args) => {
  let v = fun(...args)
  switch (true) {
    case v instanceof Number:
      return -v;
    default:
      return !v;
  }
}
module.exports = not;
