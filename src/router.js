import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //dynamic import style.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Login.vue")
    },
    {
      path: "/register",
      name: "register",

      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Register.vue")
    },
    {
      path: "/settings",
      name: "settings",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Setting.vue")
    },
    {
      path: "/profile/:username",
      name: "profile",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Profile.vue")
    },
    {
      path: "/article/:articleslug",
      name: "article",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Article.vue")
    },
    {
      path: "/editor",
      name: "editor_new",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/ArticleCreate.vue")
    },
    {
      path: "/editor/:articleslug",
      name: "editor_existing",
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/ArticleEdit.vue")
    }
  ]
});
