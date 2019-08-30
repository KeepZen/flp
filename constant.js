const deepCopy = require('./deep-copy');

const constant = (value) => {
  const copy = deepCopy(value, { freeze: true });
  return () => copy;
}
module.exports = constant;
