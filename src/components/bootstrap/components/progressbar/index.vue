<template>
  <div class="progress" :style="{height: height}">
    <div class="progress-bar" :class="progressbarClass" role="progressbar" :style="{width: percentVal + '%'}">
      <span v-if="showValue">{{ percentVal }}%</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export const options = {
  /**
   * Maximal value to be displayed in the progressbar.
   */
  max: { type: Number, default: 100 },
  /**
   * Current value to be displayed in the progressbar. Should be smaller or equal to "max" value.
   */
  value: { type: Number, default: 0 },
  /**
   * A flag indicating if the stripes of the progress bar should be animated. Takes effect only for browsers
   * supporting CSS3 animations, and if striped is true.
   */
  animated: { type: Boolean, default: false },
  /**
   * A flag indicating if a progress bar should be displayed as striped.
   */
  striped: { type: Boolean, default: false },
  /**
   * A flag indicating if the current percentage value should be shown.
   */
  showValue: { type: Boolean, default: false },
  /**
   * Type of progress bar, can be one of "success", "info", "warning" or "danger".
   */
  type: { type: String },
  /**
   * Height of the progress bar. Accepts any valid CSS height values, ex. '2rem'
   */
  height: { type: String }

};
export default {
  props: options,
  computed: {
    val() {
      return Math.min(this.value, this.max);
    },
    percentVal() {
      return Number.parseFloat(((this.val / this.max) * 100).toFixed(2));
    },
    progressbarClass() {
      const cls = {
        'progress-bar-striped': this.striped,
        active: this.animated
      };
      if (this.type) {
        cls[`progress-bar-${this.type}`] = true;
      }
      return cls;
    }
  }
};
</script>
