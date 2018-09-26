const {
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
} = require('./FP.js');

test(
  "unary(fn)",
  ()=>{
    let fn = jest.fn((a,b,c)=>a+b+c);
    unary(fn)(1,2,3);
    expect(fn.mock.calls[0].length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(1);

  }
)

test(
  "identity(any)",
  ()=>{
    let object={};
    expect(identity(object)).toBe(object);
  }
)

test(
  "constant(any)",
  ()=>{
    let obj={};
    let fn = constant(obj);
    expect(fn()).toBe(obj);
  }
)

test(
  "partial",
  ()=>{
    let fn = (a,b,c)=>a+b+c;
    let p1 = partial(fn,1);
    expect(p1(2,3)).toBe(fn(1,2,3));
    let p2 = partial(p1,2);
    expect(p1(2,3)).toBe(p2(3));
  }
)

test(
  "reverseArg(fn)",
  ()=>{
    let fn = jest.fn( (a,b,c)=>a+b+c ) ;
    reverseArg(fn)(1,2,3);
    // console.log(fn.mock.calls)
    expect(fn.mock.calls[0].length).toBe(3)
    expect(fn.mock.calls[0][0]).toBe(3)
    expect(fn.mock.calls[0][1]).toBe(2)
    expect(fn.mock.calls[0][2]).toBe(1)
  }
)

test(
  "partialRight(fn)",
  ()=>{
    let fn =  jest.fn( (a,b,c)=>a+b+c );
    let p0=partialRight(fn,3)
    expect(typeof p0).toBe('function')
    p0(1,2);
    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe(2);
    expect(fn.mock.calls[0][2]).toBe(3);
  }
)

test(
  'curry(fn)',
  ()=>{
    let fn = jest.fn((a,b,c)=>a+b+c);
    let c = curry(fn);
    c(1)(2)(3);
    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe(2);
    expect(fn.mock.calls[0][2]).toBe(3);

    c(1)(2)(3);
    expect(fn.mock.calls[1][0]).toBe(1);
    expect(fn.mock.calls[1][1]).toBe(2);
    expect(fn.mock.calls[1][2]).toBe(3);
  }
)

test(
  'looseCurry(fn)',
  ()=>{
    let fn = jest.fn( (a,b,c)=>a+b+c );
    let cl = looseCurry(fn);
    cl(1,2,3);

    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe(2);
    expect(fn.mock.calls[0][2]).toBe(3);

    cl(1)(2,3);
    expect(fn.mock.calls[1][0]).toBe(1);
    expect(fn.mock.calls[1][1]).toBe(2);
    expect(fn.mock.calls[1][2]).toBe(3);

    let z= cl(1,2)
    expect(fn.mock.calls[2]).toBeUndefined();
    z(3);
    expect(fn.mock.calls[2][0]).toBe(1);
    expect(fn.mock.calls[2][1]).toBe(2);
    expect(fn.mock.calls[2][2]).toBe(3);
  }
)

test(
  "uncurry(fn)",
  ()=>{
    let fn = jest.fn( (a,b,c)=> a+b+c );
    let uc = uncurry( curry(fn) );
    uc(1)(2,3);
    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe(2);
    expect(fn.mock.calls[0][2]).toBe(3);
    uc(1,2,3,4);
    expect(fn.mock.calls[1].length).toBe(3);
    expect(fn.mock.calls[1][0]).toBe(1);
    expect(fn.mock.calls[1][1]).toBe(2);
    expect(fn.mock.calls[1][2]).toBe(3);
  }
)

test(
  "combine(f,f1)",
  ()=>{
    let f1= (x=>x+1);
    let f2 = jest.fn();
    let c = combine(f2,f1);
    c(1);
    expect(f2.mock.calls[0][0]).toBe(2);
  }
)

test(
  "pipe(f1,f2)",
  ()=>{
    let f1 = jest.fn(x=>x+1);
    let f2 = jest.fn();
    pipe(f1,f2)(1);
    expect(f1.mock.calls[0][0]).toBe(1);
    expect(f2.mock.calls[0][0]).toBe(2);
  }
)

test(
  "pipeable(f1)",
  ()=>{
    let t = x=>x+1;
    let f1 = jest.fn(t);
    let f2 = jest.fn(t);
    let f3 = jest.fn(t);
    pipeable(f1)
    .pipe(f2,f3)
    .pipe(f3)(1);
    expect(f1.mock.calls[0][0]).toBe(1);
    expect(f2.mock.calls[0][0]).toBe(2);
    expect(f3.mock.calls[0][0]).toBe(3);
    expect(f3.mock.calls[1][0]).toBe(4);
  }
)

function sumFromOneTo(n){
  let sum =0;
  while(n>0){
    sum += n;
    n--;
  }
  return sum;
}
test(
  "trampoline(ret)",
  ()=>{
    function sumFromOneTo2(n){
      function t(ret,n){
        if(n==0){
          return ret;
        }
        return t.bind(null,ret+n,n-1);
      }
      return trampoline(t.bind(null,0,n));
    }
    expect(sumFromOneTo(10)).toBe(sumFromOneTo2(10));
    let t = 1E6;
    expect(sumFromOneTo(t)).toBe(sumFromOneTo2(t))
  }
)

test(
  "tco(functiondefine)",
  ()=>{
    function tcoSumFromOneTo(n){
      const sum=tco((ret,n)=>{
        if(n == 0) return ret;
        return sum(ret+n,n-1);
      });
      return sum(0,n);
    }
    let t = 1E6;
    expect(sumFromOneTo(t)).toBe(tcoSumFromOneTo(t));
  }
)
