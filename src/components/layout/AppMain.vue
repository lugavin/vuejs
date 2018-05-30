<template>
  <main class="container app-main">
    <div class="app-content">
      <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-main {
  padding-top: 50px;
}

.app-content {
  padding-top: 20px;
}
</style>
