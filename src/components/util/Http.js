/* eslint-disable no-unused-vars,max-len */
/*!
 * Fetch API 与 $.ajax 的主要区别:
 * (1)当接收到一个代表错误的HTTP状态码时, 从fetch()返回的Promise不会被标记为reject, 即使该HTTP响应的状态码是4xx或5xx.
 *    相反, 它会将Promise状态标记为resolve(但是会将resolve的返回值的ok属性设置为false), 仅当网络故障时或请求被阻止时, 才会标记为reject.
 * (2)默认情况下, fetch不会从服务端发送或接收任何cookies, 如果站点依赖于用户session, 则会导致未经认证的请求(要发送cookies必须设置credentials选项).
 * Http和缓存相关的状态码
 * - 200 OK (from cache) => 浏览器没有跟服务器确认, 直接使用本地缓存
 * - 304 Not Modified => 先请求服务器(服务器响应这个资源没有改变), 然后浏览器再使用本地缓存
 */
import 'whatwg-fetch';
import _ from 'lodash';
// import * as NProgress from 'nprogress';
import { encode } from './URL';

const REQUEST_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD'
};

const MEDIA_TYPE = {
  ALL: '*/*',
  TEXT_XML: 'text/xml',
  TEXT_HTML: 'text/html',
  TEXT_PLAIN: 'text/plain',
  APPLICATION_JSON: 'application/json',
  APPLICATION_JSON_UTF8: 'application/json;charset=UTF-8',
  APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  APPLICATION_FORM_URLENCODED_UTF8: 'application/x-www-form-urlencoded;charset=UTF-8',
  APPLICATION_XML: 'application/xml',
  APPLICATION_XHTML_XML: 'application/xhtml+xml',
  APPLICATION_OCTET_STREAM: 'application/octet-stream',
  MULTIPART_FORM_DATA: 'multipart/form-data'
};

/**
 * the default setting, override it if necessary.
 * ```
 * headers: {
 *   'Accept': `${MEDIA_TYPE.APPLICATION_JSON}, ${MEDIA_TYPE.TEXT_PLAIN}, ${MEDIA_TYPE.ALL}`,
 *   'Content-Type': MEDIA_TYPE.APPLICATION_JSON
 * }
 * ```
 */
const defaults = {
  method: REQUEST_METHOD.GET,
  headers: {
    Accept: `${MEDIA_TYPE.APPLICATION_JSON}, ${MEDIA_TYPE.TEXT_PLAIN}, ${MEDIA_TYPE.ALL}`
  },
  credentials: 'same-origin' // omit(从不发送cookies) same-origin(同源才发送cookies) include(总是发送cookies)
};

/**
 * Set global config used for override the default global settings.
 * ```
 * // Merge objects
 * const defs = {headers: {'Accept': 'text/plain','Content-Type': 'application/json'}};
 * const opts = {headers: {'Content-Type': 'application/xml'}};
 * // Shallow copy: Object.assign({}, defs, opts) => {headers: {'Content-Type': 'application/xml'}}
 * // Deep copy: _.merge({}, defs, opts) => {headers: {'Accept': 'text/plain','Content-Type': 'application/xml'}}
 * ```
 * @param {Object} config
 */
const setup = (config = {}) => {
  _.merge(defaults, config);
};

/**
 * If there is a network error or another reason why the HTTP request couldn't be fulfilled,
 * the fetch() promise will be rejected with a reference to that error.
 * Note that the promise won't be rejected in case of HTTP 4xx or 5xx server responses. The promise will be resolved just as it would be for HTTP 2xx.
 * Inspect the response.status number within the resolved callback to add conditional handling of server errors to your code.
 *
 * @private
 * @param {Object} response
 * @param {Object} options
 * @returns {Promise<Response>}
 */
const handleResponse = (response, options = {}) => {
  const resolveResponseType = () => {
    const responseType = response.headers.get('Content-Type');
    if (!responseType) {
      return Promise.resolve();
    }
    if (responseType.includes('json')) {
      return response.json();
    }
    if (responseType.includes('text')) {
      return response.text();
    }
    if (responseType.includes('image')) {
      return response.blob();
    }
    // Need to check for formData and arrayBuffer response type
    throw new Error(`Unsupported Content-Type [${responseType}]`);
  };
  const resolveResponseHeaders = () => {
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return headers;
  };
  // NProgress.start();
  return resolveResponseType().then((body) => {
    const headers = resolveResponseHeaders();
    const result = {
      body,
      headers,
      ok: response.ok,
      url: response.url,
      status: response.status,
      statusText: response.statusText
    };
    // NProgress.done();
    // Promise.resolve(value|promise|thenable): pending => resolved
    // Promise.reject(reason): pending => rejected
    return response.ok ? Promise.resolve(result) : Promise.reject(result);
  });
};

