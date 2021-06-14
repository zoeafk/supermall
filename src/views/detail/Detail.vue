<template>
  <div>
    <detail-title></detail-title>
    <detail-swiper :top-images='topImages'></detail-swiper>
    <detail-base-info :goods='goods'></detail-base-info>
  </div>
</template>

<script>
import DetailTitle from './childcomps/DetailTitle.vue'
import DetailSwiper from './childcomps/DetailSwiper.vue'
import DetailBaseInfo from './childcomps/DetailBaseInfo.vue'

import { getDetail, Goods } from '../../network/detail'

export default {

  name: 'Detail',
  components: {
    DetailTitle,
    DetailSwiper,
    DetailBaseInfo
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {}
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
      console.log(res);
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) //为了把一个复杂的类整合到一起
    })

  }
}
</script>

<style>
</style>