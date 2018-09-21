/**
Some symbole define:

| Symbole | Node |
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
@return a function just require one arg.
*/
function unary(fn){
  return function onlyOneArg(arg){
    return fn(arg);
  };
}

/**
any=>any

@arg {any} v
@return the value passed in.
*/
function identity(v){
  return v;
}

/**
any=>f(any)

@arg {any} v
@return  a function, which return the arg.
*/
function constant(v){
  return function value(){
    return v;
  };
}

/**
Praital a function.

(fn,...args)=>f'_{n-args.length}
*/
function paritial(fn,...presentArgs){
  return function paritialed(...restArgs){
    return fn(...presentArgs, ...restArgs);
  };
}

/**
Reverse function argument.
f_n=>f'_n
*/
function reverseArg(fn){
  return function reverseArged(...args){
    return fn(...args.reverse())
  }
}

/**
If f is a function require 5 argum.
and g is `g = paritialRight(f,a1,a2,a3)`,
then `f(b1,b2,a1,a2,a3)` same as `g(b1,b2)`.

(f_n,a1,a2,..am) => f'_{n-m}
*/
function paritialRight(fn,...presentArgs){
  return reverseArg(
    paritial( reverseArg(fn), ...presentArgs.reverse() )
  );
}

/**
Curry a function.

f_n=>f_1
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

f_n => f_m
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
f_1 => f_n
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
@arg {Array(fn)} fus
@return combined function.
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
return fn
*/
function pipe(...fns){
  return combine(...fns.reverse());
}

/**
Make then function `fn` can pipeable to others.
@arg {function} fn
@return function, have a properity `.pipe(...fns)`.
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
