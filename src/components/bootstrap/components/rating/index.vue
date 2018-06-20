<template>
  <div class="d-inline-flex" role="slider" tabindex="0" aria-valuemin="0"
       :aria-valuemax="max"
       :aria-valuenow="nextRate"
       :aria-valuetext="ariaValueText"
       :aria-disabled="readonly"
       @mouseleave="reset">
    <div v-for="context in contexts" :key="context.index"
         @mouseenter="enter(context.index + 1)"
         @click="handleClick(context.index + 1)">
      <span class="sr-only">({{ nextRate > context.index ? '*' : ' ' }})</span>
      <span :style="{cursor: readonly ? 'default' : 'pointer'}">
        <slot :context="context">{{ context.fill === 100 ? '&#9733;' : '&#9734;' }}</slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * A flag indicating if rating can be updated.
     */
    readonly: { type: Boolean, default: false },
    /**
     * A flag indicating if rating can be reset to 0 on mouse click
     */
    resettable: { type: Boolean, default: false },
    /**
     * Maximal rating that can be given using this widget.
     */
    max: { type: Number, default: 10 },
    /**
     * Current rating. Can be a decimal value like 3.75
     */
    rate: { type: Number, required: true }
  },
  created() {
    this.contexts = Array.from({ length: this.max }, (v, k) => ({ fill: 0, index: k }));
    this.updateState(this.rate);
  },
  data() {
    return {
      contexts: [],
      nextRate: 0,
      currentRate: this.rate
    };
  },
  computed: {
    ariaValueText() {
      return `${this.nextRate} out of ${this.max}`;
    }
  },
  methods: {
    reset() {
      this.leave(this.nextRate);
      this.updateState(this.currentRate);
    },
    enter(value) {
      if (!this.readonly) {
        this.updateState(value);
      }
      this.hover(value);
    },
    handleClick(value) {
      this.update(this.resettable && this.currentRate === value ? 0 : value);
    },
    update(value) {
      const newRate = Math.max(Math.min(value, this.max), 0);
      if (!this.readonly && this.currentRate !== newRate) {
        this.currentRate = newRate;
        this.rateChange(this.currentRate);
      }
      this.updateState(this.currentRate);
    },
    updateState(nextValue) {
      this.nextRate = nextValue;
      this.contexts.forEach((context, index) => {
        // eslint-disable-next-line no-param-reassign
        context.fill = this.getFillValue(index);
      });
    },
    getFillValue(index) {
      const diff = this.nextRate - index;
      if (diff > 0 && diff < 1) {
        return Number.parseInt((diff * 100).toFixed(2), 10);
      }
      if (diff >= 1) {
        return 100;
      }
      return 0;
    },
    /**
     * An event fired when a user is hovering over a given rating.
     * Event's payload equals to the rating being hovered over.
     */
    hover(index) {
      this.$emit('hover', index);
    },
    /**
     * An event fired when a user stops hovering over a given rating.
     * Event's payload equals to the rating of the last item being hovered over.
     */
    leave(nextRate) {
      this.$emit('leave', nextRate);
    },
    /**
     * An event fired when a user selects a new rating.
     * Event's payload equals to the newly selected rating.
     */
    rateChange(currentRate) {
      this.$emit('update:rate', currentRate);
    }
  }
};
</script>
