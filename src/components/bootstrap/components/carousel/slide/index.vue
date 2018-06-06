<template>
  <div class="carousel-item" :class="{active: slideId === activeId}">
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
        this.slideId = this.genUID('slide');
        this.$parent.slideIds.push(this.slideId);
      }
    });
  },
  computed: {
    activeId() {
      return this.$parent.activeId;
    }
  },
  methods: {
    genUID(prefix) {
      do {
        // eslint-disable-next-line no-param-reassign, no-bitwise
        prefix += ~~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix; // `${prefix}-${new Date().getTime()}-${Math.floor(Math.random() * 1000000)}`;
    }
  }
};
</script>
