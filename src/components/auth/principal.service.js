import http from '@/components/util/http';
// import trackerService from '@/components/tracker/tracker.service';

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

const identity = (force = false) => {
  if (force === true) {
    userIdentity = undefined;
  }
  if (userIdentity) {
    return Promise.resolve(userIdentity);
  }
  return http.get('/rest/sso/account').then((response) => {
    const account = response.body;
    if (account) {
      userIdentity = account;
      authenticated = true;
      // trackerService.connect();
    } else {
      userIdentity = null;
      authenticated = false;
    }
    return userIdentity;
  }).catch(() => {
    // trackerService.disconnect();
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
