<template>

  <div id="home">
    <nav-bar class="home-nav">
      <div slot="middle">买买买</div>
    </nav-bar>
    <scroll class="content"
            ref="Scroll"
            :probeType='3'
            :pull-up-load='true'
            @scroll='contentScroll'>
      <!-- @pullingUp='loadmore' -->
      <home-swiper :list='banner'></home-swiper>
      <home-recommend :list='recommend'></home-recommend>
      <home-feature></home-feature>
      <tab-contorl class="tab-control"
                   :titles="['精选','推荐','搜索']"
                   @handleItemClick="ItemClick">
      </tab-contorl>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick"
              v-show="showbtn">
    </back-top>
  </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './components/swiper'
import HomeRecommend from './components/HomeRecommend.vue'
import HomeFeature from './components/HomeFeature'
import TabContorl from 'components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'

export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabContorl,
    GoodsList,
    Scroll,
    BackTop,
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
      currentType: 'pop',
      showbtn: false
    }
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    // 监听小组件加载  在main.js中将$bus挂载到原型上
    this.$bus.$on('itemImageLoad', () => {
      this.$refs.Scroll.refresh()
    })
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

    backClick () {
      this.$refs.Scroll.backtop(0, 0)
    },
    contentScroll (position) {
      this.showbtn = (-position.y) > 1000 ? true : false
    },
    //上拉加载更多
    // loadmore () {
    //   this.getHomeGoods(this.currentType)

    // },
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
        this.goods[type].page += 1
        // this.$refs.Scroll.finishPullUp()    //this.$refs.Scroll.Scroll.finishPullUp() 
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  /* position: relative; */

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
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px; */
}
</style>