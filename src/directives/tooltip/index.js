/* eslint-disable */
import Tooltip from 'tooltip.js';

/**
 * @see http://getbootstrap.com/docs/4.1/components/tooltips/
 */
const DEFAULT_OPTIONS = {
  container: false,
  delay: 0,
  html: false,
  placement: 'top',
  // selector: false,
  template: `
    <div class="tooltip" role="tooltip">
      <div class="arrow"></div>
      <div class="tooltip-inner"></div>
    </div>
  `,
  title: '',
  trigger: 'hover focus',
  offset: 0
};

export default {
  /**
   * @param {HTMLElement} el
   * @param {VNodeDirective} binding (readonly)
   * @param {VNode} vnode (readonly)
   */
  bind(el, binding, vnode) {
    let options = {};
    if (typeof binding.value === 'object') {
      options = binding.value;
    } else if (typeof binding.value === 'string') {
      options.title = binding.value;
    }

    const title = el.getAttribute('title');
    if (title) {
      el.dataset.originalTitle = title;
      el.setAttribute('title', '');
      options.title = title;
    }

    if (options.title) {

      options = Object.assign(DEFAULT_OPTIONS, options);

      const placement = options.placement;

      let arrowStyle = '';
      if (['left', 'right'].includes(placement)) {
        arrowStyle = 'top: calc(50% - 0.4rem)';
      } else if (['top', 'bottom'].includes(placement)) {
        arrowStyle = 'left: calc(50% - 0.4rem)';
      }

      if (!el._tooltip) {
        el._tooltip = new Tooltip(el, Object.assign(options, {
          template: `
          <div class="tooltip show bs-tooltip-${placement}" role="tooltip">
            <div class="arrow" style="${arrowStyle}"></div>
            <div class="tooltip-inner"></div>
          </div>
        `
        }));
      }

    }

  },
  unbind(el) {
    if (el._tooltip) {
      el._tooltip.dispose();
      delete el._tooltip;
    }
  }
};
