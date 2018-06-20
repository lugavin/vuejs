<template>
  <ul class="nav" :class="['nav-'+type, justifyClass]" role="tablist">
    <li class="nav-item">
      <a class="nav-link" href="#">Active</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    /**
     * An identifier of an initially selected (active) tab. Use the "select" method to switch a tab programmatically.
     */
    activeId: { type: String },
    /**
     * Whether the closed tabs should be hidden without destroying them
     */
    destroyOnHide: { type: Boolean, default: true },
    /**
     * The horizontal alignment of the nav with flexbox utilities. Can be one of 'start', 'center', 'end', 'fill'
     * or 'justified'. The default value is 'start'.
     */
    justify: { type: String, default: 'start' },
    /**
     * The orientation of the nav (horizontal or vertical). The default value is 'horizontal'.
     */
    orientation: { type: String, default: 'horizontal' },
    /**
     * Type of navigation to be used for tabs. Can be one of 'tabs' or 'pills'.
     */
    type: { type: String, default: 'tabs' }
  },
  computed: {
    justifyClass() {
      return ['fill', 'justified'].includes(this.justify) ? `nav-${this.justify}` : `justify-content-${this.justify}`;
    }
  },
  methods: {
    tabChange(data) {
      this.$emit('tabChange', data);
    }
  }
};
</script>
