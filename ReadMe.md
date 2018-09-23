<a name="module_FLP"></a>

## FLP
Some symbol definations:

| Symbol | Defination |
|---------|------|
| f(t) | A function, require one argument, which type is `t`. |
| f(t1,t2,...,tn)| A function, require n arguments. |
| f' | The variant of functon f, have some result but not differtne parames. |
| f_n | A function, require n argument. |


* [FLP](#module_FLP)
    * [~unary(fn)](#module_FLP..unary) ⇒ <code>function</code>
    * [~identity(v)](#module_FLP..identity) ⇒ <code>any</code>
    * [~constant(v)](#module_FLP..constant) ⇒ <code>function</code>
    * [~paritial(fn, ...presentArgs)](#module_FLP..paritial) ⇒ <code>function</code>
    * [~reverseArg(fn)](#module_FLP..reverseArg) ⇒ <code>function</code>
    * [~paritialRight(fn, ...presentArgs)](#module_FLP..paritialRight) ⇒ <code>function</code>
    * [~curry(fn, arity)](#module_FLP..curry) ⇒ <code>function</code>
    * [~looseCurry(fn, arity)](#module_FLP..looseCurry) ⇒ <code>function</code>
    * [~uncurry(fn)](#module_FLP..uncurry) ⇒ <code>function</code>
    * [~combine(...fns)](#module_FLP..combine) ⇒ <code>function</code>
    * [~pipe(...fns)](#module_FLP..pipe) ⇒ <code>function</code>
    * [~pipeable(fn)](#module_FLP..pipeable) ⇒ <code>function</code>

<a name="module_FLP..unary"></a>

### FLP~unary(fn) ⇒ <code>function</code>
Change the fn to unary function.

f(anys) => f'.

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  
**Returns**: <code>function</code> - - a function just require one arg.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function require n args. |

<a name="module_FLP..identity"></a>

### FLP~identity(v) ⇒ <code>any</code>
any=>any

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  
**Returns**: <code>any</code> - - the value was passed in.  

| Param | Type |
| --- | --- |
| v | <code>any</code> | 

<a name="module_FLP..constant"></a>

### FLP~constant(v) ⇒ <code>function</code>
any=>f(any)

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  
**Returns**: <code>function</code> - - a function,
which always return the passed `v`.  

| Param | Type |
| --- | --- |
| v | <code>any</code> | 

<a name="module_FLP..paritial"></a>

### FLP~paritial(fn, ...presentArgs) ⇒ <code>function</code>
Praital a function.

(fn,...args)=>fm

If fn is a function require n arguments
and `fm = paritial(fn,arg1,arg2,...argx)`,
then `fm` is a function require (n-x) arguments
and `fm(1,2,3)` have same mean as
`fn(arg1,arg2,...argx,1,2,3)`.

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function require n arguments. |
| ...presentArgs | <code>Array(any)</code> | Zero or more arugemnt use to paritial `fn`. |

<a name="module_FLP..reverseArg"></a>

### FLP~reverseArg(fn) ⇒ <code>function</code>
Reverse function `fn` argumentes.

f_n=>f'_n

If `f(a,b,c)`, and `g=reverseArg(f)`,
then 'g(1,2,3) === f(3,2,1)'.

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_FLP..paritialRight"></a>

### FLP~paritialRight(fn, ...presentArgs) ⇒ <code>function</code>
If f is a function require 5 arguments.
and `g = paritialRight(f,a1,a2,a3)`,
then `f(b1,b2,a1,a2,a3)` same as `g(b1,b2)`.

(f_n,a1,a2,..am) => f'_{n-m}

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 
| ...presentArgs | <code>Array(any)</code> | 

<a name="module_FLP..curry"></a>

### FLP~curry(fn, arity) ⇒ <code>function</code>
Curry a function.

See [Wikipedia About Currying](https://en.wikipedia.org/wiki/Currying)

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | A function have more than one argumentes. |
| arity | <code>number</code> | How many argumentes the `fn` required. |

<a name="module_FLP..looseCurry"></a>

### FLP~looseCurry(fn, arity) ⇒ <code>function</code>
Loose curry a function.

If a function `fn` require 3 argument be curried,
`c=curry(fn)`, We must do like `c(1)(2)(3)`
to get result.

Now `lc=looseCurry(fn)`, get some result, we can do like:
1. `lc(1,2,3)`
2. `lc(1,2)(3)`
3. `lc(1)(2,3)`
4. `lc(1)(2)(3)`

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> |  |
| arity | <code>number</code> | How many argument of `fn` required. |

<a name="module_FLP..uncurry"></a>

### FLP~uncurry(fn) ⇒ <code>function</code>
Change a churryed function to a loose curry function.

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="module_FLP..combine"></a>

### FLP~combine(...fns) ⇒ <code>function</code>
Combine the input functions to a new function.

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  
**Returns**: <code>function</code> - - combined function.  

| Param | Type |
| --- | --- |
| ...fns | <code>Array(function)</code> | 

<a name="module_FLP..pipe"></a>

### FLP~pipe(...fns) ⇒ <code>function</code>
Pipe functions.
`pipe(f1,f2,f3,...fn) === combine(fn,...f3,f2,f1)`

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  
**Returns**: <code>function</code> - return fn  

| Param | Type |
| --- | --- |
| ...fns | <code>Array(function)</code> | 

<a name="module_FLP..pipeable"></a>

### FLP~pipeable(fn) ⇒ <code>function</code>
Make the function `fn`  pipeable to other functions.

**Kind**: inner method of [<code>FLP</code>](#module_FLP)  
**Returns**: <code>function</code> - - A function have a properity `.pipe(...fns)`.  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

