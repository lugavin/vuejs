/*!
 * mode
 * - hash: 即URL中的#符号(此hash不是密码学中的散列运算), 比如 http://localhost/#/home 的hash值为#/home,
 *         它的特点是hash虽然出现在URL中, 但不会被包括在HTTP请求中, 对后端完全没影响, 因此改变hash不会重新加载页面.
 * - history: 利用了HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法.
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/History
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { path: '/home', component: () => import('../components/home') },
    { path: '/', redirect: '/home' }
  ]
});