/**
 * ```
 * // Spread syntax
 * let {headers, body, params, ...options} = {headers: {Accept: 'text/plain'}, method: 'GET'};
 * console.info(headers) => {Accept: 'text/plain'}
 * console.info(body) => undefined
 * console.info(params) => undefined
 * console.info(options) => {method: 'GET'}
 * ```
 * @private
 * @param {String} url
 * @param {Object=} headers
 * @param {(String|Object)} body
 * @param {(String|Object)} params
 * @param {Object=} options
 * @returns {[String,Object]}
 */
const merge = (url, { headers, body, params, ...options }) => {
  const opts = _.merge({}, defaults, { headers, ...options });
  if (body) {
    if (_.isPlainObject(body)) {
      const contentType = opts.headers['Content-Type'];
      if (contentType) {
        if (contentType.includes(MEDIA_TYPE.APPLICATION_JSON)) {
          opts.body = JSON.stringify(body);
        } else if (contentType.includes(MEDIA_TYPE.APPLICATION_FORM_URLENCODED)) {
          opts.body = encode(body);
        }
      } else {
        // Default Content-Type => application/json;charset=UTF-8
        // Ref => https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
        opts.body = new Blob([JSON.stringify(body)], { type: MEDIA_TYPE.APPLICATION_JSON_UTF8 });
      }
    } else {
      opts.body = body;
    }
  }
  let [baseURL, serializedParams] = [url, params];
  if (serializedParams) {
    if (_.isPlainObject(serializedParams)) {
      serializedParams = encode(serializedParams);
    }
    if (_.isString(serializedParams) && _.trim(serializedParams).length > 0) {
      baseURL += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
  }
  return [baseURL, opts];
};

/**
 * // These properties are part of the Fetch Standard
 * - method {String} : HTTP method (e.g. 'GET', 'POST', etc).
 * - headers {String|Object|Headers} : Any headers you want to add to your request.
 * - body {String|BodyTypes} : Any body that you want to add to your request, this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object.
 *                             Note that a request using the GET or HEAD method cannot have a body.
 *                             Body Types       Default Content-Type
 *                             -----------------------------------------------------------------
 *                             String           text/plain;charset=UTF-8
 *                             URLSearchParams  application/x-www-form-urlencoded;charset=UTF-8
 *                             FormData         multipart/form-data
 *                             Blob             inherited from the blob.type property
 *                             ArrayBuffer
 *                             TypedArray
 *                             DataView
 * - mode {String} : The mode you want to use for the request (e.g. cors, no-cors, or same-origin).
 * - credentials {String} : The request credentials you want to use for the request (e.g. omit, same-origin, or include),
 *                          To automatically send cookies for the current domain, this option must be provided.
 * - cache {String} : The cache mode you want to use for the request (e.g. default, no-store, reload, no-cache, force-cache, or only-if-cached).
 * - redirect {String} : The redirect mode to use, follow (automatically follow redirects), error (abort with an error if a redirect occurs), or manual (handle redirects manually).
 * - referrer {String} : A USVString specifying no-referrer, client, or a URL. The default is client.
 * - referrerPolicy {String} : Specifies the value of the referer HTTP header. May be one of no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, unsafe-url.
 * - integrity {String} : Contains the subresource integrity value of the request.
 * // The following properties are fetch extensions
 * - params {String|Object} : Map of strings or objects which will be serialized with the paramSerializer and appended as GET parameters.
 *
 * @param {String} url
 * @param {Object=} options
 * @returns {Promise<Response>}
 *
 * @see https://github.com/github/fetch/
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Request
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Response
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */
const doRequest = (url, options = {}) => {
  const [baseURL, settings] = merge(url, options);
  return fetch(baseURL, settings).then(response => handleResponse(response, settings));
};

const doGet = (url, options = {}) => doRequest(url, Object.assign(options, {
  method: REQUEST_METHOD.GET
}));

const doPost = (url, data, options = {}) => doRequest(url, Object.assign(options, {
  method: REQUEST_METHOD.POST,
  body: data
}));

const doPut = (url, data, options = {}) => doRequest(url, Object.assign(options, {
  method: REQUEST_METHOD.PUT,
  body: data
}));

const doPatch = (url, data, options = {}) => doRequest(url, Object.assign(options, {
  method: REQUEST_METHOD.PATCH,
  body: data
}));

const doDelete = (url, options = {}) => doRequest(url, Object.assign(options, {
  method: REQUEST_METHOD.DELETE
}));

const doHead = (url, options = {}) => doRequest(url, Object.assign(options, {
  method: REQUEST_METHOD.HEAD
}));

export default {
  setup,
  request: doRequest,
  get: doGet,
  post: doPost,
  put: doPut,
  patch: doPatch,
  delete: doDelete,
  head: doHead
};
