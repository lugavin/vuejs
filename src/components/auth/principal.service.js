import Http from '@/components/util/http';
// import TrackerService from '@/components/tracker/tracker.service';

let userIdentity;
let authenticated = false;

const resolveMenus = (menus = []) => {
  const [idKey, pidKey, rootPid] = ['id', 'parentId', null];
  const group = (items = []) => {
    const itemMap = {};
    items.forEach((item) => {
      const pid = item[pidKey] || rootPid;
      if (!itemMap[pid]) {
        itemMap[pid] = [];
      }
      itemMap[pid].push(item);
    });
    return itemMap;
  };
  const menuMap = group(menus);
  const build = (items = []) => {
    if (items.length > 0) {
      items.forEach((item) => {
        const children = build(menuMap[item[idKey]]);
        if (children && children.length > 0) {
          Object.assign(item, { children });
        }
      });
    }
    return items;
  };
  const topMenus = menuMap[rootPid];
  return build(topMenus);
};

/**
 * @param {Object} identity
 */
const authenticate = (identity) => {
  if (identity !== null && identity.menus.length > 0) {
    const menus = resolveMenus(identity.menus);
    Object.assign(identity, { menus });
  }
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
    authenticate(response.body);
    // if (userIdentity) {
    //   trackerService.connect();
    // }
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
