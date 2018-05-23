<template>
  <section>
    <div class="row">
      <div class="col-sm-6">
        <div class="panel panel-primary">
          <div class="panel-body">
            前端：Vue + Vue-router + Vuex + Bootstrap + Fetch + Es6 + Webpack <br/>
            后端：CMS + SSO + OSS + SpringCloud + Redis + Elasticsearch <br/>
            服务器：Nginx(Web服务器) + Tomcat(应用服务器) <br/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import 'whatwg-fetch';
// import http from '@/shared/http';

// Just For Test
// http.get('/static/favicon.ico')
//   .then((resp) => {
//     const blob = resp.body;
//     const img = document.createElement('img');
//     img.src = URL.createObjectURL(blob);
//     img.onload = () => URL.revokeObjectURL(img.src);
//     document.getElementById('app').appendChild(img);
//   });

// Just For Test
// fetch('https://api.github.com/')
//   .then((resp) => {
//     const resolveResponseHeaders = () => {
//       const headers = {};
//       resp.headers.forEach((value, key) => {
//         headers[key] = value;
//       });
//       return headers;
//     };
//     return resp.json().then((body) => {
//       const headers = resolveResponseHeaders();
//       const result = {
//         body,
//         headers,
//         ok: resp.ok,
//         url: resp.url,
//         status: resp.status,
//         statusText: resp.statusText
//       };
//       return resp.ok ? Promise.resolve(result) : Promise.reject(result);
//     });
//   })
//   .then((resp) => {
//     const { current_user_url: currUserUrl } = resp.body;
//     console.info(`current_user_url => ${currUserUrl}`);
//   })
//   .catch(error => console.error(error));

export default {
  data() {
    return {
      msg: 'Welcome to VueJS App'
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
