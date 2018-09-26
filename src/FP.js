/**
Some symbol definitions:

| Symbol | Definition |
|---------|------|
| f(t) | A function, require one argument, which type is `t`. |
| f(t1,t2,...,tn)| A function, require n arguments. |
| f' | The variant of function f, have some result but different parameters. |
| f_n | A function, require n arguments. |
@module
*/

/**
Change the fn to unary function.

f(anys) => f'.

@arg {function} fn - A function require n arguments.
@return {function} - a function just require one argument.
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
Partial a function.

(fn,...args)=>fm

If `fn` is a function require n arguments
and `fm = partial(fn,arg1,arg2,...argx)`,
then `fm` is a function require (n-x) arguments
and `fm(1,2,3)` have same mean as
`fn(arg1,arg2,...argx,1,2,3)`.

@arg {function} fn - A function require n arguments.
@arg {Array(any)} presentArgs - Zero or more arguments use to partial `fn`.
@return {function}
*/
function partial(fn,...presentArgs){
  return function paritialed(...restArgs){
    return fn(...presentArgs, ...restArgs);
  };
}

/**
Reverse function `fn` arguments.

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
If `f` is a function require 5 arguments.
and `g = partialRight(f,a1,a2,a3)`,
then `f(b1,b2,a1,a2,a3)` same as `g(b1,b2)`.

(f_n,a1,a2,..am) => f'_{n-m}

@arg {function} fn
@arg {Array(any)} presentArgs
@return {function}
*/
function partialRight(fn,...presentArgs){
  return reverseArg(
    partial( reverseArg(fn), ...presentArgs.reverse() )
  );
}

/**
Currying a function.

See [Wikipedia About Currying](https://en.wikipedia.org/wiki/Currying)

@arg {function} fn -
 A function have more than one arguments.
@arg {number} arity - How many arguments the `fn` required.
@return {function}
*/
function curry(fn,arity=fn.length){
  return (function nextCurry(totalArgs=[]){
    return function curried(arg) {
      if(totalArgs.length >= arity-1){
        return fn(...totalArgs,arg);
      }else{
        return nextCurry([...totalArgs,arg]);
      }
    };//end curried
  })();
}

/**
Currying a function in a loose way.

If a function `fn` require 3 arguments,
it be curried as `c=curry(fn)`,
to get result, we must do like `c(1)(2)(3)`.

Now `lc=looseCurry(fn)`, get same result, we can do like:
1. `lc(1,2,3)`
2. `lc(1,2)(3)`
3. `lc(1)(2,3)`
4. `lc(1)(2)(3)`

@arg {function} fn
@arg {number} arity - How many arguments of `fn` required.
@return {function}
*/
function looseCurry(fn,arity=fn.length){
  return (function nextCurry(totalArgs=[]){
    return function curried(...presentArgs){
      if(totalArgs.length + presentArgs.length >= arity){
        return fn(...totalArgs,...presentArgs);
      }else{
        return nextCurry([...totalArgs,...presentArgs]);
      }
    };//end curried
  })()
}


/**
Change a curried function to a loose curry function.
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
@return {function} - The combined function.
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
*/
function pipe(...fns){
  return combine(...fns.reverse());
}

/**
Make the function `fn`  pipeable to other functions.
@arg {function} fn
@return {function} - A function have a property `.pipe(...fns)`.
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

/**
Help a function recursion.

Example:
```js
function sumFromOneTo(n){
  function _sum(ret,i){
    if(i == 0){
      return ret;
    }else{
        //Do some operations on arguments,
        //but delay to call.
      return _sum.bind(null,ret+n,i-1);
    }
  }
  return trampoline(_sum.bind(0,n));
}
```
@arg {function} ret - A function need no argument and return a value
or return another function need no argument.
@return {any}
*/
function trampoline(ret){
  while(typeof ret == 'function'){
    ret = ret();
  }
  return ret;
}

/**
Tail Call Optimize.

Usage Example:
```js
function tcoSumFromOneTo(n){
  const sum=tco((ret,n)=>{
    if(n == 0) return ret;
    return sum(ret+n,n-1);
  });
  return sum(0,n);
}
```

It is a beautiful function.
Make a [Klein bottle](https://en.wikipedia.org/wiki/Klein_bottle) may be hard,
with help of `tco`, make a function have the topology structure like
Klein bottle is easy.

@arg {function} f - The function you defined.
@return {function} - A function may confuse you where is entrance and exit.
*/
function tco(f){
  let o=Object.create(null);
  let active=false;
  return function klein_bottle(){
    o.args = arguments;
    if(active == false){
      active = true;
      let value;
      while(o.args){
        let args = o.args ;
        delete o.args;
        value=f(...args);
      }
      return value;
    }
  }
}

module.exports ={
  unary,
  identity,
  constant,
  partial,
  reverseArg,
  partialRight,
  curry,
  looseCurry,
  uncurry,
  combine,
  pipe,
  pipeable,
  trampoline,
  tco,
}
