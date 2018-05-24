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

import _ from 'lodash';
import Http from '@/components/util/http';
import TokenService from '@/components/token/token.service';

Http.setup({
  // The following properties are fetch extensions
  // timeout: 1000, // => https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout(Not supported yet),
  beforeSend(options) {
    const token = TokenService.getToken();
    if (token) {
      _.merge(options, { headers: { 'x-auth-token': token } });
    }
  },
  statusCode: {
    // 200: resp => console.info(resp),
    // 400: resp => console.error(resp),
    // 401: resp => console.error(resp),
    // 403: resp => console.error(resp),
    // 404: resp => console.error(resp),
    // 500: resp => console.error(resp)
  }
});

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
