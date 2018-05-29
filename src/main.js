// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

/**
 * Create a simple global event bus to communicate between vue components
 * <pre>
 * // this.$bus.$emit('my-event', [data]);
 * export default {
 *   created() {
 *     this.$bus.$on('my-event', this.handleMyEvent);
 *   },
 *   beforeDestroy() {
 *     this.$bus.$off('my-event', this.handleMyEvent);
 *   }
 * }
 * </pre>
 * @see https://vuex.vuejs.org/
 * @see https://github.com/yangmingshan/vue-bus
 */
const eventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return eventBus;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
