<template>
  <main role="main">
    <!--
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    -->
    <transition>
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
/*
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}
*/
</style>
