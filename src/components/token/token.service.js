const TOKEN_STORE_KEY = 'x-auth-token';

export default {
  storeToken(token, rememberMe = true) {
    if (rememberMe) {
      localStorage.setItem(TOKEN_STORE_KEY, token);
    } else {
      sessionStorage.setItem(TOKEN_STORE_KEY, token);
    }
  },
  getToken() {
    return localStorage.getItem(TOKEN_STORE_KEY) || sessionStorage.getItem(TOKEN_STORE_KEY);
  }
};
