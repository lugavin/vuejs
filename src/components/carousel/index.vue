<template>
  <div class="carousel slide">
    <!-- Indicators -->
    <ol class="carousel-indicators" v-if="indicators">
      <li v-for="slide of slides" :key="slide.id" :class="{active: slide.id === activeId}"
          @click="cycleToSelected(slide.id, getSlideEventDirection(activeId, slide.id))"></li>
    </ol>
    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <slot></slot>
    </div>
    <!-- Controls -->
    <a class="carousel-control-prev" href="javascript:void(0)" role="button"
       @click="cycleToPrev" v-if="controls">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="javascript:void(0)" role="button"
       @click="cycleToNext" v-if="controls">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * The amount of time to delay between automatically cycling an item.
     * If false, carousel will not automatically cycle.
     */
    interval: { type: Number, default: 5000 },
    /**
     * Whether the carousel should cycle continuously or have hard stops.
     */
    wrap: { type: Boolean, default: true },
    /**
     * A flag for allowing navigation via keyboard
     */
    keyboard: { type: Boolean, default: true },
    /**
     * Pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave.
     */
    hover: { type: Boolean, default: true },
    indicators: { type: Boolean, default: true },
    controls: { type: Boolean, default: true }
  },
  data() {
    return {
      slides: [],
      activeId: null,
      slideChangeInterval: null
    };
  },
  mounted() {
    this.slides = this.$children.map(slide => ({ id: slide.id }));
    if (this.slides.length) {
      this.activeId = this.slides[0].id;
      this.startTimer();
    }
    if (this.hover) {
      this.$el.addEventListener('mouseenter', this.pause);
      this.$el.addEventListener('mouseleave', this.cycle);
    }
    if (this.keyboard) {
      addEventListener('keydown', this.keyboardEvent);
    }
  },
  beforeDestroy() {
    clearInterval(this.slideChangeInterval);
    if (this.keyboard) {
      removeEventListener('keydown', this.keyboardEvent);
    }
  },
  methods: {
    cycleToPrev() {
      this.cycleToSelected(this.getPrevSlide(this.activeId), 'RIGHT');
    },
    cycleToNext() {
      this.cycleToSelected(this.getNextSlide(this.activeId), 'LEFT');
    },
    cycleToSelected(slideId, direction) {
      const selectedSlide = this.getSlide(slideId);
      if (selectedSlide) {
        if (selectedSlide.id !== this.activeId) {
          this.slideChange({ prev: this.activeId, current: selectedSlide.id, direction });
        }
        this.activeId = selectedSlide.id;
      }
    },
    getSlide(slideId) {
      const slideWithId = this.slides.filter(slide => slide.id === slideId);
      return slideWithId.length ? slideWithId[0] : null;
    },
    getSlideIndex(slideId) {
      return this.slides.indexOf(this.getSlide(slideId));
    },
    getPrevSlide(currentSlideId) {
      const currentSlideIdx = this.getSlideIndex(currentSlideId);
      const isFirstSlide = currentSlideIdx === 0;
      if (isFirstSlide) {
        return this.wrap ? this.slides[this.slides.length - 1].id : this.slides[0].id;
      }
      return this.slides[currentSlideIdx - 1].id;
    },
    getNextSlide(currentSlideId) {
      const currentSlideIdx = this.getSlideIndex(currentSlideId);
      const isLastSlide = currentSlideIdx === this.slides.length - 1;
      if (isLastSlide) {
        return this.wrap ? this.slides[0].id : this.slides[this.slides.length - 1].id;
      }
      return this.slides[currentSlideIdx + 1].id;
    },
    getSlideEventDirection(currentActiveSlideId, nextActiveSlideId) {
      const currentActiveSlideIdx = this.getSlideIndex(currentActiveSlideId);
      const nextActiveSlideIdx = this.getSlideIndex(nextActiveSlideId);
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
    },
    slideChange(data) {
      this.$emit('slide', data);
    },
    keyboardEvent(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      switch (event.which) {
        case 37:
          event.preventDefault();
          this.prev();
          break;
        case 39:
          event.preventDefault();
          this.next();
          break;
        default:
          break;
      }
    }
  }
};
</script>
