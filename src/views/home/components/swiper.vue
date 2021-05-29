<template>
  <div class="wrapper">
    <swiper :options="swiperOption"
            v-if="showSwiper">
      <swiper-slide v-for="item of list"
                    :key="item.sort">
        <a :href="item.link">
          <img class="img-wrapper"
               :src="item.image"
               alt=""
               @load="imgload">
        </a>
      </swiper-slide>

      <div class="swiper-pagination"
           slot="pagination"></div>
      <!-- <div class="swiper-button-prev"
         slot="button-prev"></div>
    <div class="swiper-button-next"
         slot="button-next"></div> -->

    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: {
      type: Array
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplayDisableOnInteraction: false,
        autoplay: 3000,
        // autoplay: {
        //   disableOnInteraction: false,
        // }
      },
      isload: false
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  },
  methods: {
    imgload () {
      if (!this.isload) {        //因为4张图片 会发送4次 而只需要一个高度即可 发送一次
        this.$emit('imgload')
      }
      this.isload = true
    }
  }
}
</script>

<style scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  background: #fff;
}
.wrapper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 52%;
  background: #eee;
}
.img-wrapper {
  width: 100%;
}
</style>