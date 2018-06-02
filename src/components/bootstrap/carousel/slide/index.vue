<template>
  <div class="item" :class="{active: slideId === activeId}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideId: ''
    };
  },
  mounted() {
    this.$parent.$children.forEach((child, index) => {
      if (child === this) {
        this.slideId = `slide-${index}`;
        this.$parent.slideIds.push(this.slideId);
      }
    });
  },
  computed: {
    activeId() {
      return this.$parent.activeId;
    }
  }
};
</script>
