<template>
  <div id="app">
    <navbar></navbar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { Navbar, AppMain, FooterBar } from './components/layout';

export default {
  name: 'App',
  components: {
    Navbar,
    AppMain,
    FooterBar
  }
};
</script>

<style>
@import 'font-awesome/css/font-awesome.css';
@import 'bulma/css/bulma.css';
</style>
