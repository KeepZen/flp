/**
Some symbol definations:

| Symbol | Defination |
|---------|------|
| f(t) | A function, require one argument, which type is `t`. |
| f(t1,t2,...,tn)| A function, require n arguments. |
| f' | The variant of functon f, have some result but not differtne parames. |
| f_n | A function, require n argument. |
@module
*/

/**
Change the fn to unary function.

f(anys) => f'.

@arg {function} fn - A function require n args.
@return {function} - a function just require one arg.
*/
function unary(fn){
  return function onlyOneArg(arg){
    return fn(arg);
  };
}

/**
any=>any

@arg {any} v
@return {any} - the value was passed in.
*/
function identity(v){
  return v;
}

/**
any=>f(any)

@arg {any} v
@return {function} - a function,
which always return the passed `v`.
*/
function constant(v){
  return function value(){
    return v;
  };
}

/**
Praital a function.

(fn,...args)=>fm

If fn is a function require n arguments
and `fm = paritial(fn,arg1,arg2,...argx)`,
then `fm` is a function require (n-x) arguments
and `fm(1,2,3)` have same mean as
`fn(arg1,arg2,...argx,1,2,3)`.

@arg {function} fn - A function require n arguments.
@arg {Array(any)} presentArgs - Zero or more arugemnt use to paritial `fn`.
@return {function}
*/
function paritial(fn,...presentArgs){
  return function paritialed(...restArgs){
    return fn(...presentArgs, ...restArgs);
  };
}

/**
Reverse function `fn` argumentes.

f_n=>f'_n

If `f(a,b,c)`, and `g=reverseArg(f)`,
then 'g(1,2,3) === f(3,2,1)'.


@arg {function}
@return {function}
*/
function reverseArg(fn){
  return function reverseArged(...args){
    return fn(...args.reverse())
  }
}

/**
If f is a function require 5 arguments.
and `g = paritialRight(f,a1,a2,a3)`,
then `f(b1,b2,a1,a2,a3)` same as `g(b1,b2)`.

(f_n,a1,a2,..am) => f'_{n-m}

@arg {function} fn
@arg {Array(any)} presentArgs
@return {function}
*/
function paritialRight(fn,...presentArgs){
  return reverseArg(
    paritial( reverseArg(fn), ...presentArgs.reverse() )
  );
}

/**
Curry a function.

See [Wikipedia About Currying](https://en.wikipedia.org/wiki/Currying)

@arg {function} fn -
 A function have more than one argumentes.
@arg {number} arity - How many argumentes the `fn` required.
@return {function}
*/
function curry(fn,arity=fn.length){
  return (function nextCurry(totalArgs=[]){
    return function curryed(arg) {
      if(totalArgs.length >= arity-1){
        return fn(...totalArgs,arg);
      }else{
        return nextCurry([...totalArgs,arg]);
      }
    };//end curryed
  })();
}

/**
Loose curry a function.

If a function `fn` require 3 argument,
it be curried `c=curry(fn)`,
to get result, we must do like that `c(1)(2)(3)`.

Now `lc=looseCurry(fn)`, get same result, we can do like:
1. `lc(1,2,3)`
2. `lc(1,2)(3)`
3. `lc(1)(2,3)`
4. `lc(1)(2)(3)`

@arg {function} fn
@arg {number} arity - How many argument of `fn` required.
@return {function}
*/
function looseCurry(fn,arity=fn.length){
  return (function nextCurry(totalArgs=[]){
    return function curryed(...presentArgs){
      if(totalArgs.length + presentArgs.length >= arity){
        return fn(...totalArgs,...presentArgs);
      }else{
        return nextCurry([...totalArgs,...presentArgs]);
      }
    };//end curryed
  })()
}


/**
Change a churryed function to a loose curry function.
@arg {function} fn
@return {function}
*/

function uncurry(fn){
  return function uncurryed(...args){
    let ret = fn;
    for(let arg of args){
      if(typeof ret == 'function'){
        ret = ret(arg);
      }else{
        return ret;
      }
    }
    return uncurry(ret);
  }
}

/**
Combine the input functions to a new function.
@arg {Array(function)} fns
@return {function} - combined function.
*/
function combine(...fns) {
  if(fns.length == 0){
    return;
  }
  return function combined(...args){
    let ret;
    let last = fns.length-1;
    for(let i=last; i>=0 ;--i){
      if(i == last){
        ret = fns[i](...args);
      }else{
        ret = fns[i](ret);
      }
    }
    return ret;
  }
}

/**
Pipe functions.
`pipe(f1,f2,f3,...fn) === combine(fn,...f3,f2,f1)`
@arg {Array(function)} fns
@return {function}
return fn
*/
function pipe(...fns){
  return combine(...fns.reverse());
}

/**
Make the function `fn`  pipeable to other functions.
@arg {function} fn
@return {function} - A function have a properity `.pipe(...fns)`.
*/

function pipeable(fn){
  return (function makeCanPipe(...fns){
    const ret = pipe(...fns);
    ret.pipe=function pipe(...fs){
      return makeCanPipe(...[...fns,...fs]);
    };
    return ret;
  })(fn);
}

module.exports ={
  unary,
  identity,
  constant,
  paritial,
  reverseArg,
  paritialRight,
  curry,
  looseCurry,
  uncurry,
  combine,
  pipe,
  pipeable,
}
