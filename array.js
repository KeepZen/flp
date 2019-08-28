const m2f = require('./m2f');
const binding = require('./binding');
const _ = binding.placeHolder;
const not = require('./not');
/**
 * select some array with `predicate`.
 *
 * Support there is an `array` include value `v`, and `predicate(v)` is true,
 * then `select(array)` will include `v`.
 * @param {Function} predicate (v,index)=>Boolean;
 * @returns {Function} select: (array)=>array
 */
const selectWith = predicate => binding(m2f([].filter), _, predicate);
/**
 * reject some array with `predicate`
 *
 * Support there is an `array` include value `v`,and `predicate(v)` is true,
 * then `reject(array)` will **not** include `v`.
 * @param {Function} predicate : (v,index)=>Boolean;
 * @returns {Function} reject:(array)=>array
 */
const rejectWith = predicate => binding(m2f([].filter), _, not(predicate));

/**
 * Order a array with a `compare` function.
 * When `asc` is `true`, sort value in ascending order else in descending.
 * 
 * For `compare(a,b)`, in asc order,
 * if you want `a` in front of `b`, return a negative number; 
 * if your want `b` in front of `a` return a positive number;
 * else you do not care which first return zero.
 * @param {Function} compare :`(a,b)=>Boolean`
 * @return {Function} order:(array)=>array
 */
const orderWith = (
  compare = (a, b) => a - b,
  { asc = true } = {}
) => array => m2f([].sort)([...array], asc ? compare : not(compare))


/**
 * Reverse the `array` get a new reversed array.
 * @param {Array} array 
 * @returns {Array}
 * @example 
 * const array = [1,2,3]
 * const reversed = reverse(array);
 * console.log(array != reverse);
 * console.log(array[0] == reversed[2]);
 * console.log(array[2] == reversed[0]);
 */
const reverse = array => m2f([].reverse)([...array]);
/**
 * Zip arrays `a1` and `a2` to an array of array.
 * @param {Array} aIterable 
 * @param {Array} arrayLikly 
 * @returns {Array} Array<Array(2)>
 * @example
 * const array1 = [1,2,3,4];
 * const array2=['one','two','three'];
 * const num_str = zip(array1,array2);
 * console.log(num_str[0][0] === 1);
 * console.log(num_str[0][1] === 'one');
 * console.log(num_str[3][0] === 4);
 * console.log(num_str[3][1] === undefined);
 * console.log(num_str.length === array1.length);
 * 
 * const str_num = zip(array2,array1);
 * console.log(str_num[0][0] === 'one');
 * console.log(str_num[0][1] === 1);
 * console.log(str_num[2][0] === 'three');
 * console.log(str_num[2][1] === 3);
 * console.log(str_num.length === array2.length);
 */
const zip = (aIterable, arrayLikly) => [...aIterable].map((ele, i) => [ele, arrayLikly[i]]);
/**
 * Check is `every` element in `iteratble` satisfy contiontion `fun`.
 * 
 * If `iterable` is empty, return `true`. See more at 
 * [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every#Description);
 * @param {Function} fun :`(element[,index,array])`
 * @param {Iterable} iterable 
 * @return boolean
 */
const every = (fun, iterable) => [...iterable].every(fun);
/**
 * Check is `all` element in `iteratble` satisfy contiontion `fun`.
 * 
 * This is similarity as [every](#every) but if `iterable` is empty, return `false`.
 * @param {Function} fun :`(element[,index,array])`
 * @param {Iterable} iteratable 
 */
const all = (fun, iteratable, ) => {
  iteratable = [...iteratable];
  return iteratable.length > 0 && iteratable.every(fun);
}
/**
 * Check is `some` element in `iterable` satisfy contiontion `fun`.
 * @param {Function} fun :`(element[,index,array])`
 * @param {Iterable} iterable 
 */
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
