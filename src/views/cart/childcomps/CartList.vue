<template>
  <div class="cart-list">

    <cart-list-item v-for="(item,index) in cartList"
                    :key="index"
                    :product='item'></cart-list-item>

  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
export default {
  components: { Scroll, CartListItem },
  name: 'CartList',
  props: {
    cartList: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
</style>