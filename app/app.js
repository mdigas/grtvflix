import Vue from "nativescript-vue";
import router from './router'

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = (TNS_ENV === 'production');
Vue.config.silent = false;

Vue.prototype.$router = router

Vue.prototype.$goto = function (to, options) {
    this.$navigateTo(this.$router[to], options)
}
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);

import * as platform from 'platform'

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
