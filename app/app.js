import Vue from 'nativescript-vue';
import "./app.scss";

import router from './router'

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

Vue.prototype.$router = router

Vue.prototype.$goto = function (to, options) {
    this.$navigateTo(this.$router[to], options)
}

import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
TNSFontIcon.debug = false;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css',
    'ion': './fonts/ionicons.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

import * as platform from 'platform'

new Vue({
    render: h => h('frame', [h(router['home'])])
}).$start()