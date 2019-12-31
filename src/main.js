import Vue from 'vue'
import App from './App'
import {store, router, uib} from './plugins';

Vue.config.productionTip = false;

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
 * @see https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced
 */
const eventBus = new Vue();
Object.defineProperties(Vue.prototype, { // Define instance method
  $bus: {
    get() {
      return eventBus;
    }
  }
});

new Vue({
  render: h => h(App),
  store,
  router,
  uib
}).$mount('#app');
