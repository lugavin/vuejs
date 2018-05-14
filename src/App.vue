<template>
  <div id="app">
    <navbar></navbar>
    <app-main>
      <router-view></router-view>
    </app-main>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';
import AppMain from '@/components/layout/AppMain';

export default {
  name: 'App',
  components: {
    Navbar,
    AppMain
  }
};
</script>
