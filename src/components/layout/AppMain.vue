<template>
  <main class="app-main">
    <div class="container app-content">
      <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
.app-main {
  margin-top: 52px;
}
.app-content {
  padding: 20px 0;
}
</style>
