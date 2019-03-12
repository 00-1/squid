import history from "../history";
import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.url + AUTH_CONFIG.callbackUrl,
    responseType: "token id_token",
    scope: "openid email profile"
  });

  auth1 = new auth0.Authentication({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.logoutRedirect = this.logoutRedirect.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.startSession = this.startSession.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
        } else if (err) {
          history.replace(AUTH_CONFIG.logoutUrl);
          console.log(err);
        }
      });
    } else {
      history.replace(AUTH_CONFIG.logoutUrl);
    }
  }

  userInfo() {
    this.auth1.userInfo(this.accessToken, (err, authResult) => {
      if (authResult) {
        this.user = authResult;
        history.replace("/");
        console.log(authResult);
      } else {
        history.replace(AUTH_CONFIG.logoutUrl);
        console.log(err);
      }
    });
  }

  getUser() {
    return this.user ? this.user : { nickname: "?" };
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    this.userInfo();
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
        history.replace(AUTH_CONFIG.logoutUrl);
      }
    });
  }

  startSession() {
    if (!this.isAuthenticated()) {
      history.replace(AUTH_CONFIG.callbackUrl);
      this.renewSession();
    }
  }

  logout() {
    // log out locally
    // use if the token is already invalid
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
  }

  logoutRedirect() {
    this.logout();

    // log out centrally
    // use if the token is still valid
    window.location.href = `${this.auth1.buildLogoutUrl()}?returnTo=${AUTH_CONFIG.url +
      AUTH_CONFIG.logoutUrl}`;
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
