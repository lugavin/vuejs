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
