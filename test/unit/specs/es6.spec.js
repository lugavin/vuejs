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

test('assert object type', () => {
  expect(Object.prototype.toString.call(JSON.parse)).toEqual('[object Function]');
  expect(Object.prototype.toString.call({})).toEqual('[object Object]');
  expect(Object.prototype.toString.call([])).toEqual('[object Array]');
  expect(Object.prototype.toString.call(new Date())).toEqual('[object Date]');
  expect(Object.prototype.toString.call(JSON.parse('{ "key": "value" }'))).toEqual('[object Object]');
  expect(Object.prototype.toString.call(JSON.stringify({ key: 'value' }))).toEqual('[object String]');
});
