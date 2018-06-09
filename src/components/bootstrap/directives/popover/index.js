/* eslint-disable no-unused-vars */
/**
 * @see http://getbootstrap.com/docs/4.1/components/popovers/
 */
const DEFAULT_OPTIONS = {
  container: false,
  content: '',
  delay: 0,
  html: false,
  placement: 'top',
  selector: false,
  template: `
    <div class="popover" role="tooltip">
      <div class="arrow"></div>
      <h3 class="popover-header"></h3>
      <div class="popover-body"></div>
    </div>
  `,
  title: '',
  trigger: 'click',
  offset: 0
};


export default {
  /**
   * @param {HTMLElement} el
   * @param {VNodeDirective} binding (readonly)
   * @param {VNode} vnode (readonly)
   */
  bind(el, binding, vnode) {
  }
};
