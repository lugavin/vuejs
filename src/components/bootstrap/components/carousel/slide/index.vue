<template>
  <div class="carousel-item" :class="{active: id === activeId}">
    <slot></slot>
  </div>
</template>

<script>
export default {
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
    this.id = genUID('slide');
  },
  computed: {
    activeId() {
      return this.$parent.activeId;
    }
  }
};
</script>
