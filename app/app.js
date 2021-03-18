import Vue from "nativescript-vue";
import router from './router'

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = (TNS_ENV === 'production');
Vue.config.silent = false;

// Manual Router 
Vue.prototype.$router = router;
Vue.prototype.$goto = function (to, options) {
  this.$navigateTo(this.$router[to], options)
}

// SideBar
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);

// Layout change on orientation change
import * as platform from 'platform';
if(platform.Screen.mainScreen.widthPixels > platform.Screen.mainScreen.heightPixels){ 
  Vue.prototype.$orientation = 'landscape';}
else{
  Vue.prototype.$orientation = 'portrait';
};

// Download Manager
var Downloader = require('nativescript-downloader').Downloader;
Downloader.init();
Vue.prototype.$Downloader = new Downloader();


import * as app from "tns-core-modules/application";
app.on('orientationChanged', (evt) => {
  console.log(evt.newValue); //landscape or portrait
  Vue.prototype.$orientation = evt.newValue;
});

new Vue({
    render (h) {
        return h(
          router['App'],
          [
            h(router['DrawerContent'], { slot: 'drawerContent' }),
            h(router['Home'], { slot: 'mainContent' })
          ]
        )
      }
  }).$start();
