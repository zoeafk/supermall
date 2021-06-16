<template>
  <div id="detail"
       @mousewheel.prevent>
    <detail-title class="detail-title"
                  @detailIndex='titleClick'></detail-title>
    <scroll class="content"
            :probeType='3'
            :pull-up-load='true'
            ref="Scroll">
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detailInfo='detailInfo'></detail-goods-info>
      <detail-param-info :paramInfo='goodsParam'
                         ref="params"></detail-param-info>
      <detail-comment-info :commentInfo='commonInfo'
                           ref="comment"></detail-comment-info>
      <goods-list :goods='recommend'
                  ref="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailTitle from './childcomps/DetailTitle.vue'
import DetailSwiper from './childcomps/DetailSwiper.vue'
import DetailBaseInfo from './childcomps/DetailBaseInfo.vue'
import DetailShopInfo from './childcomps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '../../network/detail'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo.vue'
import DetailParamInfo from './childcomps/DetailParamInfo.vue'
import DetailCommentInfo from './childcomps/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'

export default {

  name: 'Detail',
  components: {
    DetailTitle,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commonInfo: {},
      recommend: [],
      itemImglistener: null,
      Yvalue: []
    }
  },
  created () {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      //1.获取顶部的图片轮播图
      const data = res.data.result
      this.topImages = data.itemInfo.topImages
      // console.log(res);
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) //为了把一个复杂的类整合到一起
      //3.创建商家信息对象
      this.shop = new Shop(data.shopInfo)
      //4.商家详情数据对象
      this.detailInfo = data.detailInfo
      //5.获参数信息
      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.取评论信息
      if (data.rate.cRate !== 0) {  //有些有评论 有些无 先进行判断
        this.commonInfo = data.rate.list[0]
      }
    })
    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.data.list
      console.log(res);
    })
    //4.
  },
  mounted () {
    const refresh = this.debounce(this.$refs.Scroll.refresh, 200)

    this.itemImglistener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImglistener)
  },
  updated () {
    this.$nextTick(() => {
      this.Yvalue = []
      this.Yvalue.push(0)
      this.Yvalue.push(this.$refs.params.$el.offsetTop)
      this.Yvalue.push(this.$refs.comment.$el.offsetTop)
      this.Yvalue.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.Yvalue);
    })
  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImglistener)
  },
  methods: {
    debounce (func, delay) {      //防抖
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    titleClick (index) {
      this.$refs.Scroll.Scroll.scrollTo(0, -this.Yvalue[index], 100)
    }
  },

}

</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}
.detail-title {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: calc(100% - 44px); */
}
</style>