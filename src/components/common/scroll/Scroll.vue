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
    probeType: {    //决定是否派发 scroll 事件 默认为0 不派发 0 1 2 3
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false   //默认不需要上拉加载
    }
  },
  data () {
    return {
      Scroll: null
    }
  },
  methods: {
    backtop (x, y, time = 300) {
      this.Scroll$ && this.Scroll.scrollTo(x, y, time)  //防止scroll对象还未初始化 便被调用 （null.scrollTo）  导致的bug
    },
    finishPullUp () {
      this.Scroll && this.Scroll.finishPullUp()
    },
    refresh () {
      this.Scroll && this.Scroll.refresh()  //先判断有没有值，有值的情况下调用refresh（）
    }
  },
  mounted () {
    // 创建better-scroll对象
    this.Scroll = new BScroll(this.$refs.wrap, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,              //触发上拉事件  监听滚到底部
      observeDOM: true,                      //使用了bus总线解决图片未加载好导致的Bug
      observeImage: true,
      click: true,


    }),
      // 监听滚动的位置
      this.Scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

    //监听上拉事件 scroll滚动底部
    this.Scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  }
}
</script>

<style>
</style>