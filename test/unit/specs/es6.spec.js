/**
 * @see https://vue-test-utils.vuejs.org
 * @see https://github.com/vuejs/vue-test-utils-jest-example
 */
// import 'whatwg-fetch';
// import http from '@/shared/http';

test('object assignment', () => {
  const data = { id: 101 };
  Object.assign(data, { name: 'admin' });
  expect(data).toEqual({ id: 101, name: 'admin' });
});

// fetch('https://api.github.com/')
//   .then(resp => (resp.ok ? Promise.resolve(resp) : Promise.reject(resp)))
//   .then(resp => resp.json())
//   .then((data) => {
//     const { current_user_url: currUserUrl } = data;
//     console.info(`current_user_url => ${currUserUrl}`);
//   })
//   .catch(error => console.error(error));

// http.get('https://api.github.com/')
//   .then((data) => {
//     const { current_user_url: currUserUrl } = data;
//     console.info(`current_user_url => ${currUserUrl}`);
//   })
//   .catch(error => console.error(error));
