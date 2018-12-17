import { api, setToken, clearToken, getTokenFromStorage } from "../api";

export default {
  namespaced: true,
  state: {
    user: null,
    profile: null
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    // /api/user
    getUser: async function({ commit }) {
      try {
        if (getTokenFromStorage()) {
          const response = await api.get("/user");
          commit("setUser", response.data.user);
        }
      } catch (e) {
        throw e;
      }
    },
    updateUser: async function({ commit }, updatedUser) {
      try {
        if (getTokenFromStorage()) {
          const response = await api.put("/user", {
            user: updatedUser
          });

          commit("setUser", response.data.user);
        }
      } catch (e) {
        throw e;
      }
    },
    logoutUser: async function({ commit }) {
      clearToken();
      commit("setUser", null);
    },

    loginUser: async function({ commit }, { email, password }) {
      clearToken();
      try {
        const response = await api.post("/users/login", {
          user: {
            email,
            password
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);

          commit("setUser", response.data.user);
        }
      } catch (e) {
        throw e;
      }
    },
    createUser: async function({ commit }, { email, password, username }) {
      clearToken();
      try {
        const response = await api.post("/users", {
          user: {
            email,
            password,
            username
          }
        });
        if (response.data.user) {
          setToken(response.data.user.token);

          commit("setUser", response.data.user);
        }
      } catch (e) {
        throw e;
      }
    },

    async getProfile({ commit }, username) {
      const response = await api.get(`/profiles/${username}`);

      commit("setProfile", response.data.profile);
    }
  }
};
