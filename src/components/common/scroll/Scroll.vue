<template>
  <div class="wrapper"
       ref="wrap">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    // pullUpLoad: {
    //   type: Boolean,
    //   default: false   //默认不需要上拉加载
    // }
  },
  data () {
    return {
      Scroll: null
    }
  },
  methods: {
    backtop (x, y, time = 300) {
      return this.Scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.Scroll.finishPullUp()
    },
    refresh () {
      this.Scroll.refresh()
    }
  },
  mounted () {
    // 创建better-scroll对象
    this.Scroll = new BScroll(this.$refs.wrap, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,              //触发上拉事件
      // observeDOM: true,                      //使用了bus总线解决图片未加载好导致的Bug
      // observeImage: true,
      click: true,


    }),
      // 监听滚动的位置
      this.Scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

    //监听上拉事件
    // this.Scroll.on('pullingUp', () => {
    //   this.$emit('pullingUp')
    // }
    // )
  }
}
</script>

<style>
</style>