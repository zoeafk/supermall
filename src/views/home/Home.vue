<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
    <home-swiper :list='banner'></home-swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { getHomeMultidata } from 'network/home'
import HomeSwiper from './components/swiper'
export default {
  components: {
    NavBar,
    HomeSwiper
  },
  name: 'Home',
  data () {
    return {
      banner: [],
      recommend: []
    }
  },
  created () {
    getHomeMultidata().then(res => {
      console.log(res);
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list

    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>