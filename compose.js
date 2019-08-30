const toString = require('./_toString');
const compose = (...fns) => {
  const params = new Array(fns[fns.length - 1].length).fill('x').map((x, i) => x + i).join(', ');
  const code = `(function compose_${fns[0].name}_and_others (${params}) {
    return fns.reduceRight( (ret,fn)=>[fn(...ret)],[...arguments])[0];
  })`;
  const fn = eval(code);
  fn.toString = toString;
  return fn;
}

const pipe = (...fns) => {
  const params = new Array(fns[0].length).fill('x').map((x, i) => x + i).join(', ');
  const code = `(function ${fns[0].name}_pipe_to_others (${params}) {
    return fns.reduce( (ret,fn)=>[fn(...ret)],[...arguments])[0];
  })`;
  const fn = eval(code);
  fn.toString = toString;
  return fn;
}

module.exports = {
  compose,
  pipe,
}
