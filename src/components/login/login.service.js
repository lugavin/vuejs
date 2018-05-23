import http from '@/shared/http';

const TOKEN_HEADER_NAME = 'x-auth-token';

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} callback
 */
const login = ({ username, password }, callback) => {
  http.post('/rest/sso/account/login/1', { username, password }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((resp) => {
    const token = resp.headers[TOKEN_HEADER_NAME];
    localStorage.setItem(TOKEN_HEADER_NAME, token);
    callback(resp.body);
  }).catch(error => console.error(error));
};

const getMenus = (callback) => {
  const token = localStorage.getItem(TOKEN_HEADER_NAME);
  http.get('/rest/sso/account/menus', {
    headers: { 'x-auth-token': token }
  }).then(resp => callback(resp.body))
    .catch(error => console.error(error));
};

export default {
  login,
  getMenus
};
