import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//to be picked by webpack bundlers
import "./assets/main.css";
Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
