const _binded = (fun, args, ...bindedArgs) => {
  let index = 0
  let firstPart = args.map(arg => arg == _ ? bindedArgs[index++] : arg);
  let secondPart = firstPart.length < fun.length ? bindedArgs.slice(index) : [];
  let fullArgs = [...firstPart, ...secondPart];
  return fun(...fullArgs);
}
const _toString = require('./_toString');

const _ = require("./placeHolder");

const binding = (fun, ...args) => {
  const countOfAfterBind = fun.length - args.length;
  const countOfNeedPlace = args.filter(arg => arg == _).length;
  const countOfBinded = countOfAfterBind <= 0 ? countOfNeedPlace : countOfNeedPlace + countOfAfterBind;
  const params = new Array(countOfBinded).fill('x').map((x, i) => x + i).join(", ");
  const bindedCode = `(function bind_${fun.name}(${params}) { return _binded(fun,args,${params}); })`
  const fn = eval(bindedCode);
  fn.toString = _toString;
  return fn;
}
binding.placeHolder = _;
module.exports = binding;
