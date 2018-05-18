<template>
  <div id="app">
    <navbar></navbar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Navbar, AppMain, FooterBar } from './components/layout';

/**
 * @see https://cn.vuejs.org/v2/guide/custom-directive.html
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 */
Vue.directive('uibDropdown', {
  inserted(el) {
    el.addEventListener('click', () => {
      el.classList.toggle('open');
    });
  }
});

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
