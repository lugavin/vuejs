<template>
  <div id="app">
    <app-navbar></app-navbar>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
/**
 * export Module => import {Module} from '../module';
 * export default {} => import Module from '../module';
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
