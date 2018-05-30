/* eslint-disable no-unused-vars */

/**
 * @private
 * @param {Object} params
 * @returns {String}
 */
const serializeParams = (params = {}) => {
  const urlSearchParams = new URLSearchParams();
  Object.keys(params).forEach(name => urlSearchParams.append(name, params[name]));
  return urlSearchParams.toString();
};

/**
 * @param {Array|Object} params
 * @returns {String}
 */
const encode = (params) => {
  const parts = [];

  const addParam = (key, value) => {
    let val;
    if (typeof value === 'function') {
      val = value();
    } else {
      val = value == null ? '' : value;
    }
    parts[parts.length] = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  };

  const buildParams = (prefix, body, add) => {
    if (Array.isArray(body)) {
      body.forEach((v, i) => {
        if (/\[]$/.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(`${prefix}[${typeof v === 'object' ? i : ''}]`, v, add);
        }
      });
    } else if (typeof body === 'object') {
      Object.keys(body).forEach((key) => {
        buildParams(`${prefix}[${key}]`, body[key], add);
      });
    } else {
      add(prefix, body);
    }
  };

  // If an array was passed in, assume that it is an array of form elements.
  if (Array.isArray(params)) {
    // Serialize the form elements
    params.forEach((e) => {
      addParam(e.name, e.value);
    });
  } else {
    Object.keys(params).forEach((key) => {
      buildParams(key, params[key], addParam);
    });
  }

  return parts.join('&').replace(/%20/g, '+');
};

/**
 * @param {String} serializedParams
 * @returns {Object}
 */
const decode = (serializedParams) => {
  const digitTest = /^\d+$/;
  const keyBreaker = /([^[\]]+)|(\[\])/g;
  const plus = /\+/g;
  const paramTest = /([^?#]*)(#.*)?$/;

  if (!serializedParams || !paramTest.test(serializedParams)) {
    return {};
  }
  const data = {};
  const pairs = serializedParams.split('&');
  let current;

  for (let i = 0; i < pairs.length; i += 1) {
    current = data;
    let pair = pairs[i].split('=');

    // if we find foo=1+1=2
    if (pair.length !== 2) {
      pair = [pair[0], pair.slice(1).join('=')];
    }

    const key = decodeURIComponent(pair[0].replace(plus, ' '));
    const value = decodeURIComponent(pair[1].replace(plus, ' '));
    const parts = key.match(keyBreaker);

    for (let j = 0; j < parts.length - 1; j += 1) {
      const part = parts[j];
      if (!current[part]) {
        // if what we are pointing to looks like an array
        current[part] = digitTest.test(parts[j + 1]) || parts[j + 1] === '[]' ? [] : {};
      }
      current = current[part];
    }
    const lastPart = parts[parts.length - 1];
    if (lastPart === '[]') {
      current.push(value);
    } else {
      current[lastPart] = value;
    }
  }
  return data;
};

export { encode, decode };
