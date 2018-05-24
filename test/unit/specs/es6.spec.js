/**
 * @see https://vue-test-utils.vuejs.org
 * @see https://github.com/vuejs/vue-test-utils-jest-example
 */
test('object assignment', () => {
  const obj = { id: 101 };
  Object.assign(obj, { name: 'admin' });
  expect(obj).toEqual({ id: 101, name: 'admin' });
});

test('object map', () => {
  const obj = { amount: 100 };
  Object.keys(obj).map((k) => {
    obj[k] += 100;
    return obj;
  });
  expect(obj).toEqual({ amount: 200 });
});

describe('fetch', () => {
  it('fetch request', () => {
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
});
