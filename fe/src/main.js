// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import io from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
import jQuery from 'jquery';
import jQueryUi from 'jquery-ui-dist/jquery-ui.js';

// bootstrap jquery ui
window.jQuery = jQuery;
window.$ = window.jQuery;
window.$ = $.extend(jQueryUi)

Vue.config.productionTip = false

import './assets/sass/main.scss'

// Vue.use(VueSocketio, io('http://games.reliacode.com:8085', { path: '/cards/socket.io'}));
Vue.use(VueSocketio, io('http://127.0.0.1:3001', { path: '/cards/socket.io'}));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
