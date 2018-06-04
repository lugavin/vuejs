/* eslint-disable no-unused-vars,no-param-reassign */
const template = `
  <div class="tooltip" role="tooltip">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner"></div>
  </div>
`;

const genUID = (prefix) => {
  do {
    // eslint-disable-next-line no-bitwise
    prefix += ~~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix));
  return prefix;
};

const createElement = (tmpl) => {
  const elements = [];
  const wrap = document.createElement('div');
  wrap.innerHTML = tmpl;
  const nodeList = wrap.childNodes;
  for (let i = 0; i < nodeList.length; i += 1) {
    if (nodeList[i].nodeType === Node.ELEMENT_NODE) {
      elements.push(nodeList[i]);
    }
  }
  return elements;
};

export const options = {
  placement: 'top',
  triggers: 'hover',
  container: 'body'
};

export default {
  /**
   * @param {HTMLElement} el
   * @param {VNodeDirective} binding (readonly)
   * @param {VNode} vnode (readonly)
   */
  bind(el, binding, vnode) {
    el.addEventListener('mouseenter', () => {
      const title = el.getAttribute('title');
      if (title) {
        Object.assign(el.dataset, { originalTitle: el.getAttribute('title') });
        el.setAttribute('title', '');
        const container = document.querySelector(options.container);
        createElement(template).forEach((element) => {
          container.appendChild(element);
        });
      }
    });
    el.addEventListener('mouseleave', () => {
    });
  }
};
