function _deepCopy(v, haveCopyedContainer, freeze = false, ) {
  switch (true) {
    case !(v instanceof Object) || v === null: {//primary type
      return v;
    }
    case v instanceof Function: {
      if (freeze) {
        v = Object.freeze(v);
      }
      return v;
    }
    case v instanceof Array: {
      if (haveCopyedContainer.has(v)) {
        return haveCopyedContainer.get(v);
      } else {
        let vCopy = v instanceof Array ? [] : {};
        haveCopyedContainer.set(v, vCopy);
        v.forEach(element => vCopy.push(_deepCopy(element, haveCopyedContainer, freeze)));
        if (freeze) {
          Object.freeze(vCopy);
        }
        return vCopy;
      }
    }
    default: {
      // v is obj
      if (haveCopyedContainer.has(v)) {
        return haveCopyedContainer.get(v);
      }
      let vCopy = {};
      haveCopyedContainer.set(v, vCopy);
      Object.keys(v).forEach(key => { vCopy[key] = _deepCopy(v[key], haveCopyedContainer, freeze); });
      if (freeze) {
        Object.freeze(vCopy);
      }
      return vCopy;
    }
  }
}

function deepCopy(v, { freeze = false } = {}) {
  return _deepCopy(v, new Map(), freeze);
}
module.exports = deepCopy;
