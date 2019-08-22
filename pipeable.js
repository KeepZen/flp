const _ = require('./placeHolder');
const toString = require('./_toString');

const _pipe = v => (fun, ...paramers) => {
  const index = paramers.findIndex(arg => arg === _);
  if (index != -1) {
    paramers[index] = v.valueOf();
  } else {
    paramers.unshift(v.valueOf());
  }
  const ret = Pipeable();
  ret.valueOf = () => fun(...paramers);
  return ret;
}

/**
 * 
 * Make a functor that can pipe the `value` to other function.
 * The return `functor` have fellow attributes:
 * + `valueOf`: ( )=>any
 * + `pipe`: (fun,...params)=>Pipeable 
 * + `map`: alias of `pipe`
 * @param {any} value
 * @example
 * const v = Pipeable(1);
 * const v2=v.pipe((a,b)=>{console.log(`a:${a},b:${b}`);return a+b},2,Pipeable.placeHolder);
 * console.log((v == 1) === true);
 * console.log((v ====1) === false);
 * console.log( (v==3) === true);//before `true`, output `a:2,b:1`. 
 * @returns {Functor} The `functor`.
 * 
 */
const Pipeable = (value) => {
  const ret = {
    valueOf: () => value,
  }
  const pipe = _pipe(ret);
  pipe.toString = toString;
  ret.pipe = pipe;
  ret.map = pipe;
  return ret
}

/**
 * Alias of `Pipeable` make this is more like factor.
 */
Pipeable.of = Pipeable;
Pipeable.toString = toString;
/**
 * The place holder of `pipeable.valueOf()`, use as an argument of `pipeable.bind`/`pipeable.map`.
 * 
 * The `arguments` of `pipeable.bind`/`pipeable.map` can include zero or one place holder.
 * If there is no place holder, the `pipeable.valueOf()` will be the first argument of `fun`.
 */
Pipeable.placeHolder = _;
module.exports = Pipeable;
