<template>
  <div class="modal fade show d-block" role="dialog" tabindex="-1"
       :class="[windowClass ? windowClass : '']">
    <div class="modal-dialog" role="document"
         :class="[{'modal-dialog-centered': centered}, size ? 'modal-' + size : '']">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backdrop: { type: [String, Boolean], default: false },
    centered: { type: String },
    keyboard: { type: Boolean, default: true },
    size: { type: String },
    windowClass: { type: String }
  },
  methods: {
    dismissEvent(data) {
      this.$emit('dismiss', data);
    }
  }
};
</script>
