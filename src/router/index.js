import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/home';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
});
// router.addRoutes([
//   {
//     path: '/users',
//     component: User
//   }
// ]);

export default router;
