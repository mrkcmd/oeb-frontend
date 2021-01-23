import AuthService from "@/services/AuthService";

const user = JSON.parse(sessionStorage.getItem("user"));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    signup({ commit }, user) {
      return AuthService.signup(user).then(
        response => {
          commit("signupSuccess");
          return Promise.resolve(response.data);
        },
        error => {
          commit("signupFailure");
          return Promise.reject(error);
        }
      );
    },
    signin({ commit }, user) {
      return AuthService.signin(user).then(
        user => {
          commit("signinSuccess", user);
          return Promise.resolve(user);
        },
        error => {
          commit("signinFailure");
          return Promise.reject(error);
        }
      );
    },
    signout({ commit }, user) {
      AuthService.signout(user);
      commit("signout");
    },
    autologout({ commit }, user) {
      AuthService.autologout(user);
      commit("autologout");
    }
  },
  mutations: {
    signupSuccess(state) {
      state.status.loggedIn = false;
    },
    signupFailure(state) {
      state.status.loggedIn = false;
    },
    signinSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    signinFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    signout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    autologout(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  }
};
