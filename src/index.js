import * as components from './components';
import * as directives from './directives';

export default {
  install(Vue) {
    /* eslint-disable no-underscore-dangle */
    if (Vue._bootstrap_installed) {
      return;
    }

    // 1. add global method or property
    Object.assign(Vue, { _bootstrap_installed: true });

    // 2. add a global asset
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name]);
    });
    Object.keys(directives).forEach((name) => {
      Vue.directive(name, directives[name]);
    });

    // 3. inject some component options
    // Vue.mixin({
    //   created() {
    //   }
    // });

    // 4. add an instance method
    // Object.defineProperties(Vue.prototype, {
    //   $method() {
    //   }
    // });
  }
};
