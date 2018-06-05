/* eslint-disable no-unused-vars,max-len */
/**
 * @see https://caniuse.com/#feat=form-validation
 * @see https://html.spec.whatwg.org/multipage/forms.html#client-side-form-validation
 */
const mixin = {
  computed: {
    $dirty() {
      if (this.$dirty) {
        return true;
      }
      // TODO
      return false;
    },
    $pristine() {
      return !this.$dirty;
    },
    $valid() {
      // TODO
      return false;
    },
    $invalid() {
      return !this.$valid;
    },
    $error() {
      return this.$dirty && !this.$pending && this.$invalid;
    },
    $pending() {
      // TODO
      return false;
    }
  }
};

const EMAIL_PATTERN = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

const validators = {
  required(value, flag) {
    return flag && String(value).trim() !== '';
  },
  email(value, flag) {
    return flag && EMAIL_PATTERN.test(value);
  },
  pattern(value, regexp) {
    if (value === '') {
      return true;
    }
    return (typeof regexp === 'string') ? new RegExp(regexp).test(value) : regexp.test(value);
  },
  minlength(value, min) {
    return String(value).length >= parseInt(min, 10);
  },
  maxlength(value, max) {
    return String(value).length <= parseInt(max, 10);
  }
};

/**
 * @see https://cn.vuejs.org/v2/guide/plugins.html
 * @see https://cn.vuejs.org/v2/guide/custom-directive.html
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset
 */
export default {
  install(Vue, options = {}) {
    const context = Vue.extend({
      mixin
    });
    /**
     * Directive是用来在已经存在的dom元素上实现一些行为
     */
    Vue.directive('validate', {
      /**
       * @param {HTMLElement} el
       * @param {VNodeDirective} binding (readonly)
       * @param {VNode} vnode (readonly)
       */
      bind(el, binding, vnode) {
        // console.info(el.name);
        // console.info(el.dataset);
        // console.info(binding.value);
        // console.info(vnode.context);
        const rules = binding.value;
        if (typeof rules === 'object') {
          const fieldName = el.name;
          el.addEventListener('input', (event) => {
            Object.keys(rules).forEach((rule) => {
              const handler = validators[rule];
              if (typeof handler === 'function') {
                console.info(`${fieldName}.${rule}.$valid => ${handler(event.target.value, rules[rule])}`);
              }
            });
          });
        }
      }
    });
  },
  version: '0.0.1'
};
