import Vue from "nativescript-vue";
import router from './router'

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = (TNS_ENV === 'production');
Vue.config.silent = false;

Vue.prototype.$router = router;

const platformModule = require("tns-core-modules/platform");
if(platformModule.screen.mainScreen.widthPixels >platformModule.screen.mainScreen.heightPixels){ 
  Vue.prototype.$orientation = 'landscape';}
else{
  Vue.prototype.$orientation = 'portrait';
};
console.log(Vue.prototype.$orientation);

Vue.prototype.$goto = function (to, options) {
    this.$navigateTo(this.$router[to], options)
}
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);


import * as platform from 'platform';
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
