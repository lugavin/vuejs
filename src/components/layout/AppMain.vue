<template>
  <main class="container app-main">
    <div class="app-content">
      <transition name="fade" mode="in-out">
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

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .8s ease;
}
</style>
