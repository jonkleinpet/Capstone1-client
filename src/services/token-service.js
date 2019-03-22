import config from '../config';

const tokenService = {

  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!tokenService.getAuthToken();
  },

  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },

  isAdmin() {
    const token = Buffer.from(
      window.localStorage.getItem(config.TOKEN_KEY),
      "base64"
    ).toString("utf8");
    return token.includes('true');
  }

}

export default tokenService;