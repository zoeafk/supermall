<template>
  <div class="tab-bar-item"
       @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 动态绑定样式 样式不缺定 在搞一个计算属性 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

    <!-- 所有的item都展示同一个文字 图片 -->
    <!-- <img src="../../assets/img/tabbar/home.svg"
         alt="">
    <div>首页</div> -->
  </div>

</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  // data () {
  //   return {
  //     isActive: true
  //   }
  // },
  computed: {
    isActive () {  //set()一般不写 所以可以这么写  isActive是一个属性
      return this.$route.path.includes(this.path)
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      // if (this.$route.path == this.path) {
      //   console.log('路径相同了');
      // } else {
      //   this.$router.replace(this.path)
      // }
      this.$router.replace(this.path).catch(err => { console.log(err) })
    }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/* .active {
  color: red;
} */
</style>