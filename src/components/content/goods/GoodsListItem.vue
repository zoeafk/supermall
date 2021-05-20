<template>
  <div class="goodsitem">
    <img :src="goodsitem.show.img"
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