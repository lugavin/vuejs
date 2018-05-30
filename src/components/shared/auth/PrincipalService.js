import Http from '@/util/Http';
// import TrackerService from '../tracker/TrackerService';

let userIdentity;
let authenticated = false;

/**
 * @param {Object} identity
 */
const authenticate = (identity) => {
  userIdentity = identity;
  authenticated = identity !== null;
};

/**
 * @returns {boolean}
 */
const isAuthenticated = () => authenticated;

/**
 * @returns {boolean}
 */
const isIdentityResolved = () => userIdentity !== undefined;

const identity = (force) => {
  if (force === true) {
    userIdentity = undefined;
  }
  if (userIdentity) {
    return Promise.resolve(userIdentity);
  }
  return Http.get('/rest/sso/account').then((response) => {
    const account = response.body;
    if (account) {
      userIdentity = account;
      authenticated = true;
      // TrackerService.connect();
    } else {
      userIdentity = null;
      authenticated = false;
    }
    return userIdentity;
  }).catch(() => {
    // TrackerService.disconnect();
    userIdentity = null;
    authenticated = false;
    return null;
  });
};

export default {
  authenticate,
  isAuthenticated,
  isIdentityResolved,
  identity
};
