<template>
  <div id="app">
    <app-navbar></app-navbar>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
/**
 * export default ...;
 * // => import defaultExport from 'module-name';
 * export { name1, name2 };
 * // => import { name1, name2 } from 'module-name';
 */
import { AppNavbar, AppMain, AppFooter } from '@/components/layout';

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppMain,
    AppFooter
  }
};
</script>

<style lang="scss">
@import "~animate.css";

$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome";

$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
</style>
