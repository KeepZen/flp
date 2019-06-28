D:\Learn\fp\node_modules\jsdoc-to-markdown\bin\cli.js
<a name="module_FP"></a>

## FP
Some symbol definitions:

| Symbol | Definition |
|---------|------|
| f(t) | A function, require one argument, which type is `t`. |
| f(t1,t2,...,tn)| A function, require n arguments. |
| f' | The variant of function f, have some result but different parameters. |
| f_n | A function, require n arguments. |


* [FP](#module_FP)
    * [~select](#module_FP..select) ⇒ <code>Array</code>
    * [~unary(fn)](#module_FP..unary) ⇒ <code>function</code>
    * [~identity(v)](#module_FP..identity) ⇒ <code>any</code>
    * [~constant(v)](#module_FP..constant) ⇒ <code>function</code>
    * [~partial(fn, ...presentArgs)](#module_FP..partial) ⇒ <code>function</code>
    * [~reverseArg(fn)](#module_FP..reverseArg) ⇒ <code>function</code>
    * [~partialRight(fn, ...presentArgs)](#module_FP..partialRight) ⇒ <code>function</code>
    * [~curry(fn, arity)](#module_FP..curry) ⇒ <code>function</code>
    * [~looseCurry(fn, arity)](#module_FP..looseCurry) ⇒ <code>function</code>
    * [~uncurry(fn)](#module_FP..uncurry) ⇒ <code>function</code>
    * [~combine(...fns)](#module_FP..combine) ⇒ <code>function</code>
    * [~pipe(...fns)](#module_FP..pipe) ⇒ <code>function</code>
    * [~pipeable(fn)](#module_FP..pipeable) ⇒ <code>function</code>
    * [~trampoline(ret)](#module_FP..trampoline) ⇒ <code>any</code>
    * [~tco(f)](#module_FP..tco) ⇒ <code>function</code>
    * [~reject(array, fun)](#module_FP..reject) ⇒ <code>Array</code>

<a name="module_FP..select"></a>

### FP~select ⇒ <code>Array</code>
Select element from `array` cause by `fun`.

**Kind**: inner constant of [<code>FP</code>](#module_FP)  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the Array you want to select from. |
| fun | <code>function</code> | `(a,index)=>boolean`; |

<a name="module_FP..unary"></a>

### FP~unary(fn) ⇒ <code>function</code>
Change the fn to unary function.

f(anys) => f'.

**Kind**: inner method of [<code>FP</code>](#module_FP)  
**Returns**: <code>function</code> - - a function just require one argument.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function require n arguments. |

<a name="module_FP..identity"></a>

### FP~identity(v) ⇒ <code>any</code>
any=>any

**Kind**: inner method of [<code>FP</code>](#module_FP)  
**Returns**: <code>any</code> - - the value was passed in.  

| Param | Type |
| --- | --- |
| v | <code>any</code> | 

<a name="module_FP..constant"></a>

### FP~constant(v) ⇒ <code>function</code>
any=>f(any)

**Kind**: inner method of [<code>FP</code>](#module_FP)  
**Returns**: <code>function</code> - - a function,
which always return the passed `v`.  

| Param | Type |
| --- | --- |
| v | <code>any</code> | 

<a name="module_FP..partial"></a>

### FP~partial(fn, ...presentArgs) ⇒ <code>function</code>
Partial a function.

(fn,...args)=>fm

If `fn` is a function require n arguments
and `fm = partial(fn,arg1,arg2,...argx)`,
then `fm` is a function require (n-x) arguments
and `fm(1,2,3)` have same mean as
`fn(arg1,arg2,...argx,1,2,3)`.

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function require n arguments. |
| ...presentArgs | <code>Array(any)</code> | Zero or more arguments use to partial `fn`. |

<a name="module_FP..reverseArg"></a>

### FP~reverseArg(fn) ⇒ <code>function</code>
Reverse function `fn` arguments.

f_n=>f'_n

If `f(a,b,c)`, and `g=reverseArg(f)`,
then 'g(1,2,3) === f(3,2,1)'.

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_FP..partialRight"></a>

### FP~partialRight(fn, ...presentArgs) ⇒ <code>function</code>
If `f` is a function require 5 arguments.
and `g = partialRight(f,a1,a2,a3)`,
then `f(b1,b2,a1,a2,a3)` same as `g(b1,b2)`.

(f_n,a1,a2,..am) => f'_{n-m}

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| ...presentArgs | <code>Array(any)</code> | 

<a name="module_FP..curry"></a>

### FP~curry(fn, arity) ⇒ <code>function</code>
Currying a function.

See [Wikipedia About Currying](https://en.wikipedia.org/wiki/Currying)

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function have more than one arguments. |
| arity | <code>number</code> | How many arguments the `fn` required. |

<a name="module_FP..looseCurry"></a>

### FP~looseCurry(fn, arity) ⇒ <code>function</code>
Currying a function in a loose way.

If a function `fn` require 3 arguments,
it be curried as `c=curry(fn)`,
to get result, we must do like `c(1)(2)(3)`.

Now `lc=looseCurry(fn)`, get same result, we can do like:
1. `lc(1,2,3)`
2. `lc(1,2)(3)`
3. `lc(1)(2,3)`
4. `lc(1)(2)(3)`

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> |  |
| arity | <code>number</code> | How many arguments of `fn` required. |

<a name="module_FP..uncurry"></a>

### FP~uncurry(fn) ⇒ <code>function</code>
Change a curried function to a loose curry function.

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_FP..combine"></a>

### FP~combine(...fns) ⇒ <code>function</code>
Combine the input functions to a new function.

**Kind**: inner method of [<code>FP</code>](#module_FP)  
**Returns**: <code>function</code> - - The combined function.  

| Param | Type |
| --- | --- |
| ...fns | <code>Array(function)</code> | 

<a name="module_FP..pipe"></a>

### FP~pipe(...fns) ⇒ <code>function</code>
Pipe functions.
`pipe(f1,f2,f3,...fn) === combine(fn,...f3,f2,f1)`

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type |
| --- | --- |
| ...fns | <code>Array(function)</code> | 

<a name="module_FP..pipeable"></a>

### FP~pipeable(fn) ⇒ <code>function</code>
Make the function `fn`  pipeable to other functions.

**Kind**: inner method of [<code>FP</code>](#module_FP)  
**Returns**: <code>function</code> - - A function have a property `.pipe(...fns)`.  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_FP..trampoline"></a>

### FP~trampoline(ret) ⇒ <code>any</code>
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

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type | Description |
| --- | --- | --- |
| ret | <code>function</code> | A function need no argument and return a value or return another function need no argument. |

<a name="module_FP..tco"></a>

### FP~tco(f) ⇒ <code>function</code>
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

**Kind**: inner method of [<code>FP</code>](#module_FP)  
**Returns**: <code>function</code> - - A function may confuse you where is entrance and exit.  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | The function you defined. |

<a name="module_FP..reject"></a>

### FP~reject(array, fun) ⇒ <code>Array</code>
If the param function `fun()` return a true,
the array item was filtered out, like you

**Kind**: inner method of [<code>FP</code>](#module_FP)  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | the Array you want to select from. |
| fun | <code>function</code> | `(a,option)=>boolean` |

