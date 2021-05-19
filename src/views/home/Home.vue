<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
    <home-swiper :list='banner'></home-swiper>
    <home-recommend :list='recommend'></home-recommend>
    <home-feature></home-feature>
    <tab-contorl class="tab-control"
                 :titles="['精选','推荐','搜索']"></tab-contorl>
    <goods-list :goods="goods.pop.list"></goods-list>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
      <li>5</li>
    </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { getHomeMultidata, getHomeGoods } from 'network/home'
import HomeSwiper from './components/swiper'
import HomeRecommend from './components/HomeRecommend.vue'
import HomeFeature from './components/HomeFeature'
import TabContorl from 'components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabContorl,
    GoodsList,
  },
  name: 'Home',
  data () {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      }
    }
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  methods: {
    getHomeMultidata () {
      getHomeMultidata().then(res => {

        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    //请求商品数据
    getHomeGoods (type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {

        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page = page

      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  /* padding-bottom: 800px; */
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>