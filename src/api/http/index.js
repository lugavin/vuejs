/* eslint-disable no-unused-vars,max-len */
/*!
 * Fetch API 与 $.ajax 的主要区别:
 * (1)当接收到一个代表错误的HTTP状态码时, 从fetch()返回的Promise不会被标记为reject, 即使该HTTP响应的状态码是4xx或5xx.
 *    相反, 它会将Promise状态标记为resolve(但是会将resolve的返回值的ok属性设置为false), 仅当网络故障时或请求被阻止时, 才会标记为reject.
 * (2)默认情况下, fetch不会从服务端发送或接收任何cookies, 如果站点依赖于用户session, 则会导致未经认证的请求(要发送cookies必须设置credentials选项).
 * @see https://github.github.io/fetch/
 * @see https://github.com/axios/axios#interceptors
 */
import 'whatwg-fetch';
import _ from 'lodash';

const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

const MEDIA_TYPE = {
  TEXT_HTML: 'text/html',
  TEXT_PLAIN: 'text/plain',
  TEXT_XML: 'text/xml',
  APPLICATION_JSON: 'application/json',
  APPLICATION_JSON_UTF8: 'application/json;charset=UTF-8',
  APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  APPLICATION_XML: 'application/xml',
  APPLICATION_XHTML_XML: 'application/xhtml+xml',
  APPLICATION_OCTET_STREAM: 'application/octet-stream',
  MULTIPART_FORM_DATA: 'multipart/form-data'
};

/**
 * @see https://github.github.io/fetch/
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Response
 */
const RESPONSE_TYPE = {
  JSON: 'json',
  TEXT: 'text',
  FORM_DATA: 'formData',
  BLOB: 'blob',
  ARRAY_BUFFER: 'arrayBuffer'
};

const DEFAULTS = {
  headers: {
    'Content-Type': MEDIA_TYPE.APPLICATION_JSON
  }
};

/**
 * @param {array|object} obj
 * @returns {string}
 */
const encodeURLParam = (obj) => {
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
const decodeURLParam = (body) => {
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

/**
 * Error {@link fetch#Response}
 * If there is a network error or another reason why the HTTP request couldn't be fulfilled,
 * the fetch() promise will be rejected with a reference to that error.
 * Note that the promise won't be rejected in case of HTTP 4xx or 5xx server responses.
 * The promise will be resolved just as it would be for HTTP 2xx. Inspect the
 * response.status number within the resolved callback to add conditional handling of server errors to your code.
 *
 * @param response
 * @returns {object}
 * @see https://github.github.io/fetch/
 */
const errorHandler = (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const resolveResponseType = type => RESPONSE_TYPE[String(type)] || RESPONSE_TYPE.JSON;

/**
 * ```
 * let {headers, body, params, ...options} = {headers: {Accept: 'text/plain'}, method: 'GET'};
 * console.info(headers) => {Accept: 'text/plain'}
 * console.info(body) => undefined
 * console.info(params) => undefined
 * console.info(options) => {method: "GET"}
 * ```
 * @param {string} url
 * @param {object=} headers
 * @param {(string|object)=} body
 * @param {(string|object)=} params
 * @param {object=} options
 * @returns {*[]}
 */
const merge = (url, { headers, body, params, ...options }) => {
  const opts = _.merge(DEFAULTS, options, { headers });
  if (body) {
    if (typeof body === 'object') {
      switch (opts.headers['Content-Type']) {
        case MEDIA_TYPE.APPLICATION_JSON:
          opts.body = JSON.stringify(body);
          break;
        case MEDIA_TYPE.APPLICATION_FORM_URLENCODED:
          opts.body = encodeURLParam(body);
          break;
        default:
          break;
      }
    } else {
      opts.body = body;
    }
  }
  let req = url;
  let args = params;
  if (args) {
    if (typeof args === 'object') {
      args = encodeURLParam(args);
    }
    if (url.indexOf('?') !== -1) {
      req += `&${args}`;
    } else {
      req += `?${args}`;
    }
  }
  return [req, opts];
};

/**
 * fetch config
 * - method {string} : HTTP method (e.g. 'GET', 'POST', etc).
 * - headers {string|object|Headers} : Any headers you want to add to your request.
 * - body {string|Body types} : Any body that you want to add to your request, this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object.
 *                              Note that a request using the GET or HEAD method cannot have a body.
 *                              Body types:
 *                              Class            Default Content-Type
 *                              -----------------------------------------------------------------
 *                              String           text/plain;charset=UTF-8
 *                              URLSearchParams  application/x-www-form-urlencoded;charset=UTF-8
 *                              FormData         multipart/form-data
 *                              Blob             inherited from the blob.type property
 *                              ArrayBuffer
 *                              TypedArray
 *                              DataView
 * - mode {string} : The mode you want to use for the request (e.g. cors, no-cors, or same-origin).
 * - credentials {string} : The request credentials you want to use for the request (e.g. omit, same-origin, or include),
 *                          To automatically send cookies for the current domain, this option must be provided.
 * - cache {string} : The cache mode you want to use for the request (e.g. default, no-store, reload, no-cache, force-cache, or only-if-cached).
 * - redirect {string} : The redirect mode to use, follow (automatically follow redirects), error (abort with an error if a redirect occurs), or manual (handle redirects manually).
 * - referrer {string} : A USVString specifying no-referrer, client, or a URL. The default is client.
 * - referrerPolicy {string} : Specifies the value of the referer HTTP header. May be one of no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, unsafe-url.
 * - integrity {string} : Contains the subresource integrity value of the request.
 *
 * @param {String|Request} url
 * @param {Object=} options
 * @returns {Promise<any>}
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */
const doRequest = (url, options = {}) => {
  const [req, opts] = merge(url, options);
  return fetch(req, opts)
    .then(response => errorHandler(response))
    .then(response => response[resolveResponseType(opts.responseType)]())
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const doGet = (url, options = {}) => doRequest(url, _.merge(options, { method: REQUEST_METHOD.GET }));
const doPost = (url, data, options = {}) => doRequest(url, _.merge(options, { method: REQUEST_METHOD.POST, body: data }));
const doPut = (url, data, options = {}) => doRequest(url, _.merge(options, { method: REQUEST_METHOD.PUT, body: data }));
const doPatch = (url, data, options = {}) => doRequest(url, _.merge(options, { method: REQUEST_METHOD.PATCH, body: data }));
const doDelete = (url, options = {}) => doRequest(url, _.merge(options, { method: REQUEST_METHOD.DELETE }));

export default { request: doRequest, get: doGet, post: doPost, put: doPut, patch: doPatch, delete: doDelete };
