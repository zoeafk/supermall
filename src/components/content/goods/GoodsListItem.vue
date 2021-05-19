<template>
  <div class="goodsitem">
    <img :src="goodsitem.show.img"
         alt="">
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
img {
  width: 100%;
}
</style>