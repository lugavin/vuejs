<template>
  <div id="app">
    <app-navbar></app-navbar>
    <app-main></app-main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { AppNavbar, AppMain, AppFooter } from './components/layout';

export default {
  components: { AppNavbar, AppMain, AppFooter }
};
</script>

<!--
vue-html-loader and css-loader translates non-root URLs to relative paths.
In order to treat it like a module path, prefix it with ~
Ref => https://github.com/vuejs/vue-loader/issues/193
-->
<style lang="scss">
@import "~animate.css";
/*@import 'nprogress/nprogress.css';*/

$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome";

$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
</style>
