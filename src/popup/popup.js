import Vue from "vue";
import browser from "webextension-polyfill";
import App from "./App";

global.browser = browser;
Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: (h) => h(App),
});
