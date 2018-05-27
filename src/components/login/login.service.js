/* eslint-disable max-len */
import http from '@/components/util/http';
import tokenService from '@/components/token/token.service';
import principalService from '@/components/auth/principal.service';

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

const login = ({ username, password, rememberMe }, callback) => {
  http.post('/rest/sso/account/login/1', buildSearchParams({ username, password })).then((resp) => {
    const account = resp.body;
    const token = resp.headers[TOKEN_HEADER_NAME];
    principalService.authenticate(account);
    tokenService.storeToken(token, rememberMe);
    callback(account);
  }).catch(error => console.error(error));
};

const getMenus = (callback) => {
  http.get('/rest/sso/account/menus')
    .then(resp => callback(resp.body))
    .catch(error => console.error(error));
};

export default {
  login,
  getMenus
};
