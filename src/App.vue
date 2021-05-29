<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

    <main-tab-bar class="tabbar" />
  </div>
</template>
<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
export default {
  components: { MainTabBar },
  name: 'app',
}
</script>
<style scoped>
@import './assets/css/base.css';
</style>
