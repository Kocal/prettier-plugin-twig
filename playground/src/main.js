import Vue from "vue";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueCodemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/twig/twig.js";
import "codemirror/addon/display/rulers.js";

import App from "./App.vue";
import store from './store'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueCodemirror);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
