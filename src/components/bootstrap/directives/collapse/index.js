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
      if (!value) {
        el.classList.add('show');
      } else {
        el.classList.remove('show');
      }
    }, { immediate: true });
  }
};
