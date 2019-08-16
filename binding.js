const _binded = (fun, args, ...bindedArgs) => {
  let index = 0
  let firstPart = args.map(arg => arg == _ ? bindedArgs[index++] : arg);
  let secondPart = firstPart.length < fun.length ? bindedArgs.slice(index) : [];
  let fullArgs = [...firstPart, ...secondPart];
  return fun(...fullArgs);
}
const _toString = require('./_toString');

const _ = require("./placeHolder");

/**
 * Biding function `fun` with arguments fellow it.
 *
 * @param {Function} fun
 *
 *  This is the function whos parameters you want to bind.
 * @param  {...any} args
 *
 *   The values you bind to the parameters of `fun`.
 * @return {Function}
 *
 *   The length of return function is `fun.length - args.length`,
 *   if `args` are all normal values, when `args` includes placeholder `_`,
 *   the length will add the count of placeholders.
 *
 * @example
 * const assert = require('assert');
 * function threeParames(a,b,c){
 *   return a + b + c;
 * }
 * const twoPs = binding(threeParams,1);
 * const onePs = binding(threeParams,1,2);
 * const anotherOneOs = binding(threeParams,_,2,3);
 * const nonP = biding(threeParams,1,2,3);
 * assert.ok(twoPs(2,3) == threeParames(1,2,3));
 * assert.ok(onePs(3) == threeParames(1,2,3));
 * assert.ok(anotherOnePs(1) == threeParames(1,2,3));
 * assert.ok(nonP() == threeParames(1,2,3));
 *
 */
const binding = (fun, ...args) => {
  const countOfAfterBind = fun.length - args.length;
  const countOfNeedPlace = args.filter(arg => arg == _).length;
  const countOfBinded = countOfAfterBind <= 0 ? countOfNeedPlace : countOfNeedPlace + countOfAfterBind;
  const params = new Array(countOfBinded).fill('x').map((x, i) => x + i).join(", ");
  const bindedCode = `(function bind_${fun.name}(${params}) { return _binded(fun,args,${params}); })`
  const fn = eval(bindedCode);
  fn.toString = _toString;
  return fn;
}
/**
 * The place holder that can be use zero or manny times as element of `args` in `binding(fun,...args)`.
 */
binding.placeHolder = _;
module.exports = binding;
