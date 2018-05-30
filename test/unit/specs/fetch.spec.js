/**
 * @see https://github.com/axios/axios/
 * @see https://github.com/github/fetch/
 */
import 'whatwg-fetch';
import Http from '@/components/util/Http';

test('Fetch GET', () => {
  fetch('https://api.github.com/')
    .then((resp) => {
      const resolveResponseHeaders = () => {
        const headers = {};
        resp.headers.forEach((value, key) => {
          headers[key] = value;
        });
        return headers;
      };
      return resp.json().then((body) => {
        const headers = resolveResponseHeaders();
        const result = {
          body,
          headers,
          ok: resp.ok,
          url: resp.url,
          status: resp.status,
          statusText: resp.statusText
        };
        return resp.ok ? Promise.resolve(result) : Promise.reject(result);
      });
    })
    .then((resp) => {
      const { current_user_url: currUserUrl } = resp.body;
      console.info(`current_user_url => ${currUserUrl}`);
    })
    .catch(error => console.error(error));
});

test('Http GET', () => {
  Http.get('/static/favicon.ico')
    .then((resp) => {
      const blob = resp.body;
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      img.onload = () => URL.revokeObjectURL(img.src);
      document.getElementById('app').appendChild(img);
    });
});
