const toString = require('./_toString');
const m2f = method => {
  const params = new Array(method.length + 1).fill('x').map((x, i) => x + i).join(', ');
  const code = `(function function_from_${method.name} (${params}) {
    return  method.call(...arguments)
  })`;
  const fun = eval(code);
  fun.toString = toString;
  return fun;
}
module.exports = m2f;
