import { api } from "../api";

export default {
  namespaced: true,
  state: {
    feed: [],
    count: 0,
    article: null,
    comments: []
  },
  getters: {
    username(state) {
      return (state.user && state.user.username) || null;
    },
    article(state) {
      return state.article;
    }
  },
  mutations: {
    setArticles(state, { articles, articlesCount }) {
      state.feed = articles;
      state.count = articlesCount;
    },
    setCurrentArticle(state, article) {
      state.article = article;
    },
    setComments(state, comments) {
      state.comments = comments;
    }
  },
  actions: {
    async getGlobalFeed({ commit }, payload) {
      let route = "/articles";
      if (payload) {
        const {
          tag = null,
          author = null,
          faourited = null,
          page = 1
        } = payload; //initialize variables from payload.
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
        route += tag ? `&tag=${tag}` : "";
        route += author ? `&author=${author}` : "";
        route += faourited ? `&faourited=${faourited}` : "";
      }
      const response = await api.get(route);
      commit("setArticles", response.data);
    },
    async getUserFeed({ commit }, payload = { page: 1 }) {
      let route = "/articles/feed";
      if (payload) {
        const { page = 1 } = payload; //initialize variables from payload.
        route += page ? `?offset=${(page - 1) * 10}&limit=10` : "";
      }
      const response = await api.get(route);

      commit("setArticles", response.data);
    },
    async getCurrentArticle({ commit }, { slug }) {
      const response = await api.get(`/articles/${slug}`);

      commit("setCurrentArticle", response.data.article);
    },
    async getComments({ commit }, { slug }) {
      const commentResponse = await api.get(`/articles/${slug}/comments`);

      commit("setComments", commentResponse.data.comments);
    },
    async createArticle({ commit }, article) {
      const response = await api.post("/articles", { article: article });
      commit("setCurrentArticle", response.data.article);
      return response;
    },
    async updateArticle({ commit }, article) {
      const response = await api.put(`/articles/${article.slug}`, article);
      commit("setCurrentArticle", response.data.article);
      return response;
    },
    async removeArticle({ commit }, slug) {
      await api.delete(`/articles/${slug}`);
      commit("setCurrentArticle", null);
    },
    async postComment({ commit, state }, payload) {
      var response = await api.post(`/articles/${payload.slug}/comments`, {
        comment: { body: payload.comment }
      });
      commit("setComments", state.comments);
      return response;
    },
    async getTags() {
      return await api.get("/tags");
    }
  }
};
