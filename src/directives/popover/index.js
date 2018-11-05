/* eslint-disable no-unused-vars,no-underscore-dangle,no-param-reassign */
import Popover from './Popover';

const DEFAULT_OPTIONS = {
  container: false,
  html: false,
  delay: 0,
  offset: 0,
  // selector: false,
  // template: `
  //   <div class="popover" role="tooltip">
  //     <div class="arrow"></div>
  //     <h3 class="popover-header"></h3>
  //     <div class="popover-body"></div>
  //   </div>
  // `,
  placement: 'top',
  trigger: 'click',
  title: '',
  content: ''
};

export default {
  /**
   * @param {HTMLElement} el
   * @param {VNodeDirective} binding (readonly)
   * @param {VNode} vnode (readonly)
   */
  bind(el, binding, vnode) {
    const options = Object.assign(DEFAULT_OPTIONS, binding.value);
    const placement = options.placement;
    let arrowStyle = '';
    if (['left', 'right'].includes(placement)) {
      arrowStyle = 'top: calc(50% - 0.4rem)';
    } else if (['top', 'bottom'].includes(placement)) {
      arrowStyle = 'left: calc(50% - 0.4rem)';
    }
    if (!el._popover) {
      el._popover = new Popover(el, Object.assign(options, {
        template: `
          <div class="popover show bs-popover-${placement}" role="tooltip">
            <div class="arrow" style="${arrowStyle}"></div>
            <h3 class="popover-header"></h3>
            <div class="popover-body"></div>
          </div>
        `
      }));
    }
  },
  unbind(el) {
    if (el._popover) {
      el._popover.dispose();
      delete el._popover;
    }
  }
};
