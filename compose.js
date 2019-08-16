const toString = require('./_toString');
/**
 * Compose functions `fns` to make a new one.
 *
 * $$
 * f \circ g = f(g(x))
 * $$
 * Read as "f of g" or "f after g".
 * Means `g` first to run, after get the result of `g`, then `f` use the result as input to run.
 * @param  {...Function} fns
 * The functions you want to compose them to be one.
 * @returns {Function}
 * @example
 * const assert = require('assert');
 * const first=(a,b)=>a+b
 * const second=a=>a*3;
 * const all = compose(second,first);
 * assert.equal(all.length,2);
 * assert.equal(all(1,2),(1+2)*3);
 */
const compose = (...fns) => {
  const params = new Array(fns[fns.length - 1].length).fill('x').map((x, i) => x + i).join(', ');
  const code = `(function compose_${fns[0].name}_and_others (${params}) {
    return fns.reduceRight( (ret,fn)=>[fn(...ret)],[...arguments])[0];
  })`;
  const fn = eval(code);
  fn.toString = toString;
  return fn;
}

/**
 * `pipe` is like the `compose` but reverse the execute order.
 * It is differtne with `Pipeable`. `Pipeable` make a functor.
 * @param  {...Function} fns
 * @returns {Function}
 * @example
 * const assert = require('assert');
 * const first=(a,b)=>a+b
 * const second=a=>a*3;
 * const all = flow(first,second);
 * assert.equal(all.length,2);
 * assert.equal(all(1,2),(1+2)*3);
 */
const pipe = (...fns) => {
  const params = new Array(fns[0].length).fill('x').map((x, i) => x + i).join(', ');
  const code = `(function ${fns[0].name}_pipe_to_others (${params}) {
    return fns.reduce( (ret,fn)=>[fn(...ret)],[...arguments])[0];
  })`;
  const fn = eval(code);
  fn.toString = toString;
  return fn;
}

module.exports = {
  compose,
  pipe,
}
