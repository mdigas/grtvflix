import Vue from 'nativescript-vue';

import RadListView from 'nativescript-ui-listview/vue';

Vue.use(RadListView);

import router from './router'

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;
//Vue.prototype.$http = "http://10.184.4.60:8000/";
//Vue.prototype.$token = "Token c6606ccdd59abb7b007b12d2f2ecf70a14656417";

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

Vue.registerElement('CardView', () => require('nativescript-cardview').CardView);

Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);


new Vue({
    render: h => h('frame', [h(router['home'])])
}).$start()

