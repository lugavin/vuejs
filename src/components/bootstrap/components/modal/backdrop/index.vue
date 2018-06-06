<template>
  <div class="modal-backdrop fade show" :class="backdropClass ? backdropClass : ''"></div>
</template>

<script>
export default {
  props: {
    backdropClass: { type: String }
  }
};
</script>
