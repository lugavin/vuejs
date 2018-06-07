/* eslint-disable no-unused-vars,max-len */
import Http from '@/components/util/Http';
import PrincipalService from '../auth/PrincipalService';

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

const login = ({ username, password, rememberMe = true }) =>
  Http.post('/rest/sso/account/login/1', buildSearchParams({ username, password }))
    .then((resp) => {
      const account = resp.body;
      PrincipalService.authenticate(account);
      return account;
    });

const logout = () =>
  Http.get('/rest/sso/account/logout')
    .then(() => PrincipalService.authenticate(null));

export default {
  login,
  logout
};
