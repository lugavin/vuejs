/* eslint-disable no-unused-vars */

/**
 * form
 * formName.$error = {};
 * formName.$$success = {};
 * formName.$pending = undefined;
 * formName.$name = $attrs.name;
 * formName.$dirty = false;
 * formName.$pristine = true;
 * formName.$valid = true;
 * formName.$invalid = false;
 * formName.$submitted = false;
 *
 * field
 * formName.fieldName.$dirty = false;
 * formName.fieldName.$pristine = true;
 * formName.fieldName.$valid = true;
 * formName.fieldName.$invalid = false;
 * formName.fieldName.$error = false;
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

const rules = {
  required(value) {
    return !!value;
  },
  pattern(value, regexp) {
    if (value === '') {
      return true;
    }
    return new RegExp(regexp).test(value);
  },
  maxlength(value, length) {
    return value.length <= length;
  },
  minlength(value, length) {
    return value.length >= length;
  }
};

const requiredDirective = {
  bind(el, binding, vnode, oldVnode) {
    console.info(this);
  }
};
const patternDirective = {};
const maxlengthDirective = {};
const minlengthDirective = {};

const directives = {
  required: requiredDirective,
  pattern: patternDirective,
  maxlength: maxlengthDirective,
  minlength: minlengthDirective
};

const VueValid = {
  install(Vue, options) {
    // Vue.mixin(mixin);
    Object.keys(directives).forEach((k) => {
      Vue.directive(k, directives[k]);
    });
  },
  version: '0.0.1'
};

export default VueValid;
