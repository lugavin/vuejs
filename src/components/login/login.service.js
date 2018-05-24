/* eslint-disable max-len */
import Http from '@/components/util/http';
import TokenService from '@/components/token/token.service';

const TOKEN_HEADER_NAME = 'x-auth-token';

/**
 * POST form parameters (x-www-form-urlencoded)
 * @param {Object} params
 * @returns {URLSearchParams}
 */
const buildSearchParams = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((name) => {
    searchParams.append(name, params[name]);
  });
  return searchParams;
};

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} callback
 */
const login = ({ username, password }, callback) => {
  Http.post('/rest/sso/account/login/1', buildSearchParams({ username, password })).then((resp) => {
    TokenService.storeToken(resp.headers[TOKEN_HEADER_NAME]);
    callback(resp.body);
  }).catch(error => console.error(error));
};

const getMenus = (callback) => {
  Http.get('/rest/sso/account/menus')
    .then(resp => callback(resp.body))
    .catch(error => console.error(error));
};

export default {
  login,
  getMenus
};
