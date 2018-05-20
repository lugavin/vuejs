import Vue from 'vue';
import Router from 'vue-router';

/**
 * module.exports = {
 *   resolve: {
 *     alias: {
 *       'vue$': 'vue/dist/vue.esm.js',
 *       '@': resolve('src'),
 *     }
 *   }
 * }
 */
import Home from '@/components/home';
import User from '@/components/modules/user';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
});
