const curry = (fn, { strict = false } = {}) => {
  const curryed = (args, arg, ...rest) => {
    if (args == null) {
      args = [arg];
    } else {
      args.push(arg);
    }
    if (!strict) {
      args.push(...rest);
    }
    if (args.length >= fn.length) {
      const ret = fn(...args);
      args = [];
      return ret;
    }
    return curryed.bind(null, args);
  }
  return curryed.bind(null, null);
}
module.exports = curry;
