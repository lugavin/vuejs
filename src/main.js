/**
 * The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 * <pre>
 * export default ...;
 * // => import defaultExport from 'module-name';
 * export { name1, name2 };
 * // => import { name1, name2 } from 'module-name';
 * </pre>
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
 */
import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from './App';
import router from './router';

/**
 * @see https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
 */
// router.beforeEach((to, from, next) => {
// });

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

Vue.use(Vuelidate);
Vue.config.productionTip = false;

/**
 * @see https://cn.vuejs.org/v2/api/#Vue-extend
 */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app');
