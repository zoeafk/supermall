<template>
  <div id="home"
       @mousewheel.prevent>
    <nav-bar class="home-nav">
      <div slot="middle">买买买</div>
    </nav-bar>
    <tab-contorl :titles="['精选','推荐','搜索']"
                 @handleItemClick="ItemClick"
                 ref='tabcon1'
                 class="tab-control"
                 v-show="isTabFixed">
    </tab-contorl>
    <scroll class="content"
            ref="Scroll"
            :probeType='3'
            :pull-up-load='true'
            @scroll='contentScroll'
            @pullingUp='loadmore'>
      <home-swiper :list='banner'
                   @imgload='handImgLoad'></home-swiper>
      <home-recommend :list='recommend'></home-recommend>
      <home-feature></home-feature>
      <tab-contorl :titles="['精选','推荐','搜索']"
                   @handleItemClick="ItemClick"
                   ref='tabcon2'>
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
      showbtn: false,
      TabContorlTop: 0,
      isTabFixed: false
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted () {
    // 监听小组件加载  在main.js中将$bus挂载到原型上
    const refresh = this.debounce(this.$refs.Scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  //使用了keep alive  保证首页被切换后保持原来的状态
  activated () {
    this.$refs.Scroll.backtop(0, this.saveY, 0)  //进入时y值设置回去
    this.$refs.Scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.Scroll.Scroll.y  //离开时保存y值
  },
  methods: {
    /**
     * 事件监听相关的方法
     */

    debounce (func, delay) {      //防抖
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },

    handImgLoad () {        //监听轮播图片加载 取得tabcontorl offsettop的值
      this.TabContorlTop = this.$refs.tabcon2.$el.offsetTop
    },

    ItemClick (index) {     //监听点击 通过index 判断tabcontorl类型 赋给currentType(记录谁被选中)
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
      //使最新的点击与index保持一致
      this.$refs.tabcon1.currentIndex = index;
      this.$refs.tabcon2.currentIndex = index;
    },

    backClick () {
      this.$refs.Scroll.Scroll.scrollTo(0, 0, 300)
    },
    contentScroll (position) {
      //判断Backtop是否显示
      this.showbtn = (-position.y) > 1000 ? true : false
      //决定tabcontrol是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.TabContorlTop
    },

    loadmore () {         //上拉加载更多
      this.getHomeGoods(this.currentType)
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
        this.goods[type].page += 1
        this.$refs.Scroll.finishPullUp()    //this.$refs.Scroll.Scroll.finishPullUp() 
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;

  /* padding-bottom: 800px; */
}
.home-nav {
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
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
/* .fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */
</style>