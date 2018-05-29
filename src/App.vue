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

/**
 * 注意: 不要在选项属性或回调上使用箭头函数, 因为箭头函数是和父级上下文绑定在一起的, this不会是如你所预期的Vue实例.
 * <pre>
 * // Good
 * export default {
 *   data() { return {}; }
 * };
 * // Error
 * export default {
 *   data: () => { return {}; }
 * }
 * </pre>
 */
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
