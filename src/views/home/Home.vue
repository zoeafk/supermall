<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">购物街</div>
    </nav-bar>
    <home-swiper :list='banner'></home-swiper>
    <home-recommend :list='recommend'></home-recommend>
    <home-feature></home-feature>
    <tab-contorl class="tab-control"
                 :titles="['精选','推荐','搜索']"
                 @handleItemClick="ItemClick">
    </tab-contorl>
    <goods-list :goods="showGoods"></goods-list>
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
import HomeSwiper from './components/swiper'
import HomeRecommend from './components/HomeRecommend.vue'
import HomeFeature from './components/HomeFeature'
import TabContorl from 'components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'
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
      },
      currentType: 'pop'
    }
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    ItemClick (index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },


    /*
    *网络请求相关的方法
    */
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
  top: 43px;
  z-index: 99;
}
</style>