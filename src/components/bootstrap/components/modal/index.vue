<template>
  <div>
    <div class="modal fade show d-block" role="dialog" tabindex="-1"
         :class="[windowClass ? windowClass : '']" @click="backdropClick">
      <div class="modal-dialog" :class="[size ? 'modal-' + size : '', {'modal-dialog-centered': centered}]">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
/**
 * @see https://cn.vuejs.org/v2/examples/modal.html
 */
export default {
  props: {
    keyboard: { type: Boolean, default: true },
    backdrop: { type: [String, Boolean], default: true },
    centered: { type: String },
    size: { type: String },
    windowClass: { type: String }
  },
  created() {
    if (this.keyboard) {
      addEventListener('keydown', this.keyboardEvent);
    }
  },
  beforeDestroy() {
    if (this.keyboard) {
      removeEventListener('keydown', this.keyboardEvent);
    }
  },
  methods: {
    backdropClick(event) {
      if (this.backdrop === true && event.target === event.currentTarget) {
        this.dismiss('BACKDROP_CLICK');
      }
    },
    // escKey(event) {
    //   if (this.keyboard && !event.defaultPrevented) {
    //     this.dismiss('ESC');
    //   }
    // },
    keyboardEvent(event) {
      if (event.which === 27) {
        event.preventDefault();
        this.dismiss('ESC');
      }
    },
    dismiss(reason) {
      this.$emit('dismiss', reason);
    }
  }
};
</script>
