<template>
  <main>
    <div class="container">
      <transition mode="out-in"
                  enter-active-class="fadeIn"
                  leave-active-class="fadeOut">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

</style>
