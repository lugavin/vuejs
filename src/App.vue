<template>
  <div id="app">
    <navbar></navbar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { Navbar, AppMain, FooterBar } from '@/components/layout';

export default {
  name: 'App',
  components: {
    Navbar,
    AppMain,
    FooterBar
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
