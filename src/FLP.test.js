const {
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
} = require('./FLP.js');

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
  "paritial",
  ()=>{
    let fn = (a,b,c)=>a+b+c;
    let p1 = paritial(fn,1);
    expect(p1(2,3)).toBe(fn(1,2,3));
    let p2 = paritial(p1,2);
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
  "paritialRight(fn)",
  ()=>{
    let fn =  jest.fn( (a,b,c)=>a+b+c );
    let p0=paritialRight(fn,3)
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
