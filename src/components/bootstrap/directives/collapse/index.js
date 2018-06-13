export default {
  /**
   * @param {HTMLElement} el
   * @param {VNodeDirective} binding (readonly)
   * @param {VNode} vnode (readonly)
   * @see https://cn.vuejs.org/v2/api/index.html#vm-watch
   */
  bind(el, binding, vnode) {
    el.classList.add('collapse');
    vnode.context.$watch(binding.expression, (value) => {
      // eslint-disable-next-line no-unused-expressions
      value ? el.classList.remove('show') : el.classList.add('show');
    }, { immediate: true });
  }
};
