const not = fun => (...args) => {
  let v = fun(...args)
  switch (true) {
    case typeof v == 'number' || v instanceof Number:
      return -v;
    default:
      return !v;
  }
}
module.exports = not;
