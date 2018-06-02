<template>
  <div class="carousel slide">
    <!-- Indicators -->
    <ol class="carousel-indicators" v-if="indicators">
      <li v-for="slideId of slideIds" :key="slideId" :class="{active: slideId === activeId}"
          @click="cycleToSelected(slideId, getSlideEventDirection(activeId, slideId))"></li>
    </ol>
    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <slot></slot>
    </div>
    <!-- Controls -->
    <a class="left carousel-control" role="button" @click="cycleToPrev" v-if="controls">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" role="button" @click="cycleToNext" v-if="controls">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export const carouselProps = {
  // The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.
  interval: { type: Number, default: 5000 },
  // Whether the carousel should cycle continuously or have hard stops.
  wrap: { type: Boolean, default: true },
  // Pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave.
  hover: { type: Boolean, default: true },
  indicators: { type: Boolean, default: true },
  controls: { type: Boolean, default: true }
};
export default {
  props: carouselProps,
  data() {
    return {
      slideChangeInterval: null,
      activeId: '',
      slideIds: []
    };
  },
  mounted() {
    if (this.slideIds.length) {
      this.activeId = this.slideIds[0];
      this.startTimer();
    }
    if (this.hover) {
      this.$el.addEventListener('mouseenter', () => {
        this.pause();
      });
      this.$el.addEventListener('mouseleave', () => {
        this.next();
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.slideChangeInterval);
  },
  methods: {
    cycleToPrev() {
      this.cycleToSelected(this.getPrevSlide(this.activeId), 'RIGHT');
    },
    cycleToNext() {
      this.cycleToSelected(this.getNextSlide(this.activeId), 'LEFT');
    },
    cycleToSelected(slideId, direction) {
      const selectedSlide = this.getSlideById(slideId);
      if (selectedSlide) {
        if (selectedSlide !== this.activeId) {
          this.$emit('slideChange', { prev: this.activeId, current: selectedSlide, direction });
        }
        this.activeId = selectedSlide;
      }
    },
    getSlideById(slideId) {
      const slideWithId = this.slideIds.filter(slide => slide === slideId);
      return slideWithId.length ? slideWithId[0] : null;
    },
    getSlideIdxById(slideId) {
      return this.slideIds.indexOf(this.getSlideById(slideId));
    },
    getPrevSlide(currentSlideId) {
      const currentSlideIdx = this.getSlideIdxById(currentSlideId);
      const isFirstSlide = currentSlideIdx === 0;
      if (isFirstSlide) {
        return this.wrap ? this.slideIds[this.slideIds.length - 1] : this.slideIds[0];
      }
      return this.slideIds[currentSlideIdx - 1];
    },
    getNextSlide(currentSlideId) {
      const currentSlideIdx = this.getSlideIdxById(currentSlideId);
      const isLastSlide = currentSlideIdx === this.slideIds.length - 1;
      if (isLastSlide) {
        return this.wrap ? this.slideIds[0] : this.slideIds[this.slideIds.length - 1];
      }
      return this.slideIds[currentSlideIdx + 1];
    },
    getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
      const currentActiveSlideIdx = this.getSlideIdxById(currentActiveSlideId);
      const nextActiveSlideIdx = this.getSlideIdxById(nextActiveSlideId);
      return currentActiveSlideIdx > nextActiveSlideIdx ? 'RIGHT' : 'LEFT';
    },
    /**
     * Navigate to a slide with the specified identifier.
     */
    select(slideId) {
      this.cycleToSelected(slideId, this.getSlideEventDirection(this.activeId, slideId));
      this.restartTimer();
    },
    startTimer() {
      if (this.interval > 0) {
        this.slideChangeInterval = setInterval(() => {
          this.cycleToNext();
        }, this.interval);
      }
    },
    stopTimer() {
      clearInterval(this.slideChangeInterval);
    },
    restartTimer() {
      this.stopTimer();
      this.startTimer();
    },
    /**
     * Navigate to the next slide.
     */
    prev() {
      this.cycleToPrev();
      this.restartTimer();
    },
    /**
     * Navigate to the next slide.
     */
    next() {
      this.cycleToNext();
      this.restartTimer();
    },
    /**
     * Stops the carousel from cycling through items.
     */
    pause() {
      this.stopTimer();
    },
    /**
     * Restarts cycling through the carousel slides from left to right.
     */
    cycle() {
      this.startTimer();
    }
  }
};
</script>
