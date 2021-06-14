<template>
  <div class="wrapper">
    <swiper :options="swiperOption"
            class="swiper-wra">
      <swiper-slide v-for="(item,index) of topImages"
                    :key="index">
        <img class="img-wrapper"
             :src="item"
             alt="">
      </swiper-slide>

      <div class="swiper-pagination"
           slot="pagination"></div>

    </swiper>
  </div>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
      }
    }
  }
}
</script>

<style scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-wra {
  height: 0;
  width: 100%;
  padding-bottom: 111.6%;
}
.img-wrapper {
  width: 100%;
}
</style>