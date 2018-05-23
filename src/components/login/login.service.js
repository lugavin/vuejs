import http from '@/shared/http';

const login = ({ username, password }) =>
  http.post('/rest/sso/account/login/1', { username, password }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

export default {
  login
};
