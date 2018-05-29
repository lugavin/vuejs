/* eslint-disable no-unused-vars,max-len */
import Http from '@/components/util/http';
import PrincipalService from '@/components/auth/principal.service';

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
  Http.post('/rest/sso/account/login/1', buildSearchParams({ username, password })).then((resp) => {
    const account = resp.body;
    PrincipalService.authenticate(account);
    callback(account);
  }).catch(error => console.error(error));
};

export default {
  login
};
