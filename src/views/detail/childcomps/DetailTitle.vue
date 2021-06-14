<template>
  <div class="Detail">
    <nav-bar>
      <div slot="left"
           class="back"
           @click="backHome">
        <img src="~assets/img/common/back.svg"
             alt="">
      </div>
      <div slot="middle"
           class="title">
        <div class="title-item"
             v-for="(item,index) of titles"
             :key="index"
             :class="{active:index===currentIndex}"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  name: 'Detail',
  components: { NavBar },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
    },
    backHome () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.back img {
  margin-top: 11px;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
</style>