/**
 * @param {array|object} obj
 * @returns {string}
 */
const encode = (obj) => {
  const params = [];

  const addParam = (key, value) => {
    let val;
    if (typeof value === 'function') {
      val = value();
    } else {
      val = value == null ? '' : value;
    }
    params[params.length] = `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
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
  if (Array.isArray(obj)) {
    // Serialize the form elements
    obj.forEach((e) => {
      addParam(e.name, e.value);
    });
  } else {
    Object.keys(obj).forEach((key) => {
      buildParams(key, obj[key], addParam);
    });
  }

  return params.join('&').replace(/%20/g, '+');
};

/**
 * @param {string} body
 * @returns {object}
 */
const decode = (body) => {
  const obj = {};
  body.trim().split('&').forEach((bytes) => {
    if (bytes) {
      const split = bytes.split('=');
      const name = split.shift().replace(/\+/g, ' ');
      const value = split.join('=').replace(/\+/g, ' ');
      obj[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  });
  return obj;
};

export { encode, decode };
