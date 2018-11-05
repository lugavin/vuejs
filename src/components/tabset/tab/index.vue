<template>
  <div class="tab-content">
    <div class="tab-pane fade show" role="tabpanel" :class="{active: id === activeId}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Simple (string only) title.
     */
    title: { type: String },
    /**
     * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
     */
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      id: null
    };
  },
  created() {
    const genUID = (prefix) => {
      do {
        // eslint-disable-next-line no-param-reassign
        prefix += Math.floor((Math.random() * 1000000));
      } while (document.getElementById(prefix));
      return prefix;
    };
    this.id = genUID('uib-tab');
  },
  computed: {
    activeId() {
      return this.$parent.activeId;
    }
  }
};
</script>
