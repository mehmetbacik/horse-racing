<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeView from '@/views/HomeView.vue';

export default defineComponent({
  name: 'App',
  components: {
    HomeView
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
