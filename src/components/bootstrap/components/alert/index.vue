<template>
  <div class="alert" :class="['alert-' + type, {'alert-dismissible': dismissible}]" role="alert" v-show="show">
    <button type="button" class="close" aria-label="Close" @click="closeHandler" v-if="dismissible">
      <span aria-hidden="true">&times;</span>
    </button>
    <slot></slot>
  </div>
</template>

<script>
export const options = {
  /**
   * A flag indicating if a given alert can be dismissed (closed) by a user. If this flag is set, a close button (in a
   * form of an ×) will be displayed.
   */
  dismissible: { type: Boolean, default: true },
  /**
   * Alert type (CSS class). Bootstrap 3 recognizes the following types: "success", "info", "warning", "danger".
   */
  type: { type: String, default: 'warning' }
};
export default {
  props: options,
  data() {
    return { show: true };
  },
  methods: {
    closeHandler() {
      this.show = false;
      this.$emit('close');
    }
  }
};
</script>
