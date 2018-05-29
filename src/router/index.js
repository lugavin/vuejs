import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/home',
      component: () => import('../components/home')
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
