<template>
  <div class="goodsitem">
    <img :src="goodsitem.show.img"
         @load="imgload"
         alt="">
    <div class="good-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
      <span class="cfav">★{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsitem: {
      type: Object
    }
  },
  methods: {
    imgload () {       //监听每个小组件中的图片是否加载好 加载好把事件发出去（利用bus） 调用refresh()进行刷新，让better-scroll重新计算可滚动区域高度
      this.$bus.$emit('itemImageLoad')
    }
  }
}
</script>

<style scoped>
.goodsitem {
  position: relative;
  padding-bottom: 32px;
  width: 48%;
}
.goodsitem img {
  width: 100%;
  border-radius: 6px;
}
.good-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 12px;
  text-align: center;
}
.good-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price,
.cfav {
  padding: 0 15px;
}
.price {
  color: var(--color-high-text);
}
</style>