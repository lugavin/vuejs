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
    this.$parent.$children.forEach((child) => {
      if (child === this) {
        this.slideId = `slide-${new Date().getTime()}-${Math.floor(Math.random() * 1000000)}`;
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
