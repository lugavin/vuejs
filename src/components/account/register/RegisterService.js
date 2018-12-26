import Http from '@/components/util/Http';

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

const registerAccount = ({ username, email, password }) =>
  Http.post('/api/auth/account/register', buildSearchParams({ username, email, password }));

export default {
  registerAccount
};
