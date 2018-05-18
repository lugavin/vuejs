<template>
  <div class="modal is-active" v-if="isShow">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <label class="modal-card-title">Modal title</label>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <h1>Hello World</h1>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
// see https://github.com/axios/axios#interceptors
// import axios from 'axios';

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('on-close');
    }
  }
};
</script>

<style scoped>
</style>
