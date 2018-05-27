// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuelidate from 'vuelidate';

import Http from '@/components/util/http';
import TokenService from '@/components/token/token.service';

import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Http.setup({
  // The following properties are fetch extensions
  // timeout: 1000, // => https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/timeout(Not supported yet),
  beforeSend(options) {
    const token = TokenService.getToken();
    if (token) {
      const headers = options.headers || {};
      Object.assign(headers, { 'x-auth-token': token });
      Object.assign(options, { headers });
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
