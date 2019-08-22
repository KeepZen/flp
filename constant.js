const deepCopy = require('./deep-copy');

/**
 * Give a value, get a function, which always return freezen deep copy of 
 * the given value.
 * 
 * If you just want get a immutable copy, just use
 * `deeopCopy(value,{freeze:true})`.
 * @param {any} value 
 * @return {Function} : ()=>freezenDeepCopyOfValue
 */
const constant = (value) => {
  const copy = deepCopy(value, { freeze: true });
  return () => copy;
}
module.exports = constant;
