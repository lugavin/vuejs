<template>
  <div id="app">
    <app-header class="app-header"></app-header>
    <app-main class="app-main"></app-main>
    <app-footer class="app-footer"></app-footer>
  </div>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from './components/layout';

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter
  }
};
</script>

<!--
vue-html-loader and css-loader translates non-root URLs to relative paths.
In order to treat it like a module path, prefix it with ~
Ref => https://github.com/vuejs/vue-loader/issues/193
-->
<style lang="scss">
/*@import "~animate.css";*/
/*@import 'nprogress/nprogress.css';*/

$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome";
@import "~bootstrap/scss/bootstrap";

html {
  position: relative;
  min-height: 100%;
}

/* Move down(up) content because we have a fixed navbar that is 3.5rem tall */
body {
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
}

.app-header {
}

.app-main {
}

/* Attach a footer to the bottom of the viewport when page content is short. */
.app-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  background-color: #2d343a;
}
</style>
